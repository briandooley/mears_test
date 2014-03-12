/// <reference path="RepairListStore.js" />
Ext.define('MyLandlord.store.RepairListStore', {
    extend: 'Ext.data.TreeStore',

    requires: [
        'MyLandlord.model.RepairListModel'
    ],

    config: {
        autoLoad: true,
        model: 'MyLandlord.model.RepairListModel',
        storeId: 'RepairListStore'
    }
});