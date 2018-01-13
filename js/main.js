(function (w, wO, d, dO, $, t) {
    var DOMObjects = {},
        Flags = {
            NavMenuOpened: false
        },
        Variables = {
            HeaderHeight: 0
        },
        ElasticEaseOut = Elastic.easeOut.config(2, 1);

    function LoadMap() {
        var Location = new google.maps.LatLng(41.835117, -87.627130),
            Options = {
                center: Location,
                zoom: 15,
                disableDefaultUI: true
            },
            Map = new google.maps.Map($('#Map', d)[0], Options),
            Maker = new google.maps.Marker({
                position: Location,
                map: Map,
                animation: google.maps.Animation.BOUNCE,
                icon: 'marker.png'
            });
        google.maps.event.addListener(Maker, 'click', function () {
            w.open('https://www.google.com/maps/preview/@' + Location.lat + ',' + Location.lng + ',15z');
        });
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                Location = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                Map.setCenter(Location);
                Maker.setPosition(Location);
            });
        }
    }

    function OnResize() {
        if (w.innerWidth > 600) {
            DOMObjects.NavButton.attr('style', '');
        }
        DOMObjects.HomeBox.css('height', w.innerHeight - Variables.HeaderHeight);
    }

    dO.on('ready', function () {
        DOMObjects.Header = $('.Header', d);
        Variables.HeaderHeight = DOMObjects.Header.height();
        DOMObjects.NavButton = $('.NavButton', d);
        DOMObjects.NavButtonUnderline = $('.NavButtonUnderline', d);
        DOMObjects.MenuButtonSVG = $('#MenuButtonSVG', d)
            .on('click', function () {
                if (Flags.NavMenuOpened) {
                    t.to(DOMObjects.NavButton, 0.5, {
                        opacity: 0,
                        ease: Power4.easeOut,
                        onComplete: function () {
                            DOMObjects.NavButton.css('display', 'none');
                        }
                    });
                    t.to(DOMObjects.Header, 0.5, {
                        height: Variables.HeaderHeight,
                        clearProps: 'all',
                        ease: Power4.easeOut
                    });
                }
                else {
                    t.staggerFromTo(DOMObjects.NavButton, 0.5, {
                        display: 'block',
                        opacity: 0,
                        y: -10
                    }, {
                        opacity: 1,
                        y: 0,
                        ease: Power4.easeOut
                    }, 0.05);
                }
                Flags.NavMenuOpened = !Flags.NavMenuOpened;
            });
        DOMObjects.Body = $('.Body', d)
            .on('click', function () {
                if (Flags.NavMenuOpened) {
                    t.to(DOMObjects.NavButton, 0.5, {
                        opacity: 0,
                        ease: Power4.easeOut,
                        onComplete: function () {
                            DOMObjects.NavButton.css('display', 'none');
                        }
                    });
                    t.to(DOMObjects.Header, 0.5, {
                        height: Variables.HeaderHeight,
                        clearProps: 'all',
                        ease: Power4.easeOut
                    });
                }
                Flags.NavMenuOpened = false;
            });
        DOMObjects.HomeBox = $('.HomeBox', d);
        // jQuery Slider
        DOMObjects.ImageSlider = $('#ImageSlider', d);
        if (DOMObjects.ImageSlider.length > 0) {
            DOMObjects.ImageSlider.sldr({
                focalClass: 'focalPoint',
                offset: DOMObjects.ImageSlider.width() / 2,
                sldrWidth: 'responsive',
                selectors: DOMObjects.ImageSlider.nextAll('.Selectors:first').find('li'),
                toggle: DOMObjects.ImageSlider.nextAll('.Captions:first').find('div'),
                sldrAuto: true,
                sldrTime: 5000,
                hasChange: true
            });
        }

        OnResize();
        if (google.maps != undefined) LoadMap();

    })
        .on('mouseenter', '.NavButton', function () {
            var This = $(this),
                IsNotCurrent = This.attr('data-current') === 'false';
            t.fromTo(This.find('a:first'), 0.25, {
                color: '#E3F2FD',
                top: 0
            }, {
                color: '#FFFFFF',
                top: -3,
                ease: Power4.easeOut
            });
            if (IsNotCurrent) {
                t.fromTo(This.find('.NavButtonUnderline:first'), 0.5, {
                    width: 0,
                    marginLeft: 0,
                    opacity: 0
                }, {
                    width: 20,
                    marginLeft: -10,
                    opacity: 1,
                    ease: Power4.easeOut
                });
            }
        })
        .on('mouseleave', '.NavButton', function () {
            var This = $(this),
                IsNotCurrent = This.attr('data-current') === 'false';
            t.fromTo(This.find('a:first'), 0.25, {
                color: '#FFFFFF',
                top: -3
            }, {
                color: '#E3F2FD',
                top: 0,
                ease: Power4.easeOut
            });
            if (IsNotCurrent) {
                t.fromTo(This.find('.NavButtonUnderline:first'), 0.5, {
                    width: 20,
                    marginLeft: -10,
                    opacity: 1
                }, {
                    width: 0,
                    marginLeft: 0,
                    opacity: 0,
                    ease: Power4.easeOut
                });
            }
        })
        .on('click', '.NavButton', function () {
            var This = $(this),
                URL = This.find('a:first').attr('href');
            w.open(URL, '_self');
        })
        .on('focus', '.Input', function () {
            var This = $(this),
                Shadow = {
                    blur: 0,
                    opacity: 0
                };
            t.to(Shadow, 0.5, {
                blur: 10,
                opacity: 0.67,
                onUpdate: function () {
                    This.css({
                        '-webkit-box-shadow': '0 0 ' + Shadow.blur + 'px rgba(0, 0, 0, ' + Shadow.opacity + ')',
                        '-moz-box-shadow': '0 0 ' + Shadow.blur + 'px rgba(0, 0, 0, ' + Shadow.opacity + ')',
                        'box-shadow': '0 0 ' + Shadow.blur + 'px rgba(0, 0, 0, ' + Shadow.opacity + ')'
                    });
                },
                ease: Power4.easeOut
            });
        })
        .on('blur', '.Input', function () {
            var This = $(this),
                Shadow = {
                    blur: 10,
                    opacity: 0.67
                };
            t.to(Shadow, 0.5, {
                blur: 0,
                opacity: 0,
                onUpdate: function () {
                    This.css({
                        '-webkit-box-shadow': '0 0 ' + Shadow.blur + 'px rgba(0, 0, 0, ' + Shadow.opacity + ')',
                        '-moz-box-shadow': '0 0 ' + Shadow.blur + 'px rgba(0, 0, 0, ' + Shadow.opacity + ')',
                        'box-shadow': '0 0 ' + Shadow.blur + 'px rgba(0, 0, 0, ' + Shadow.opacity + ')'
                    });
                },
                ease: Power4.easeOut
            });
        })
        .on('mouseenter', '.Input[type=button]', function () {
            var This = $(this);
            t.fromTo(This, 0.5, {
                backgroundColor: '#0D47A1'
            }, {
                backgroundColor: '#1565C0',
                ease: Power4.easeOut
            });
        })
        .on('mouseleave', '.Input[type=button]', function () {
            var This = $(this);
            t.fromTo(This, 0.5, {
                backgroundColor: '#1565C0'
            }, {
                backgroundColor: '#0D47A1',
                ease: Power4.easeOut
            });
        })
        .on('mouseenter', '.HomeBox', function () {
            var This = $(this),
                Shadow = {
                    blur: 0,
                    opacity: 0
                },
                HomeBoxIcon = This.find('.HomeBoxIcon');
            t.to(This.find('.HomeBoxWrapper'), 1, {
                scale: 1.15,
                transformOrigin: '50% 50% 0',
                ease: ElasticEaseOut
            });
            t.to(Shadow, 1, {
                blur: 20,
                opacity: 0.35,
                onUpdate: function () {
                    HomeBoxIcon.css({
                        '-webkit-box-shadow': '0 0 ' + Shadow.blur + 'px rgba(0, 0, 0, ' + Shadow.opacity + ')',
                        '-moz-box-shadow': '0 0 ' + Shadow.blur + 'px rgba(0, 0, 0, ' + Shadow.opacity + ')',
                        'box-shadow': '0 0 ' + Shadow.blur + 'px rgba(0, 0, 0, ' + Shadow.opacity + ')'
                    });
                },
                ease: Power4.easeOut
            });
            t.to(This.find('h1'), 0.5, {
                color: HomeBoxIcon.css('background-color')
            });
            t.fromTo(This.find('span'), 1, {
                opacity: 0,
                scale: 0.7,
                transformOrigin: '50% 50% 0'
            }, {
                opacity: 1,
                scale: 1,
                transformOrigin: '50% 50% 0',
                ease: ElasticEaseOut
            });
            t.fromTo(This.find('svg'), 1, {
                opacity: 1,
                scale: 1,
                transformOrigin: '50% 50% 0'
            }, {
                opacity: 0,
                scale: 0.7,
                transformOrigin: '50% 50% 0',
                ease: ElasticEaseOut
            });
        })
        .on('mouseleave', '.HomeBox', function () {
            var This = $(this),
                Shadow = {
                    blur: 20,
                    opacity: 0.35
                };
            t.to(This.find('.HomeBoxWrapper'), 1, {
                scale: 1,
                transformOrigin: '50% 50% 0',
                ease: ElasticEaseOut
            });
            t.to(Shadow, 1, {
                blur: 0,
                opacity: 0,
                onUpdate: function () {
                    This.find('.HomeBoxIcon').css({
                        '-webkit-box-shadow': '0 0 ' + Shadow.blur + 'px rgba(0, 0, 0, ' + Shadow.opacity + ')',
                        '-moz-box-shadow': '0 0 ' + Shadow.blur + 'px rgba(0, 0, 0, ' + Shadow.opacity + ')',
                        'box-shadow': '0 0 ' + Shadow.blur + 'px rgba(0, 0, 0, ' + Shadow.opacity + ')'
                    });
                },
                ease: Power4.easeOut
            });
            t.to(This.find('h1'), 0.5, {
                color: '#444444'
            });
            t.fromTo(This.find('span'), 1, {
                opacity: 1,
                scale: 1,
                transformOrigin: '50% 50% 0'
            }, {
                opacity: 0,
                scale: 1.3,
                transformOrigin: '50% 50% 0',
                ease: ElasticEaseOut
            });
            t.fromTo(This.find('svg'), 1, {
                opacity: 0,
                scale: 0.7,
                transformOrigin: '50% 50% 0'
            }, {
                opacity: 1,
                scale: 1,
                transformOrigin: '50% 50% 0',
                ease: ElasticEaseOut
            });
        });
    wO.on('resize', OnResize);
})(window, jQuery(window), document, jQuery(document), jQuery, TweenMax);