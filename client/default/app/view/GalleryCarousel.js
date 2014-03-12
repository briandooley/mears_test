/**
 * Created by John Atkins on 09/03/14.
 */
Ext.define('MyLandlord.view.GalleryCarousel', {
    extend : 'Ext.carousel.Carousel',
    xtype : 'gallerycarousel',
    requires : ['Ext.TitleBar'],
    config : {
        fullscreen : true,
        modal : true,
        html : '<div class="close-gallery" data-action="close_carousel"></div>',
        cls : 'gallery-carousel',
        showAnimation : 'fadeIn',
        hideAnimation : 'popOut',
        indicator : false,
        countOfPhotos : 0,
        items: [],
        listeners : {
            // Call image count checker for each image change
            activeitemchange : function(carousel, newPanel){
                this.changeImageCount(newPanel);
            }
        }
    },

    initialize : function(){
        var me = this;

//        for (index = 0; index < imgParent.items.length ; index++)
//        {
//            var itemObj = imgParent.items.getAt(index);
//            //console.log("attr = " + itemObj)
//
//            if (itemObj.isXType('image'))
//            {
//                //var srcUri = itemObj.getSrc()
//                //console.log("Src = " + srcUri)
//                arrayOfImages.push(itemObj.getSrc());
//            }
//        }

        // totalCount = this.carouselItems.length;

        // Create a bottom bar which will show the image count
        me.bottomBar = Ext.create('Ext.TitleBar', {
            xtype : 'titlebar',
            baseCls : Ext.baseCSSPrefix + 'infobar',
            name : 'info_bar',
            title : '',
            docked : 'bottom',
            cls : 'gallery-bottombar',
            items : [{
                xtype : 'button',
                align : 'left',
                iconCls : 'nav gallery-left',
                ui : 'plain',
                handler : function(){
                    me.previous();
                }
            }, {
                xtype : 'button',
                align : 'right',
                iconCls : 'nav gallery-right',
                ui : 'plain',
                handler : function(){
                    me.next();
                }
            }]
        });

        me.add(me.bottomBar);
        me.callParent(arguments);
    },

    /**
     * Change image count at bottom bar
     */
    changeImageCount : function(activePanel){
        var me = this;

        if (me.getCountOfPhotos() > 0)
        {
            me.bottomBar.setTitle(activePanel.config.index + ' of ' + me.getCountOfPhotos());
        }
    }
});

