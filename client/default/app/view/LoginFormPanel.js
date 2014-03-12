Ext.define('MyLandlord.view.LoginFormPanel', {
    extend: 'Ext.form.Panel',
    alias: 'widget.loginformpanel',

    config: {
      id:'loginform',
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
            },
            { 
                xtype: 'textfield',
                label: 'Result',
                name: 'result',
                id: 'result'
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

        console.log("userName = " + formValues.username);
        console.log("password = " + formValues.password);
  
        doLogin(formValues.username, formValues.password);
    }

});

function doLogin(username, password)
{
      var loggedIn = false;
      var resultFromLogin = '';
      console.log("username is :- " + username);
      console.log("password is :- " + password;      
  
      $fh.auth({
        'policyId': 'MearsFeedHenryAuthPolicy',
        'clientToken': '3VdyObIqH--3eWv49kfXLh3l',
        'endRedirectUrl': window.location.href,
        'params': {
          'userId': username,
          'password': password
        }
      }, function(res) 
      {
      // Authentication successful - store sessionToken in variable
      var sessionToken = res.sessionToken;
      var authResponse = res.authResponse;
      ShowResult('Login Successful');
      loggedIn = true;
      
      }, function(msg, err) 
      {
      var errorMsg = err.message;
      if (errorMsg === 'user_purge_data' || errorMsg === 'device_purge_data') 
      {
        // User or device has been black listed from administration console and all local data should be wiped
        ShowResult('Blackilisted/Wiped');
      } 
      else 
      {
        ShowResult('Login Failed');
      }
      });        
}

function ShowResult(resultFromLogin)
{
      var resultObj = Ext.getCmp('result');
      resultObj.setValue(resultFromLogin);
      console.log(resultFromLogin);
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
