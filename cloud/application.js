/**
 * Created by AtkinsJ on 11/03/14.
 */
var nodeapp = require("fh-nodeapp");
nodeapp.HostApp.init();
nodeapp.HostApp.serveApp(require('main.js'));
