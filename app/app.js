///////////////////// Script ////////////////////

var onkyApp = {
  cart: {
    openPreview: function () {
      // cart content
      $(".cartpreview").removeClass("cartpreview--closed");
      $(".cartpreview").addClass("cartpreview--opended");

      //cart backgrop      
      $(".cartpreview__backdrop").removeClass("fadeOut");
      $(".cartpreview__backdrop").addClass("fadeIn");

      $(".cartpreview__inner").removeClass("fadeOutRight");
      $(".cartpreview__inner").addClass("fadeInRight");
    },
    closePreview: function () {
      $(".cartpreview__inner").removeClass("fadeInRight");
      $(".cartpreview__inner").addClass("fadeOutRight");


      //cart backgrop      
      $(".cartpreview__backdrop").removeClass("fadeIn");
      $(".cartpreview__backdrop").addClass("fadeOut");

      setTimeout(function () {
        $(".cartpreview").addClass("cartpreview--closed");
        $(".cartpreview").removeClass("cartpreview--opended");
      }, 500);
    }
  },
  homeSlide: {
    next: function () {
      $(".homeslide .owl-item .homeslide__caption--inner_header2").css("display", "none");
      $(".homeslide .owl-item .homeslide__caption--inner_header2").css("display", "none");
      $(".homeslide .owl-item .homeslide__caption--inner_button").css("display", "none");

      $(".homeslide .owl-item.active .homeslide__caption--inner_header2").css("display", "block");
      $(".homeslide .owl-item.active .homeslide__caption--inner_header2").css("display", "block");
      $(".homeslide .owl-item.active .homeslide__caption--inner_button").css("display", "block");
    }
  }
}

var app = angular.module('OnkyApp', ['ngRoute'])
  .config(['$routeProvider', '$locationProvider',
    function ($routeProvider, $locationProvider) {
      $routeProvider
        .when('/', {
          templateUrl: 'app/pages/home.html',
          controller: 'HomeCtrl',
          controllerAs: 'home'
        })
        .when('/cart', {
          templateUrl: 'app/pages/cart.html',
          controller: 'CartCtrl',
          controllerAs: 'cart'
        })
        .when('/payment', {
          templateUrl: 'app/pages/payment.html',
          controller: 'PaymentCtrl',
          controllerAs: 'pay'
        })
        .when('/payment/done', {
          templateUrl: 'app/pages/payment-done.html',
          controller: 'PaymentCtrl',
          controllerAs: 'pay'
        })
        .when('/news/detail-news', {
          templateUrl: 'app/pages/detail-news.html',
          controller: 'NewsCtrl',
          controllerAs: 'news'
        })
        .when('/contact', {
          templateUrl: 'app/pages/contact.html',
          controller: 'ContactCtrl',
          controllerAs: 'contact'
        })
        .otherwise({redirectTo: '/'});

      $locationProvider.html5Mode(true);
    }
  ])
  .run(function ($rootScope) {

    // Create menu list
    $rootScope.Menu = [];
    var menu1 = {
      Title: "Trang điểm",
      Link: "trang-diem",
      List: []
    };
    for (var i = 1; i < 5; i++) {
      menu1.List.push({
        Title: "Trang điểm" + i,
        Link: "trang-diem" + i
      });
    }
    var menu2 = {
      Title: "Chăm sóc da",
      Link: "Chăm sóc da",
      List: []
    };
    for (var i = 1; i < 5; i++) {
      menu2.List.push({
        Title: "Chăm sóc da" + i,
        Link: "Chăm sóc da" + i
      });
    }

    $rootScope.Menu.push(menu1);
    $rootScope.Menu.push(menu2);

    for (var i = 1; i < 6; i++) {
      var menu3 = {
        Title: "Link 00" + i,
        Link: "link-000-0" + i,
        List: []
      };
      for (var j = 1; j < 5; j++) {
        menu3.List.push({
          Title: "Link 00" + j,
          Link: "link-000-0" + j
        });
      }
      $rootScope.Menu.push(menu3);
    }

    setTimeout(function () {
      $(".header__menu_item").mouseenter(function () {
        $(this).find(".header__menu_item--submenu").css("display", "block");
      }).mouseleave(function () {
        $(this).find(".header__menu_item--submenu").css("display", "none");
      });

      $(".products__list--item").mouseenter(function () {
        $(this).find(".products__list--item_actions").css("opacity", "1");
      }).mouseleave(function () {
        $(this).find(".products__list--item_actions").css("opacity", "0");
      });


      $("html, body").click(function (e) {
        if ($(e.target).hasClass('cartpreview') && !$('.cartpreview').hasClass("cartpreview--opended") && !$(e.target).hasClass("cartpreview__backdrop")) {
          return false;
        } else {
          if ($('.cartpreview').hasClass("cartpreview--opended") && $(e.target).hasClass("cartpreview__backdrop"))
            onkyApp.cart.closePreview();
        }
      });

      if ($('.homeslide li').size() > 0) {
        $(".homeslide").owlCarousel({
          singleItem: true,
          autoPlay: 5000,
          items: 1,
          itemsDesktop: [1199, 1],
          itemsDesktopSmall: [980, 1],
          itemsTablet: [768, 1],
          itemsMobile: [479, 1],
          slideSpeed: 500,
          paginationSpeed: 500,
          rewindSpeed: 500,
          addClassActive: true,
          navigation: true,
          stopOnHover: true,
          pagination: false,
          scrollPerPage: true,
          afterMove: onkyApp.homeSlide.next(),
          afterInit: onkyApp.homeSlide.next()
        });
      }

      if ($(".tips__slide li").size() > 0) {
        $(".tips__slide").owlCarousel({
          singleItem: false,
          autoPlay: 5000,
          items: 4,
          itemsDesktop: [1199, 4],
          itemsDesktopSmall: [980, 4],
          itemsTablet: [768, 3],
          itemsMobile: [479, 2],
          slideSpeed: 500,
          paginationSpeed: 500,
          rewindSpeed: 500,
          addClassActive: true,
          navigation: false,
          stopOnHover: false,
          pagination: true,
          scrollPerPage: true,
          // afterMove: nextslide,
          // afterInit: nextslide
        });
      }

      if ($(".dealers__slide li").size() > 0) {
        $(".dealers__slide").owlCarousel({
          singleItem: true,
          autoPlay: 5000,
          items: 4,
          itemsDesktop: [1199, 4],
          itemsDesktopSmall: [980, 4],
          itemsTablet: [768, 3],
          itemsMobile: [479, 2],
          slideSpeed: 500,
          paginationSpeed: 500,
          rewindSpeed: 500,
          addClassActive: true,
          navigation: false,
          stopOnHover: false,
          pagination: true,
          scrollPerPage: true,
          // afterMove: nextslide,
          // afterInit: nextslide
        });
      }
        $(".header").sticky({  });
    }, 2000);
    //////////////////////////////

    // Create product list
    $rootScope.Products = [];

    for (var i = 1; i <= 12; i++) {
      $rootScope.Products.push({
        Title: "Product 000" + i,
        Price: i + "0,000,000",
        Link: "san-pham-000" + i,
        Compare: i + "0,000"
      });
    }



    // $("html, body").click(function (e) {
    //   if ($(e.target).hasClass('cartpreview') && !$(e.target).hasClass("cartpreview__close") && !$('.cartpreview').hasClass("cartpreview--opended")) {
    //     return false;
    //   }
    //   //onkyApp.cart.closePreview();
    // });​

  });

  app.filter('range', function() {
    return function(input, total) {
      total = parseInt(total);
  
      for (var i=0; i<total; i++) {
        input.push(i);
      }
  
      return input;
    };
  });

app.controller('HomeCtrl', function HomeController($scope) {})
.controller('CartCtrl', function CartController($scope) {})
.controller('NewsCtrl', function NewsController($scope) {})
.controller('PaymentCtrl', function PaymentController($scope) {})
.controller('ContactCtrl', function ContactController($scope) {
});



///////////////////  Sticky /////////////////////
(function($) {
  var defaults = {
          topSpacing: 0,
          bottomSpacing: 0,
          className: 'is-sticky',
          wrapperClassName: 'sticky-wrapper'
      },
      $window = $(window),
      $document = $(document),
      sticked = [],
      windowHeight = $window.height(),
      scroller = function() {
          var scrollTop = $window.scrollTop(),
              documentHeight = $document.height(),
              dwh = documentHeight - windowHeight,
              extra = (scrollTop > dwh) ? dwh - scrollTop : 0;
          for (var i = 0; i < sticked.length; i++) {
              var s = sticked[i],
                  elementTop = s.stickyWrapper.offset().top,
                  etse = elementTop - s.topSpacing - extra;
              if (scrollTop <= etse) {
                  if (s.currentTop !== null) {
                      s.stickyElement
                          .css('position', '')
                          .css('top', '')
                          .removeClass(s.className);
                      s.stickyElement.parent().removeClass(s.className);
                      s.currentTop = null;
                  }
              }
              else {
                  var newTop = documentHeight - s.stickyElement.outerHeight()
                      - s.topSpacing - s.bottomSpacing - scrollTop - extra;
                  if (newTop < 0) {
                      newTop = newTop + s.topSpacing;
                  } else {
                      newTop = s.topSpacing;
                  }
                  if (s.currentTop != newTop) {
                      s.stickyElement
                          .css('position', 'fixed')
                          .css('top', newTop)
                          .addClass(s.className);
                      s.stickyElement.parent().addClass(s.className);
                      s.currentTop = newTop;
                  }
              }
          }
      },
      resizer = function() {
          windowHeight = $window.height();
      },
      methods = {
          init: function(options) {
              var o = $.extend(defaults, options);
              return this.each(function() {
                  var stickyElement = $(this);

                  stickyId = stickyElement.attr('id');
                  var wrapper = $("<div></div>")
                      .attr('id', stickyId + '-sticky-wrapper')
                      .addClass(o.wrapperClassName);
                  stickyElement.wrapAll(wrapper);
                  var stickyWrapper = stickyElement.parent();
                  stickyWrapper.css('height', stickyElement.outerHeight());
                  sticked.push({
                      topSpacing: o.topSpacing,
                      bottomSpacing: o.bottomSpacing,
                      stickyElement: stickyElement,
                      currentTop: null,
                      stickyWrapper: stickyWrapper,
                      className: o.className
                  });
              });
          },
          update: scroller
      };

  // should be more efficient than using $window.scroll(scroller) and $window.resize(resizer):
  if (window.addEventListener) {
      window.addEventListener('scroll', scroller, false);
      window.addEventListener('resize', resizer, false);
  } else if (window.attachEvent) {
      window.attachEvent('onscroll', scroller);
      window.attachEvent('onresize', resizer);
  }

  $.fn.sticky = function(method) {
      if (methods[method]) {
          return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
      } else if (typeof method === 'object' || !method ) {
          return methods.init.apply( this, arguments );
      } else {
          $.error('Method ' + method + ' does not exist on jQuery.sticky');
      }
  };
  $(function() {
      setTimeout(scroller, 0);
  });
})(jQuery);
/////////////////////////////////////////////////