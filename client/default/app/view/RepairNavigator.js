Ext.define('MyLandlord.view.RepairNavigator', {
    extend: 'Ext.navigation.View',
    alias: 'widget.repairlistnavview',

    requires: [
        'MyLandlord.view.RepairList'
    ],

    config: {
        itemId: 'repairlistnavviewitemid',
        title: 'John was here',
        autoDestroy: false,
        items: [
            {
                xtype: 'repairlist'
            }
        ],
        navigationBar: {
            items: [
                {
                    xtype: 'label',
                    html: 'Mears: My Landlord - Home Repairs'
                    //style: 'text-align:center;position:relative;margin-left:5px;top:25%'

                },
                {
                    xtype: 'button',
                    id: 'myButtonId',
                    itemId: 'myButtonItemId',
                    text: 'Logout',
                    align: 'right',
                    handler: function() {
                       var mainPanel = Ext.ComponentQuery.query("toppanel")[0];
                        mainPanel.animateActiveItem(0,{type: 'flip' });
                    }
                }
//                ,
//                {
//                    xtype: 'searchfield',
//                    placeHolder: 'Search',
//                    name: 'searchField',
//                    align: 'left',
//                    width: 180,
//                    itemId: 'repairlistsearchitemid',
//                    listeners: {
//                        keyup: function (field) {
//
//
//
//                                var searchString = Ext.String.trim(field.getValue()).toLowerCase();
//                                var repairlistStore = Ext.data.StoreManager.lookup('RepairStore');
//                                if (searchString.length == 0) {
//                                    repairlistStore.clearFilter();
//
//                                } else {
//
//                                    repairlistStore.clearFilter();
//                                    console.log(repairlistStore.getCount() + ":" + repairlistStore.getAllCount());
//                                    repairlistStore.filterBy(function(repairlistRec) {
//                                        var title = repairlistRec.get("text").toLowerCase();
//                         				return title.indexOf(searchString) >= 0;
//                    				});
//                                }
//
//
//
//                            }
//                    }
//                }
            ],
            docked: 'top'
        }
    }

});