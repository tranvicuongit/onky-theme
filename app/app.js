///////////////////// Script ////////////////////

var onkyApp = {
  cart: {
    openPreview: function () {
      // cart content
      $(".cartpreview").removeClass("cartpreview--closed").addClass("cartpreview--opended");
      $(".cartpreview__backdrop").removeClass("fadeOut").addClass("fadeIn");
      $(".cartpreview__inner").removeClass("fadeOutRight").addClass("fadeInRight");

      $(".cartpreview__close").removeClass("fadeOutLeft fadeOutRightBig");
      if ($("html").hasClass("mobile") || $("html").hasClass("tablet")) {
        $(".cartpreview__close").addClass("fadeInLeft");
      } else {
        $(".cartpreview__close").addClass("fadeInRightBig");
      }
    },
    closePreview: function () {
      $(".cartpreview__inner").removeClass("fadeInRight").addClass("fadeOutRight");
      $(".cartpreview__backdrop").removeClass("fadeIn").addClass("fadeOut");

      if ($("html").hasClass("mobile") || $("html").hasClass("tablet")) {
        $(".cartpreview__close").removeClass("fadeInLeft").addClass("fadeOutLeft");
      } else {
        $(".cartpreview__close").removeClass("fadeInRightBig").addClass("fadeOutRightBig");
      }

      setTimeout(function () {
        $(".cartpreview").addClass("cartpreview--closed").removeClass("cartpreview--opended");
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
  },
  header_mobile: {
    open: function () {
      $(".header__mobile--backdrop").css("animation-duration", "0.46s");
      $(".header__mobile--backdrop").removeClass("fadeOut").addClass("fadeIn");
      $(".header__mobile").removeClass("header__mobile--closed").addClass("header__mobile--opened");
    },
    close: function () {
      $(".header__mobile--backdrop").css("animation-duration", "0.5s");
      $(".header__mobile--backdrop").removeClass("fadeIn").addClass("fadeOut");
      $(".header__mobile").addClass("header__mobile--closed");

      setTimeout(function () {
        $(".header__mobile").removeClass("header__mobile--opened");
      }, 360);
    }
  },
  responsive: {
    productButton: function () {
      var sW = $(window).width(); // screen width
      var pW = $(".products__list").width(); // productlist width
      var haft = Math.floor((sW - pW) / 2) - 50;
      var __val = haft + "px";
      $(".products__button--prev").css("left", __val);
      $(".products__button--next").css("right", __val);
    }
  },
  products: {
    changePage: function (__type, target) {
      var __list = $(target).parent().parent().find(".products__list");
      var totalItem = parseInt($(__list).find(".product_item").length);
      var currentPage = $(__list).data("currentpage") == undefined ? 1 : parseInt($(__list).data("currentpage"));
      var pageSize = $(__list).data("pagesize") == undefined ? 1 : parseInt($(__list).data("pagesize"));
      var totalPage = Math.round(totalItem / pageSize);

      if (__type == 'default') {
        onkyApp.products.animate(0, pageSize, __list);
      } else {        
        // Get type of button and renumber currentPage
        switch (__type) {
          case "prev":
            currentPage = currentPage > 1 ? currentPage - 1 : 1;
            break;
          case "next":
            currentPage = currentPage < totalPage - 1 ? currentPage + 1 : totalPage;
            break;
          default:
            break;
        }
        if (currentPage == $(__list).data("currentpage"))
          return;
        $(__list).data("currentpage", currentPage);

        // Get number index of product item to SHOW
        var __from = (currentPage - 1) * pageSize;
        var __to = currentPage * pageSize > totalItem ? totalItem : (currentPage * pageSize);

        if (currentPage == 1) {
          $(__list).parent().find(".products__button--prev").addClass("disabled");
        } else {
          $(__list).parent().find(".products__button--prev").removeClass("disabled");
        }
        if (currentPage == totalPage) {
          $(__list).parent().find(".products__button--next").addClass("disabled");
        } else {
          $(__list).parent().find(".products__button--next").removeClass("disabled");
        }

        $(__list).find(".product_item").addClass("hidden");
        onkyApp.products.animate(__from, __to, __list); // animation
      }
    },
    animate: function (from, to, __list) {
      var listItem = $(__list).find(".product_item");

      if (to - from <= 4) {
        $(__list).parent().find(".products__button").css("margin-top", "-10%");
      } else {
        $(__list).parent().find(".products__button").css("margin-top", "-20%");
      }

      for (var i = from; i < to; i++) {
        onkyApp.products.removeHidden(listItem[i], i - from);
      }

    },
    removeHidden: function (item, i) {
      setTimeout(function () {
        $(item).removeClass("hidden");
      }, 200 * i);
    }
  }
};

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
        .when('/detail-products', {
          templateUrl: 'app/pages/detail-product.html',
          controller: 'ProductCtrl',
          controllerAs: 'pro'
        })
        .when('/contact', {
          templateUrl: 'app/pages/contact.html',
          controller: 'ContactCtrl',
          controllerAs: 'contact'
        })
        .otherwise({
          redirectTo: '/'
        });

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

        if ($(this).find(".header__menu_item--submenu").length > 0) {
          $(".header__menu--backdrop").css("animation", "");
          $(".header__menu--backdrop").css("display", "block");
          $(".header").css("position", "fixed").css("width", "100%");
        }
      }).mouseleave(function () {
        $(this).find(".header__menu_item--submenu").css("display", "none");

        $(".header__menu--backdrop").css("animation", "backdrop-menu-out 0.4s ease-in both");
        $(".header__menu--backdrop").css("display", "none");
      });

      // $(".products__list--item").mouseenter(function () {
      //   $(this).find(".products__list--item_actions").css("opacity", "1");
      // }).mouseleave(function () {
      //   $(this).find(".products__list--item_actions").css("opacity", "0");
      // });


      $("html, body").click(function (e) {
        if ($(e.target).hasClass('cartpreview') && !$('.cartpreview').hasClass("cartpreview--opended") && !$(e.target).hasClass("cartpreview__backdrop") &&
          $(e.target).hasClass('header__mobile_inner') && !$('.header__mobile').hasClass("header__mobile--opended") && !$(e.target).hasClass("header__mobile--backdrop")) {
          return false;
        } else {
          if ($('.cartpreview').hasClass("cartpreview--opended") && $(e.target).hasClass("cartpreview__backdrop"))
            onkyApp.cart.closePreview();


          if ($('.header__mobile').hasClass("header__mobile--opened") && $(e.target).hasClass("header__mobile--backdrop"))
            onkyApp.header_mobile.close();
        }
      });

      $(".header").sticky({});
      $('.quickview-slider .owl-carousel').owlCarousel({
        items: 3,
        navigation: true,
        navigationText: ['', '']
      });

      $(function () {
        $('#tab-detailpro a:first').tab('show');
        $('#tab-detailpro a').click(function (e) {
          e.preventDefault()
          $(this).tab('show')
        })
      });
      $('input.rating[type=number]').each(function () {
        $(this).rating();
      });

      $('.quickview-slider .owl-carousel .owl-item').first().children('.product-thumb').addClass('active');

      $(".header__mobile--menu_item").click(function () {
        var $this = $(this);
        var $submenu = $this.find(".header__mobile--menu_item_submenu");
        // Deactive element
        $(".header__mobile--menu_item").removeClass("header__mobile--menu_item-active");

        // Deactive icon plus
        $(".header__mobile--menu_item-icon").text("+");


        if (!$submenu.hasClass("header__mobile--menu_item_submenu-opened")) {
          $this.addClass("header__mobile--menu_item-active");
          $(".header__mobile--menu_item_submenu").removeClass("header__mobile--menu_item_submenu-opened");

          $submenu.addClass("header__mobile--menu_item_submenu-opened");
          $this.find(".header__mobile--menu_item-icon").text("-");
        } else {
          $submenu.removeClass("header__mobile--menu_item_submenu-opened");
          //
        }
      });


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

app.filter('range', function () {
  return function (input, total) {
    total = parseInt(total);

    for (var i = 0; i < total; i++) {
      input.push(i);
    }

    return input;
  };
});

app.controller('HomeCtrl', function HomeController($scope) {
    setTimeout(function () {
      if ($('.homeslide li').size() > 0) {
        $(".homeslide").owlCarousel({
          singleItem: true,
          autoPlay: false,
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
          navigation: true,
          stopOnHover: true,
          pagination: true,
          scrollPerPage: true,
          navigationText: ['', ''],
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

      // responsive next and prev button in product-list      
      onkyApp.responsive.productButton(); // first time
      $(window).resize(function () { // on resize
        onkyApp.responsive.productButton();
      });
      $(".products__button--prev").click(function () {
        var $this = $(this);
        onkyApp.products.changePage("prev", $this);
      });
      $(".products__button--next").click(function () {
        var $this = $(this);
        onkyApp.products.changePage("next", $this);
      });
      $(".products__list").each(function(){
        onkyApp.products.changePage("default", this);
      });
    }, 300);

  })
  .controller('CartCtrl', function CartController($scope) {})
  .controller('NewsCtrl', function NewsController($scope) {})
  .controller('PaymentCtrl', function PaymentController($scope) {})
  .controller('ContactCtrl', function ContactController($scope) {})
  .controller('ProductCtrl', function ContactController($scope) {
    setTimeout(function () {
      $("#sliderproduct .slides").owlCarousel({
        items: 3,
        navigation: true,
        navigationText: ['', ''],
        itemsDesktop: [1199, 4],
        itemsDesktopSmall: [980, 5],
        itemsTablet: [768, 5],
        itemsMobile: [479, 4]
      });
    }, 300);
  });