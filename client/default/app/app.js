/*
 This file is generated and updated by Sencha Cmd. You can edit this file as
 needed for your application, but these edits will have to be merged by
 Sencha Cmd when it performs code generation tasks such as generating new
 models, controllers or views and when running "sencha app upgrade".

 Ideally changes to this file would be limited and most work would be done
 in other places (such as Controllers). If Sencha Cmd cannot merge your
 changes and its generated code, it will produce a "merge conflict" that you
 will need to resolve manually.
 */

Ext.application({
    name: 'MyLandlord',

    requires: [
        'Ext.MessageBox'
    ],

     models: [
        'RepairListModel'
    ],

    stores: [
        'RepairListStore'
    ],

    views: [
        'TopPanel',
        'LoginFormPanel',
        'RepairNavigator',
        'RepairList',
        'DetailView',
        'GalleryCarousel',
        'PhotoCarousel'
    ],

    controllers: [
        'RepairListController'
    ],

    icon: {
        '57': 'lib/touch/resources/icons/Icon.png',
        '72': 'lib/touch/resources/icons/Icon~ipad.png',
        '114': 'lib/touch/resources/icons/Icon@2x.png',
        '144': 'lib/touch/resources/icons/Icon~ipad@2x.png'
    },

    isIconPrecomposed: true,

    title: 'My Property',

    startupImage: {
        '320x460': 'lib/touch/resources/startup/320x460.jpg',
        '640x920': 'lib/touch/resources/startup/640x920.png',
        '768x1004': 'lib/touch/resources/startup/768x1004.png',
        '748x1024': 'lib/touch/resources/startup/748x1024.png',
        '1536x2008': 'lib/touch/resources/startup/1536x2008.png',
        '1496x2048': 'lib/touch/resources/startup/1496x2048.png'
    },

    launch: function() {
        // Destroy the #appLoadingIndicator element
        Ext.fly('appLoadingIndicator').destroy();

        if (usingFH)
        {
            $fh.init({
                "host": "https://mears.appsdeveloper.o2.co.uk.feedhenry.com",
                "appid": "Zifzl6TTCti8OXjauj4aBSV9",
                "appkey": "b8c7c618dc0d23433207b94d57af2fe6b1326d5f"
            }, function(res) {
                // Init call was successful. Alert the response
                //alert('Got response from init:' + JSON.stringify(res));
            }, function(msg, err) {
                // An error occured during the init call. Alert some debugging information
                alert('Init call failed with error:' + msg + '. Error properties:' + JSON.stringify(err));
            });
        }

        // Initialize the main view
        //Ext.Viewport.add(Ext.create('MyLandlord.view.Main'));
        Ext.Viewport.add(Ext.create('MyLandlord.view.TopPanel'));
    },

    onUpdated: function() {
        Ext.Msg.confirm(
            "Application Update",
            "This application has just successfully been updated to the latest version. Reload now?",
            function(buttonId) {
                if (buttonId === 'yes') {
                    window.location.reload();
                }
            }
        );
    }
});

var usingFH = true;
