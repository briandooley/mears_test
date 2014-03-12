/// <reference path="RepairList.js" />
Ext.define('MyLandlord.view.RepairList', {
    extend: 'Ext.dataview.NestedList',
    alias: 'widget.repairlist',

    config: {
        useTitleAsBackText: false,
        backText: 'Back',
        itemId: 'repairlistitemid',
        store: 'RepairListStore',
        variableHeights: true,
        infinite: true,
        itemTpl: [
            //'<h3>{text}</h3>'
            '<h3>Hello</h3>',
            '<div class="headertext">{title}</div>'
        ],
        detailCard: {
            xtype: 'detailview'
        }
    },

    initialize: function() {
        this.config.title = MyLandlord.app.title;
        //this.config.title = 'My Landlord';
        this.callParent();

    }

    

});