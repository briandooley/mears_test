Ext.define('MyLandlord.model.RepairListModel', {
    extend: 'Ext.data.Model',

    config: {
        fields: [
            {
                name: 'text',
                type: 'string'
            }
        ],
        proxy: {
            type: 'ajax',
            url: 'data/propertyItems.json',
            reader: {
                type: 'json',
                rootProperty: 'items'
}
        }
    }
});