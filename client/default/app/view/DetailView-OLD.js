Ext.define('MyLandlord.view.DetailViewOLD', {
        extend: 'Ext.form.Panel',
        alias: 'widget.detailviewOLD',

        requires: [
            'Ext.form.FieldSet',
            'Ext.field.Number',
            'Ext.field.Spinner',
            'Ext.field.Password',
            'Ext.field.Email',
            'Ext.field.Url',
            'Ext.field.DatePicker',
            'Ext.field.Select',
            'Ext.field.Hidden',
            'Ext.field.Radio',
            'Ext.MessageBox'
        ],
        id: 'basicform',

        config: {
            scrollable: false,
            layout: {
                type: 'fit'
            },
            items: [
                {
                    xtype: 'fieldset',
                    id: 'fieldset1',
                    style: {
                        'border': '1px solid darkgrey',
                        'background': 'lightgrey',
                        'margin-top': '0px',
                        'margin-left': '0px',
                        'margin-bottom': '0px',
                        'font-size': '.75em'
                    },

                    scrollable: true,
                    title: '<div> Enter details of the repair.<br />Items marked * are mandatory.</div>',
                    height: 0,

                    defaults: {
                        labelWidth: '25%'
                    },
                    items: [
                        {
                            xtype: 'container',
                            defaults: {
                                xtype: 'button',
                                //width: '20%',
                                style: 'margin: .5em'
                            },
                            layout: {
                                type: 'hbox'
                            },
                            items: [
                                {
                                    text: 'Take Photo',
                                    itemId: 'takePhotoButton',
                                    scope: this,
                                    hasDisabled: false
                                },
                                {
                                    text: 'Load Photo',
                                    itemId: 'loadPhotoButton',
                                    scope: this,
                                    hasDisabled: false
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            defaults: {
                                height: 100,
                                width: 120
                                //align: 'left'
                            },
                            layout: {
                                type: 'hbox'
                                //align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'carousel',
                                    id: 'myCarousel',
                                    height: 100,
                                    //width: 100,
                                    //ui: 'light',
                                    direction: 'horizontal',
                                    showAnimation: 'flip',

                                    items: [
                                        {
                                            xtype: 'image',
                                            id: 'myCarouselImage1',
                                            itemId: 'carouselImage1',
                                            height: 100,
                                            width: 120,
                                            src: 'app/images/icons/camera_icon.png',
                                            listeners: {
                                                tap: function(button, e, eOpts) {
                                                    OnPhotoTap(button, e, eOpts);
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'image',
                                            //itemId: 'carouselImage',
                                            height: 100,
                                            //width: 120,
                                            src: 'app/images/icons/maps_icon.png',
                                            listeners: {
                                                tap: function(button, e, eOpts) {
                                                    OnPhotoTap(button, e, eOpts);
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'image',
                                            //itemId: 'carouselImage',
                                            height: 100,
                                            //width: 120,
                                            src: 'app/images/icons/payment_icon.png',
                                            listeners: {
                                                tap: function(button, e, eOpts) {
                                                    OnPhotoTap(button, e, eOpts);
                                                }
                                            }
                                        }
                                    ]
                                }
                            ]
                        },
                    /***************************************/
                        {
                            xtype: 'textareafield',
                            name: 'reportDetails',
                            label: 'Details of the problem',
                            labelAlign: 'top',
                            autoCorrect: true,
                            required: true
//                        style: {
//                            'border-left': '1px solid red'
//                        }
                        },
                        {
                            xtype: 'textfield',
                            name: 'firstName',
                            label: 'First Name',
                            labelAlign: 'top',
//                        style: {
//                            'border-left': '1px solid green'
//                        },
                            required: true
                        },
                        {
                            xtype: 'textfield',
                            name: 'lastName',
                            label: 'Last Name',
                            labelAlign: 'top',
//                        style: {
//                            'border': '1px solid blue'
//                        },
                            required: true
                        },
                        {
                            xtype: 'textfield',
                            name: 'addressLine1',
                            label: 'Address Line 1',
                            required: true
                        },
                        {
                            xtype: 'textfield',
                            name: 'addressLine2',
                            label: 'Address Line 2'
                        },
                        {
                            xtype: 'textfield',
                            name: 'addressLine3',
                            label: 'Address Line 2'
                        },
                        {
                            xtype: 'textfield',
                            name: 'postcode',
                            label: 'Postcode',
                            autoCapitalize: true,
                            required: true
                        },
                        {
                            xtype: 'textfield',
                            name: 'phoneNo',
                            label: 'Phone No'
                        },
                        {
                            xtype: 'textfield',
                            name: 'mobileNo',
                            label: 'Mobile No'
                        },
                        {
                            xtype: 'emailfield',
                            name: 'email',
                            label: 'Email'
                        },
                        {
                            xtype: 'container',
                            items: [
                                {
                                    xtype: 'label',
                                    width: '100%',
//                            marginTop: '25px',
//                            paddingTop: '5px',
                                    name: 'availability',
                                    style: 'text-align:left;position:relative;margin-left:5px;margin-top:20px',
                                    html: 'Your Availability:'
                                },
// --- Monday availability --
                                {
                                    xtype: 'container',
                                    items: [
                                        {
                                            xtype: 'fieldset',
                                            height: '3em',
                                            margin: -1,
//                                    padding: 0,
                                            layout: {
                                                type: 'hbox'
                                                //align: 'stretch'
                                            },
                                            defaults: {
                                                xtype: 'radiofield',
                                                labelWidth: '55%',
                                                labelAlign: 'right',
                                                style: 'font-size:.75em',
                                                width: '20%'
                                                //width: '4.9em'
                                                //  labelWidth: '55%',
                                                //  labelAlign: 'right',
                                            },
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    labelWidth: '6em',
                                                    labelAlign: 'left',
                                                    style: 'font-size:.75em',
                                                    //width: '6em',
                                                    width: '20%',
                                                    name: 'monday',
                                                    label: 'Monday'
                                                },
                                                {
                                                    style: 'font-size:.75em',
                                                    //width: '5.5em',
                                                    name: 'monday',
                                                    label: 'All<br />Day',
                                                    checked: true
                                                },
                                                {
                                                    name: 'monday',
                                                    label: 'AM'
                                                },
                                                {
                                                    name: 'monday',
                                                    label: 'PM'
                                                }
                                            ]
                                        }
                                    ]
                                },
// --- Tuesday availability --
                                {
                                    xtype: 'container',
                                    items: [
                                        {
                                            xtype: 'fieldset',
                                            height: 50,
                                            margin: -1,
//                                        padding: 0,
                                            layout: {
                                                type: 'hbox'
                                                //                                    align: 'stretch'
                                            },
                                            defaults: {
                                                xtype: 'radiofield',
                                                labelWidth: '55%',
                                                labelAlign: 'right',
                                                style: 'font-size:.75em',
                                                width: '20%'
                                                //width: '4.9em'
                                                //  labelWidth: '55%',
                                                //  labelAlign: 'right',
                                            },
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    labelWidth: '6em',
                                                    labelAlign: 'left',
                                                    style: 'font-size:.75em',
                                                    //width: '6em',
                                                    width: '20%',
                                                    name: 'tuesday',
                                                    label: 'Tuesday'
                                                },
                                                {
                                                    style: 'font-size:.75em',
                                                    name: 'tuesday',
                                                    label: 'All<br />Day',
                                                    checked: true
                                                },
                                                {
                                                    name: 'tuesday',
                                                    label: 'AM'
                                                },
                                                {
                                                    name: 'tuesday',
                                                    label: 'PM'
                                                }
                                            ]
                                        }
                                    ]
                                },
// --- Wednesday availability --
                                {
                                    xtype: 'container',
                                    items: [
                                        {
                                            xtype: 'fieldset',
                                            height: 50,
                                            margin: -1,
//                                        padding: 0,
                                            layout: {
                                                type: 'hbox'
                                                //                                    align: 'stretch'
                                            },
                                            defaults: {
                                                xtype: 'radiofield',
                                                labelWidth: '55%',
                                                labelAlign: 'right',
                                                style: 'font-size:.75em',
                                                width: '20%'
                                                //width: '4.9em'
                                                //  labelWidth: '55%',
                                                //  labelAlign: 'right',
                                            },
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    labelWidth: '6em',
                                                    labelAlign: 'left',
                                                    style: 'font-size:.75em',
                                                    //width: '6em',
                                                    width: '20%',
                                                    name: 'wednesday',
                                                    label: 'Wednesday'
                                                },
                                                {
                                                    style: 'font-size:.75em',
                                                    name: 'wednesday',
                                                    label: 'All<br />Day',
                                                    checked: true
                                                },
                                                {
                                                    name: 'wednesday',
                                                    label: 'AM'
                                                },
                                                {
                                                    name: 'wednesday',
                                                    label: 'PM'
                                                }
                                            ]
                                        }
                                    ]
                                },
// --- Thursday availability --
                                {
                                    xtype: 'container',
                                    items: [
                                        {
                                            xtype: 'fieldset',
                                            height: 50,
                                            margin: -1,
//                                        padding: 0,
                                            layout: {
                                                type: 'hbox'
                                                //                                    align: 'stretch'
                                            },
                                            defaults: {
                                                xtype: 'radiofield',
                                                labelWidth: '55%',
                                                labelAlign: 'right',
                                                style: 'font-size:.75em',
                                                width: '20%'
                                                //width: '4.9em'
                                                //  labelWidth: '55%',
                                                //  labelAlign: 'right',
                                            },
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    labelWidth: '6em',
                                                    labelAlign: 'left',
                                                    style: 'font-size:.75em',
                                                    //width: '6em',
                                                    width: '20%',
                                                    name: 'thursday',
                                                    label: 'Thursday'
                                                },
                                                {
                                                    style: 'font-size:.75em',
                                                    name: 'thursday',
                                                    label: 'All<br />Day',
                                                    checked: true
                                                },
                                                {
                                                    name: 'thursday',
                                                    label: 'AM'
                                                },
                                                {
                                                    name: 'thursday',
                                                    label: 'PM'
                                                }
                                            ]
                                        }
                                    ]
                                },
// --- Friday availability --
                                {
                                    xtype: 'container',
                                    items: [
                                        {
                                            xtype: 'fieldset',
                                            height: 50,
                                            margin: -1,
//                                        padding: 0,
                                            layout: {
                                                type: 'hbox'
                                                //                                    align: 'stretch'
                                            },
                                            defaults: {
                                                xtype: 'radiofield',
                                                labelWidth: '55%',
                                                labelAlign: 'right',
                                                style: 'font-size:.75em',
                                                width: '20%'
                                                //width: '4.9em'
                                                //  labelWidth: '55%',
                                                //  labelAlign: 'right',
                                            },
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    labelWidth: '6em',
                                                    labelAlign: 'left',
                                                    style: 'font-size:.75em',
                                                    //width: '6em',
                                                    width: '20%',
                                                    name: 'friday',
                                                    label: 'Friday'
                                                },
                                                {
                                                    style: 'font-size:.75em',
                                                    name: 'friday',
                                                    label: 'All<br />Day',
                                                    checked: true
                                                },
                                                {
                                                    name: 'friday',
                                                    label: 'AM'
                                                },
                                                {
                                                    name: 'friday',
                                                    label: 'PM'
                                                }
                                            ]
                                        }
                                    ]
                                }
// --- Friday availability --
//                        {
//                            xtype: 'container',
//                            height: 50,
////                            margin: -1,
//                            layout: {
//                                type: 'hbox'
//                            },
//                            items: [
//                                {
//                                    xtype: 'label',
//                                    html: 'Friday:',
//                                    //width: '25%',
//                                    style: 'text-align:left;position:relative;margin-left:5px;top:25%'
//                                },
//                                {
//                                    xtype: 'container',
//                                    layout: {
//                                        type: 'hbox'
//                                    },
//                                    items: [
//                                        {
//                                            xtype: 'radiofield',
//                                            //labelWidth: 100,
//                                            labelAlign: 'right',
//                                            width: '25%',
//                                            name: 'thursday',
//                                            label: 'All Day',
//                                            checked: true
//                                        },
//                                        {
//                                            xtype: 'radiofield',
//                                            //labelWidth: 100,
//                                            labelAlign: 'right',
//                                            width: '25%',
//                                            name: 'thursday',
//                                            label: 'AM'
//                                        },
//                                        {
//                                            xtype: 'radiofield',
//                                            //labelWidth: 100,
//                                            labelAlign: 'right',
//                                            width: '25%',
//                                            name: 'thursday',
//                                            label: 'PM'
//                                        }
//                                    ]
//                                }
//                            ]
//                            }
                            ]
                        },
                        {
                            xtype: 'button',
                            style: 'margin: .5em',
                            itemId: 'submitButton',
                            name: 'submitButton',
                            text: 'Send details to Mears'
                        }
                    ]
                }
            ],
            listeners: [
                {
                    fn: 'OnSubmitButtonTap',
                    event: 'tap',
                    delegate: '#submitButton'
                },
                {
                    fn: 'OnTakePhotoButtonTap',
                    event: 'tap',
                    delegate: '#takePhotoButton'
                },
                {
                    fn: 'OnLoadPhotoButtonTap',
                    event: 'tap',
                    delegate: '#loadPhotoButton'
                }
            ]
        },

        OnSubmitButtonTap: function (button, e, eOpts) {

            console.log("OnSubmitButtonTap");

            var formObject = button.up('detailview');
            var formValues = formObject.getValues();

            console.log(formValues);

            console.log(formValues.firstName);

        },

        OnTakePhotoButtonTap: function (button, e, eOpts) {

            if (usingFH)
            {
                $fh.cam({
                        act: "picture",
                        uri: true
                    },
                    function(res)
                    {
                        if (res.uri)
                        {
                            CreateCarouselItem(res.uri);
                        }
                        else
                        {
                            alert("Cannot invoke camera");
                        }
                        /*********************
                         var img = new Image();
                         if (img !== null)
                         {
                             console.log("OnLoadPhotoButtonTap: Not null");
                             img.src = "data:image/" + res.format + ";base64," + res.b64;
                         }
                         *********************/
                    },
                    function(msg, err)
                    {
                        if (msg)
                        {
                            alert("Cannot open folder: msg: " + msg);
                        }
                        if (err)
                        {
                            alert("Cannot open folder: err: " + err);
                        }
                    });
            }
            else
            {
                CreateCarouselItem('app/images/icons/settings_icon.png');
            }
        },

        OnLoadPhotoButtonTap: function (button, e, eOpts) {

            /*******************************************************/

            if (usingFH)
            {
                $fh.cam({
                        act: "picture",
                        source: "photo",
                        uri: true
                    },
                    function(res)
                    {
                        if (res.uri)
                        {
                            CreateCarouselItem(res.uri);
//                    var imageId = Ext.getCmp('photoId');
//                    imageId.setSrc(res.uri);
                        }
                        else
                        {
                            alert("Cannot load Photo from folder");
                        }
                    },
                    function(msg, err)
                    {
                        if (msg)
                        {
                            alert("Cannot open folder: msg: " + msg);
                        }
                        if (err)
                        {
                            alert("Cannot open folder: err: " + err);
                        }
                    });
            }
            else
            {
                CreateCarouselItem('app/images/icons/twitter_icon.png');
            }
            /*******************************************************/

        }}
);

var arrayOfImages = [];
var imageNo = 0;

function OnPhotoTap(img, e, eOpts) {

    var imgParent = img.getParent();
    var clickedImgIndex = imgParent.getActiveIndex();
    var index;

    me = this;

    arrayOfImages.length = 0;

    for (index = 0; index < imgParent.items.length ; index++)
    {
        var itemObj = imgParent.items.getAt(index);
        //console.log("attr = " + itemObj)

        if (itemObj.isXType('image'))
        {
            //var srcUri = itemObj.getSrc()
            //console.log("Src = " + srcUri)
            arrayOfImages.push(itemObj.getSrc());
        }
    }

    // Create the Gallery Carousel
    var photoCarouselPanel = Ext.Viewport.add({
        xtype : 'photocarousel',
        style: {
            'border': '1px solid red'
            //'background': 'yellow'
        }
    });


    var photoCarousel = Ext.getCmp('photocarouselId');

    // Add the images as separate containers in the carousel
    for(index = 0; index < arrayOfImages.length; index++){
        photoCarousel.add({

            xtype: 'image',
//            height: '50%',
//            width: '50%',
            src: arrayOfImages[index]
//            xtype : 'container',
//            html : '<img class="gallery-item" src="' + arrayOfImages[index] + '" />',
//            index : index + 1
        });
    }

    // Set the clicked image container as the active item of the carousel
    photoCarousel.setActiveItem(clickedImgIndex);

    // Show the carousel
    photoCarouselPanel.show();

//    Ext.defer(function(){
//        Ext.Viewport.remove(photoCarouselPanel);
//    }, 300);

}

function CreateCarouselItem(uri) {

    var carouselId = Ext.getCmp('myCarousel');

    carouselId.add({
        xtype: 'image',
        height: 100,
        src: uri,
        listeners: {
            tap: function(button, e, eOpts) {
                OnPhotoTap(button, e, eOpts);
            }
        }
    });

    //var imgParent = img.getParent();
    //var clickedImgIndex = imgParent.getActiveIndex();

    var newImgIndex = carouselId.items.length - 1;

    //carouselId.activeIndex += 1;
    carouselId.setActiveItem(newImgIndex);
}

