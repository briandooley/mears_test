/**
 * Created by John Atkins on 10/03/14.
 */
Ext.define('MyLandlord.view.PhotoCarousel',
    {
    extend: 'Ext.Panel',
    alias: 'widget.photocarousel',

    requires: [
    ],
    id: 'photoCarouselPanelId',

    config: {
        showAnimation : 'pop',
        hideAnimation : 'popOut',
        modal : true,
        centered: true,
        scrollable: false,
        height: '98%',
        width: '98%',
        //firstPhoto : 0,
        //countOfPhotos : 0,
        layout: {
            type: 'fit'
        },
        items: [
            {
                xtype: 'toolbar',
                docked: 'top',
                id: 'photoToolbarId',
                title: 'Photographs of Repair',
                style: {
                    'font-size': '.75em'
                },
//                layout: {
//                    pack: 'left'
//                },
//                style: {
//                    'border': '1px solid darkgrey',
//                    'background': 'lightgrey',
//                    'margin-top': '0px',
//                    'margin-left': '0px',
//                    'margin-bottom': '0px',
//                    'font-size': '.75em'
//                },
                items: [
                    {
                        xtype: 'button',
                        ui: 'back',
                        text: 'Prev',
                        style: {
                            'font-size': '1.25em'
                        },
                        listeners: {
                            tap: function(button, e, eOpts) {

                                var carousel = Ext.getCmp('photocarouselId');
                                carousel.previous();
                            }
                        }
                    },
                    {
                        xtype: 'button',
                        align: 'right',
                        ui: 'forward',
                        text: 'Next',
                        style: {
                            'font-size': '1.25em'
                        },
                        listeners: {
                            tap: function(button, e, eOpts) {

                                var carousel = Ext.getCmp('photocarouselId');
                                carousel.next();
                            }
                        }
                    },
                    {
                        xtype: 'spacer'
                    },
                    {
                        xtype: 'button',
                        ui: 'normal',
                        text: 'Delete',
                        style: {
                            'font-size': '1.25em'
                        },
                        iconCls: 'trash',
                        listeners: {
                            tap: function(button, e, eOpts) {

                                var carousel = Ext.getCmp('photocarouselId');
                                // Note carousel contains an indicator in item 1 so do not delete that!
                                var photoCount = carousel.getItems().length - 1;
                                if (photoCount > 0)
                                {
                                    var index = carousel.getActiveIndex()
                                    carousel.removeAt(index + 1)
                                    if (index > 0)
                                    {
                                        carousel.setActiveItem(index);
                                    }
                                    photoCount = photoCount -1;
                                    var toolbar = Ext.getCmp('photoToolbarId');
                                    if ((typeof toolbar !== "undefined")  && (toolbar !== null))
                                    {
                                        if (index  == photoCount)
                                        {
                                            index = index -1;
                                        }
                                        if (photoCount > 0)
                                        {
                                            toolbar.setTitle('Photo ' + (index + 1) + ' of ' + photoCount);
                                        }
                                        else
                                        {
                                            toolbar.setTitle('No Photos');
                                        }
                                    }
                                }
                            }
                        }
                    },
                    {
                        xtype: 'button',
                        ui: 'normal',
                        text: 'Close',
                        style: {
                            'font-size': '1.25em'
                        },
                        listeners: {
                            tap: function(button, e, eOpts) {

                                var pnl = Ext.getCmp('photoCarouselPanelId');
                                pnl.destroy();
                            }
                        }
                    }
                ]
            },
            {
                xtype: 'container',
                defaults: {
                    //width: '20%',
                    style: 'margin: .1em'
                },
                layout: {
                    type: 'hbox',
                    align: 'stretch'
                },
                items: [
                    {
                        xtype: 'carousel',
                        id: 'photocarouselId',
                        //style: 'background-color: red',
                        layout: {
                            type: 'hbox'
                        },
                        defaults: {
                            styleHtmlContent: true
                        },
                        flex: 1,
                        items: [],
                        listeners : //[
                            {
                            // Call image count checker for each image change
                                activeitemchange : function(carousel, eOpts)
                                {

                                    if ((typeof carousel !== "undefined")  && (carousel !== null))
                                    {
                                        // Note carousel contains an indicator in item 1 so do not count that
                                        var photoCount = carousel.getItems().length - 1;
                                        var toolbar = Ext.getCmp('photoToolbarId');
                                        if ((typeof toolbar !== "undefined")  && (toolbar !== null))
                                        {
                                            if (photoCount > 0)
                                            {
                                                toolbar.setTitle('Photo ' + (carousel.activeIndex + 1) + ' of ' + photoCount);
                                            }
                                            else
                                            {
                                                toolbar.setTitle('No Photos');
                                            }
                                        }
                                    }

                                }
                            }
                    }
                ]
            }
        ]
    }
});

