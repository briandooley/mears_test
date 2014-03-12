Ext.define('MyLandlord.controller.RepairListController', {
    extend: 'Ext.app.Controller',
    alias: 'controller.repairlistcontroller',

    config: {
        refs: {
            repairlistNav: 'repairlistnavview',
            repairlistSearchField: '#repairlistsearchitemid',
            sessionsByPresenterList: {
                autoCreate: true,
                selector: '#sessionsbyrepairlistlistitemid',
                xtype: 'sessionsbyrepairlistlist'
            }
        },

        control: {
            "list#repairlistlistitemid": {
                select: 'onRepairListlistitemidSelect'
            },
            "navigationview#repairlistnavviewitemid": {
                back: 'onNavigationviewBack'
            }
        }
    },

    onRepairListlistitemidSelect: function(dataview, record, eOpts) {
        this.session = this.getSessionsByPresenterList();

        // creates a local store just for a couple records. this will go away
        var sessionLocalStore = Ext.create("Ext.data.Store",{
            data: record.get("sessions")
        });

        // assign the new store to the local session detail list
        this.session.setStore(sessionLocalStore);

        // Set the title of the repairlists page the repairlist name
        this.session.config.title = "RepairList: " // + record.get("firstName") + " " + record.get("lastName");


        // don't show the search bar while looking at repairlists sessions
        //this.getPresenterSearchField().hide();

        // bring the session list in with nav
        // (if 2 column display, this is where we would just show 2nd view)
        this.getRepairNavViewView().push(this.session);
    }

//    onNavigationviewBack: function(navigationview, eOpts) {
//        // show the search bar while looking at repairlists
//        this.getRepairListSearchField().show();
//    }

});