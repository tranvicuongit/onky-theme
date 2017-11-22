///////////////////// Script ////////////////////

var onkyApp = {
  openCart: function () {

  },
  Slide: {
    next: function () {

    }
  }
}


/////////////////////////////////////////////////


var app = angular.module('OnkyApp', ['ngRoute'])
  .config(['$routeProvider', '$locationProvider',
    function ($routeProvider, $locationProvider) {
      $routeProvider
        .when('/', {
          templateUrl: 'app/pages/home.html',
          controller: 'HomeCtrl',
          controllerAs: 'home'
        })
        .when('/Book/:bookId/ch/:chapterId', {
          templateUrl: 'chapter.html',
          controller: 'ChapterCtrl',
          controllerAs: 'chapter'
        });

      $locationProvider.html5Mode(true);
    }])
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
          afterMove: nextslide,
          afterInit: nextslide
        });
        function nextslide() {
          $(".hrv-banner-container .owl-item .hrv-banner-caption").css('display', 'none');
          $(".hrv-banner-container .owl-item .hrv-banner-caption").removeClass('hrv-caption')
          $(".hrv-banner-container .owl-item.active .hrv-banner-caption").css('display', 'block');

          var heading = $('.hrv-banner-container .owl-item.active .hrv-banner-caption').clone().removeClass();
          $('.hrv-banner-container .owl-item.active .hrv-banner-caption').remove();
          $('.hrv-banner-container .owl-item.active>li').append(heading);
          $('.hrv-banner-container .owl-item.active>li>div').addClass('hrv-banner-caption hrv-caption');
        }
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
  });

app.controller('HomeCtrl', function PhoneListController($scope) {

});