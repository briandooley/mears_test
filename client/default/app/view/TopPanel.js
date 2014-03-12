/// <reference path="PresenterNavView.js" />
/// <reference path="TopPanel.js" />
/// <reference path="TopPanel.js" />
Ext.define('MyLandlord.view.TopPanel', {
    extend: 'Ext.Panel',
    alias: 'widget.toppanel',

    requires: [
        'MyLandlord.view.LoginFormPanel',
        'MyLandlord.view.RepairNavigator',
        'MyLandlord.view.DetailView'
],

    config: {
        layout: {
            type: 'card'
        },
        items: [
            {
                xtype: 'loginformpanel'
            },
            {
                xtype: 'tabpanel',
                itemId: 'mainTabPanel',
                tabBar: {
                    docked: 'bottom'
                },
                items: [
                    {
                        xtype: 'repairlistnavview',
                        title: 'Log Repair',
                        iconCls: 'compose'
                    },
                    {
                        //xtype: 'sessionnavview',
                        title: 'My Details',
                        disabled: true,
                        iconCls: 'user'
                    }
                ]
            }
        ]
    }
});