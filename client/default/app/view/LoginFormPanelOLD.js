Ext.define('MyLandlord.view.LoginFormPanelOLD', {
    extend: 'Ext.form.Panel',
    alias: 'widget.loginformpanel',

    config: {
        items: [
            {
                xtype: 'textfield',
                label: 'Username',
                name: 'username',
                id: 'username'
            },
            {
                xtype: 'passwordfield',
                label: 'Password',
                name: 'password',
                id: 'password'
            },
            {
                xtype: 'button',
                itemId: 'loginButton',
                width: 100,
                text: 'Login'
            }
        ],
        listeners: [
            {
                fn: 'onMybuttonTap',
                event: 'tap',
                delegate: '#loginButton'
            }
        ]
    },

    onMybuttonTap: function(button, e, eOpts) {
        //button.up().up().animateActiveItem(1, { type: 'flip' });

        var formObject = button.up('loginformpanel');
        var formValues = formObject.getValues();

         username = formValues.username;
         password = formValues.password;

        console.log("userName = " + formValues.username);
        console.log("password = " + formValues.password);
  
        preLogin();
    }

});

function preLogin(){
    log('Check if public key already exists...');
    if(_public_key === null){
        log('Public key not found, request for the server\'s public key...');
        $fh.act({ act :'getPublicKey', secure: _use_secure, req:{}}, function(res){
            log('Got server\'s public key...');
            _public_key = res;
            generateSecretKey(doLoginLocal);
        });
    } else {
        log('Public key found, continue...');
        generateSecretKey(doLoginLocal);
    }
}

function generateSecretKey(cb){
    log('Check if there is a secret key already been generated...');
    if (_secret_key === null){
        log('No secret key found, generate a new one...');
        //keysize is in bytes, a bug really, should be in bits
        $fh.sec({act:'keygen', params:{algorithm:'AES', keysize:'128'}}, function(sec_key){
            log('A secret key has been generated.');
            _secret_key = sec_key.secretkey;
            _initial_iv = sec_key.iv;
            log('secretkey is ' + _secret_key);
            exchangeSecretKey(cb);
        });
    }else{
        log('A secret key found, no need to generate another one.');
        exchangeSecretKey(cb);
    }
}

//exchange the secret key securely using RSA
function exchangeSecretKey(cb){
    log('Check if the client and the server has exchanged the secret key before...');
    if (_session_id !== null){
        log('Secret key exchange has been done before, continue...');
        cb();
    }else{
        log('Going to exchange the secret key with the server...');
        log('Generate a random nonce for verfication...');
        var nonce = generate_random_text(24);
        log('A random nonce has been generated.');
        log('Encrypt the secret key with server\'s public key...');
        $fh.sec({act:'encrypt', params:{algorithm:"RSA", plaintext: JSON.stringify({key: _secret_key, iv:_initial_iv}), modulu: _public_key.modulu}},
            function(cipher){
                log('Secret key has been encrypted. Send it to the server...');
                var exchange_data = {'cipher': cipher.ciphertext, 'nonce': nonce, 'keysize': 128};
                $fh.act({act:'exchangeSecretKey', secure: _use_secure, req:exchange_data}, function(response){
                    log('Server got the encrypted secret key. Verify the server response to make sure it\'s correct...');
                    var encrypt_hash_value = response.verify;
                    log("verification value is " + encrypt_hash_value);
                    log('To verify, decrypt the server reponse with the secret key...');
                    $fh.sec({act:'decrypt', params:{algorithm:'AES', ciphertext: encrypt_hash_value, key: _secret_key, iv: _initial_iv}}, function(decrypt_data){
                        log('Decryption complete. Compare it with the md5 hash value of the nonce, it should be the same.');
                        var hash_value = decrypt_data.plaintext;
                        log("remote hash value is " + hash_value);
                        $fh.sec({act:'hash', params:{algorithm:'MD5', text: nonce}}, function(local_hash){
                            log("local hash value is " + local_hash.hashvalue);
                            if(hash_value == local_hash.hashvalue){
                                log('Hash values are the same. Secret key has been verified. Secret key exchange completed.');
                                _session_id = response.__session_id;
                                cb();
                            } else {
                                log('Hash values are different. Secret key verification failed.');
                                alert("Error. Secret key verification failed.");
                            }
                        });
                    });
                });
            }
        );
    }
}

//ecrypt all the outbound requests and decrypt all the inbound requests
function doSecureCommunication(action, data, callback){
    log('Encrypt data using the shared secret key before sending to server...');
    $fh.sec({act:'encrypt', params: {algorithm:'AES', plaintext: JSON.stringify(data), key: _secret_key, iv:_initial_iv}}, function(result){
        var encrypt_data = result.ciphertext;
        var req = {};
        req.payload = encrypt_data;
        req.__session_id = _session_id;
        log('Encryption finished. Send it to server now...');
        $fh.act({act: action, secure: _use_secure, req: req}, function(response){
            log('Got response from server.');
            var res_encrypt_data = response.payload;
            log('Decrypt the response data...');
            $fh.sec({act:'decrypt',params:{algorithm:'AES', ciphertext: res_encrypt_data, key: _secret_key, iv: _initial_iv}}, function(plaintext){
                log('Decryption completed. Pass decrypted data to the callback functions');
                var res_decrypt_data = plaintext.plaintext;
                callback(JSON.parse(res_decrypt_data));
            });
        });
    });
}

/***** This Locin from local works fine ******/
function doLoginLocal(){
    
      var loggedIn = false;
  
      $fh.auth({
      'policyId': 'MearsFeedHenryAuthPolicy',
      'clientToken': 'Zifzl6TTCti8OXjauj4aBSV9',
      'endRedirectUrl': window.location.href,
      'params': {
        'userId': username,
        'password': password
      }
    }, function(res) {
      // Authentication successful - store sessionToken in variable
      var sessionToken = res.sessionToken;
      console.log('Login Successful');
      
      loggedIn = true;
      
      
    }, function(msg, err) {
      var errorMsg = err.message;
      if (errorMsg === 'user_purge_data' || errorMsg === 'device_purge_data') {
        // User or device has been black listed from administration console and all local data should be wiped
        console.log('Blackilisted/Wiped');
              
      } else {
              
        console.log('Login Failed');
      }
    });        
        

}

/***** This Login from via remote fails ******/
function doLoginAtCloud(){
  
   var user_name = username;
   var user_password = password;
    log('username = [' + user_name + '] password = [' + user_password + ']');
    //var user_name = $('#user_name').val();
    //var user_password = $('#user_pass').val();
    log('Sending login details using secure channel...');
    doSecureCommunication('userLogin', {u:user_name, p:user_password}, function(res){
        log('Received decrypted response.');
        if(res.result == "ok"){
            log('Login succeeded.');
            _user_id = res.uid;
            
            var mainTabPanel = Ext.ComponentQuery.query("toppanel")[0];
            mainTabPanel.animateActiveItem(1, { type: 'flip' });
        }else{
            log('Login failed.');
            alert("Login failed");
        }
    });
}

//add log message to the textarea
function log(message){
  
  console.log(message);
/**********************************************************  
  var logger = $($.mobile.activePage).find('textarea');
  var time = formateDate(new Date());
  var existings = logger.text();
  if(" " == existings){
    logger.text('[' + time + ']' + ' ' + message + '\n');
  } else {
    existings += '[' + time + ']' + ' ' + message + '\n';
    logger.text(existings);
  }
  logger.attr('rows', parseInt(logger.attr('rows')) + 3);
**********************************************************/
}

var _stop = false;
var rsa_keys = {"512": 
                 {
                    m : "8de7066f67be16fcacd05d319b6729cd85fe698c07cec504776146eb7a041d9e3cacbf0fcd86441981c0083eed1f8f1b18393f0b186e47ce1b7b4981417b491",
                    e : "10001",
                    d : "59fed719f8959a468de367f77a33a7536d53b8e4d25ed49ccc89a94cd6899da90415623fb73386e9635034fb65ad5f248445a1c66703f760d64a8271ad342b1",
                    s : 512
                  },
                 "1024":
                 {
                   m : "130ebebd67b16a9ab2c53a437badbf8f01a80c750095a7fcfe95742c3d5ed1abb318babc5cb5d9350fee4da65ee074f65e1758117e6945f0fcfc8137528053ce9d1da8618890dee24e5e0bf8c87795bb1d09eddd544640824ee0dd0ea9fd908d27b0f8a1ae5c37f3647fbf2f5795500ad76c195b3387d0458a8f51b701472301",
                   e : "10001",
                   d : "12e8da920d4599458e84ec5ef1656161807f427d05eb79182b7418259d6f6c14364d1f5caf9130c8d9d9d6ea71d1bdbc87781a46a16bcb9e672814fed3b9c96ddffe0a1b0955ae68055c8f92fef518a04fc32a2ea8390e617cc5556a251f9ae9eee70a32e579cb3e9f298848a9b3aaf634f5930ffbf74473f7cb6c0cefee1751",
                   s : 1024
                 },
                 "2048":
                 {
                   m : "9800012b1e533c2c28187424e1289fd4f7fe67487058f5ac7f27f18476c6c93db20b6d2c63d04ff310c1e7211cf8014adc006176529abc53fd1780274fc2629cf51d627c7465c3cbf4f110c3560e2128b97c4ea8a431f0b2a326fc31899790515ad45874ca75c68ee6695558736490ea895d598b8525bccab3156104d360b115ae25e99e9d899a2219136bad0336eeee0c6d725aa9c3b6b923c1ad95a9057b9deb7b563e05614acc800d9d8ec5de405d74feea722c5146feb80829508180ab5c80bf792b83f07c04c73ce0b3cf0d9f74aa92a4704819d103e58f5d4b8ca750148ba1cbab8eb55f92775b18da427c3a0b592809f3853274841a44b7129ec6a623",
                   e : "10001",
                   d : "409c6fe2b6474762b5c07f4e55ef80d174814dc1fb0fb58e979691116fb3dc433f759ff8a88d1a0f0666862b0b3758c54b7355fa87ee827369381e1f97c5d74944e032c7186b51a956fb49d6deb3aee0b2c7e65fc53bfd46d217764850667ed0363de143f3f3d06d5a0018693ad3dacdf78a18d037ceeccb7508776f27b30852b8b505666a8dca5bfbb455d2f85918f8b5295061c97673c78802c5f5cf4581c7215dc32af8dfb6fc10e9ba51fb5a88abab94157ccecf615e104a91a45e9bee072fe7b388344c1bbad4a8f7d5daeccbadf778d59eff2a491a067bba5343c5a094c61b575fe367ecfcc01c3d208c2f8c05b9496a929b2b72e70160d07d07f248f1",
                   s : 2048
                 }
                };

var username;
var password;
var timers = [];
var counter = 0;
var _public_key = null;
var _secret_key = null;
var _session_id = null;
var _user_id = null;
var _use_secure = false; //this is used to control if use https for ajax requests. Many phones has problem to establish connection with sites that use self-signed certificates, so use http instead by default

//generate some random text based on the size provided
function generate_random_text(text_size){
  var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz";
  var random_text = "";
  for(var i=0;i<text_size;i++){
    var idx = Math.floor(Math.random()*characters.length);
    random_text += characters.substring(idx, idx+1);
  }
  return random_text;
}


