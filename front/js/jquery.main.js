jQuery(function() {
    initSlick();
    initTimeTo();
    initjQueryUI();
    initCustomScrollbar();
    initListJS();
    initCustomForms();
    initMobileNav();
    initFilter();
    initViewSwitcher();
    initMagnificPopup();
    initSmoothAnchors();
    initValidation();
    initCounterUp();
    initDataTables();
    initShowMobileFilters();
});

// init for mobile filter opener
function initShowMobileFilters() {
    var opener = jQuery('.widget-filter .filter-opener');
        trackedBox = jQuery('.twocolumns .aside'),
        offset = trackedBox.outerHeight() + trackedBox.offset().top,
        win = jQuery(window),
        parent = jQuery('body'),
        activeClass = 'show-filter-button';

    if (!opener.length)
        return false;
    
    win.on({
        scroll: function() {
            if (win.scrollTop() >= offset) {
                parent.addClass(activeClass)
            } else {
                parent.removeClass(activeClass)
            }
        },
        resize: function() {
            offset = trackedBox.offset().top
        }
    });
}

function initDataTables() {
    var holder = $('.open-close-table'),
        opener = holder.find('.opener'),
        slide = holder.find('.slide'),
        activeClass = 'active';

    slide.slideUp();

    opener.click(function(){
        var row = $(this).closest('tr');

        if (row.hasClass(activeClass)) {
            row.removeClass(activeClass)

            row.next().find('.slide').slideUp();
        } else {
            row.addClass(activeClass)
            row.next().find('.slide').slideDown();
        }
    });

    // $('#table-order-data').DataTable();
}

// init countUp plugin
var easingFn = function(t, b, c, d) {
    var ts = (t /= d) * t;
    var tc = ts * t;
    return b + c * (tc + -3 * ts + 3 * t);
}
var countOptions = {  
    useEasing: true,
    easingFn: easingFn,
    separator: ' ',
    decimal: '.',
    prefix: '',
    suffix: ''
};

function initCounterUp() {
    $('.counter').each(function(index, el) {
        var _this = $(this),
            _number = parseInt(_this.data('number'));
        // _this.closest('.item').addClass('start');
        var demo = new CountUp(this, 0, _number, 0, 2, countOptions);
        demo.start();
    });
}

// init form validation
function initValidation() {
    $(".form-subscribe").validate();
}

// init smooth anchor links
function initSmoothAnchors() {
    $('.smooth-anchor').on('click', 'a[href^="#"]', function (event) {
        event.preventDefault();

        $('html, body').animate({
            scrollTop: $($.attr(this, 'href')).offset().top
        }, 500);
    });
}
// init magnific popup
function initMagnificPopup() {
    $('.product-slider .slider-for').magnificPopup({
        delegate: 'a',
        type: 'image',
        gallery: {
            enabled: true
        }
    });

    $('.post-preview.video a:not([href^="#"])').magnificPopup({
        type: 'iframe',
        titleSrc: 'title'
    });
}

// switch view for products
function initViewSwitcher() {
    var switcherList = $('.categories-view-box .view'),
        listHolder = $('.categories-view-box ~ .grid'),
        activeClass = 'active',
        switchClass = 'list-view';

    switcherList.find('a').on('click', function(e) {
        e.preventDefault();

        var current = $(this);

        switcherList.find('li').removeClass(activeClass)
        current.parent().addClass(activeClass)

        if (current.is('[class*="list"]')) {
            listHolder.removeClass('grid-view').addClass('list-view');
        } else if (current.is('[class*="grid"]')) {
            listHolder.removeClass('list-view').addClass('grid-view');
        }
    });
};

function initFilter() {
    if ("slider" in $.fn) {
        var e = $("#slider-range"),
            t = $(".min"),
            i = $(".max"),
            n = parseInt(e.closest(".input-range-box").find(".min").val()),
            a = parseInt(e.closest(".input-range-box").find(".max").val());
        $("#slider-range").slider({ range: !0, min: n, max: a, values: [n, a], slide: function(e, n) { t.val(n.values[0]), i.val(n.values[1]) }, change: function(e, n) { t.val(n.values[0]), i.val(n.values[1]) } }), t.val(n), i.val(a), t.change(function() {
            var n = t.val(),
                a = i.val();
            n = Math.min(n, a), t.val(n), e.slider("values", 0, n)
        }), i.change(function() {
            var n = t.val(),
                a = i.val();
            a = Math.max(n, a), i.val(a), e.slider("values", 1, a)
        })
    }
    jQuery.expr[":"].Contains = function(e, t, i) { return (e.textContent || e.innerText || "").toUpperCase().indexOf(i[3].toUpperCase()) >= 0 }, $(".filter-input").change(function() {
        var e = $(this).next(),
            t = $(this).val();
        return t ? ($(e).find("label:not(:Contains(" + t + "))").hide(), $(e).find("label:Contains(" + t + ")").show(), initSly()) : ($(e).find("label").show(), initSly()), !1
    }).keyup(function() { $(this).change() }), $(".mobile-filter").click(function(e) { e.preventDefault(), $("body").toggleClass("options") }), $(document).on("click touchstart", function(e) { $(e.target).closest(".mobile-filter").length || $(e.target).closest(".filter").length || ($("body").removeClass("options"), e.stopPropagation()) })
}

function initMobileNav() {
    $('#main-nav').hcOffcanvasNav({
        maxWidth: 768,
        insertClose: true,
        insertBack: true,
        labelClose: 'Close',
        labelBack: 'Back',
        customToggle: '.nav-opener',
        disableBody: true
    });

    jQuery('body').mobileNav({
        menuActiveClass: 'filter-active',
        menuOpener: '.filter-opener',
        hideOnClickOutside: true,
        menuDrop: '.form-items-filter'
    });
}

// init List.js
function initListJS() {
    var options = {
        valueNames: [ 'label-checkbox' ]
    };

    var filterList = new List('filter', options);
}

// init custom scrollbar plugin
function initCustomScrollbar() {
    var customScrollHolder = $('.custom-scroll');

    ResponsiveHelper.addRange({
        '1024..': {
            on: function() {
                customScrollHolder.mCustomScrollbar();
            },
            off: function() {
                customScrollHolder.mCustomScrollbar("destroy");
            }
        }
    });
}

// init all plugins from jQueryUI
function initjQueryUI() {
    var dateFormat = "mm/dd/yy",
    from = $( ".table-order-data #from" )
        .datepicker({
            defaultDate: "+1w",
            changeMonth: true,
            numberOfMonths: 1
        })
        .on( "change", function() {
            to.datepicker( "option", "minDate", getDate( this ) );
        }),
        to = $( ".table-order-data #to" ).datepicker({
            defaultDate: "+1w",
            changeMonth: true,
            numberOfMonths: 2
        })
        .on( "change", function() {
            from.datepicker( "option", "maxDate", getDate( this ) );
        });

    function getDate( element ) {
        var date;
        try {
            date = $.datepicker.parseDate( dateFormat, element.value );
        } catch( error ) {
            date = null;
        }
        return date;
    }

    var availableCategories = [
        "category_01",
        "category_02",
        "category_03",
        "category_04",
        "category_05",
        "category_06",
        "category_07",
        "category_08",
        "category_09",
        "category_10",
        "category_11",
        "category_12",
        "category_13",
        "category_14",
        "category_15",
        "category_16",
        "category_17",
        "category_18",
        "category_19",
        "category_20",
        "category_21",
        "category_22",
        "category_23",
        "category_24",
        "category_25",
        "category_26",
        "category_27"
    ];

    $( "#categories").autocomplete({
        source: availableCategories
    });

    $( ".open-close").each(function(){
        var $this = jQuery(this),
            opener = $this.find('.opener'),
            activeClass = "active";

        opener.on('click', function(e){
            e.preventDefault();

            opener.parent().toggleClass(activeClass);
        });
    });

    $( "#slider-range" ).slider({
        range: true,
        min: 120,
        max: 8980,
        values: [ 120, 8980 ],
        slide: function( event, ui ) {
            $("#start").val($("#slider-range").slider("values", 0));
            $("#end").val($("#slider-range").slider("values", 1));
        }
    });

    $("#start").val($("#slider-range").slider("values", 0));
    $("#end").val($("#slider-range").slider("values", 1));

    $('.tabs-holder').tabs({
        // active: 2
        // hide: { effect: "explode", duration: 1000 },
        // show: { effect: "blind", duration: 800 }
    });

    var $tabs = $('.tabs-holder').tabs();

    $('a#tab1').click(function() { // bind click event to link
        $tabs.tabs({
            active: 0
        }); // switch to 1st tab
        $('html, body').animate(
            {scrollTop: $('.tabs-holder').offset().top},
            1000,
            'swing'
        );
        return false;
    });
    $('a#tab2').click(function() { // bind click event to link
        $tabs.tabs({
            active: 1
        }); // switch to 1st tab
        $('html, body').animate(
            {scrollTop: $('.tabs-holder').offset().top},
            1000,
            'swing'
        );
        return false;
    });
    $('a#tab3').click(function() { // bind click event to link
        $tabs.tabs({
            active: 2
        }); // switch to 1st tab
        $('html, body').animate(
            {scrollTop: $('.tabs-holder').offset().top},
            1000,
            'swing'
        );
        return false;
    });
    $('a#tab31').click(function() { // bind click event to link
        $tabs.tabs({
            active: 2
        }); // switch to 1st tab
        $('html, body').animate(
            {scrollTop: $('.tabs-holder').offset().top},
            1000,
            'swing'
        );
        return false;
    });

    $(document).tooltip({
        position: {
            my: "left bottom",
            at: "center top",
        }
    });

    $( "#accordion" ).accordion({
        header: ".opener",
        active: false,
        collapsible: true
    });
}

// initialize custom form elements
function initCustomForms() {
    jcf.setOptions('Select', {
        wrapNative: false
    });
    jcf.replaceAll();
}

// countdown plugin initTimeTo();
function initTimeTo() {
    var $this = jQuery()

    $('.countdown').each(function(){
        var $this = jQuery(this);

        $this.timeTo({
            timeTo: new Date(new Date('Sun Jun 27 2019 09:00:00 GMT+0300 (Восточная Европа, летнее время)')),
            displayCaptions: true,
            fontSize: 18,
            captionSize: 8
        });
    });
}

// slick initialization
function initSlick() {
    $('.slick-slider').slick({
        slidesToShow: 5,
        slidesToScroll: 1,
        infinite: false,
        dots: true,
        // adaptiveHeight: true,
        arrows: false,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            }
        ]
    });
    $('.slick-logos').slick({
        slidesToShow: 8,
        slidesToScroll: 1,
        // infinite: false,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 2000,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 6,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 2,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            }
        ]
    });
    $('.product-slider .slider-for').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        asNavFor: '.slider-nav'
    });
    $('.product-slider .slider-nav').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        asNavFor: '.slider-for',
        dots: true,
        // centerMode: true,
        focusOnSelect: true,
        variableWidth: true
    });
    $('.slick-images').slick({
        arrows: false,
        dots:true,
        infinite: false
    });
    ResponsiveHelper.addRange({
        '..1024': {
            on: function() {
                $('.subcategory-slider').slick({
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: false,
                    dots: true,
                    // adaptiveHeight: true,
                    arrows: false,
                    responsive: [
                        {
                            breakpoint: 992,
                            settings: {
                                slidesToShow: 2,
                                slidesToScroll: 2,
                            }
                        },
                        {
                            breakpoint: 480,
                            settings: {
                                slidesToShow: 1,
                                slidesToScroll: 1,
                            }
                        }
                    ]
                });
            },
            off: function() {
                $('.subcategory-slider').slick("destroy");
            }
        }
    });
}