/* exported ebNoResultsExtendCallback */
/* global document */

var ebNoResultsExtendCallback = function(controller) {
  'use strict';

  var $injector = angular.element(document.querySelector('#eb-overlay')).injector();
  var ebSearch = $injector.get('ebSearch');

  controller.breakpoints = [
    {
      breakpoint: 1280,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 4
      }
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3
      }
    }, {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2
      }
    }
  ];

  controller.getTopClicked = function() {
    var topClicked = ebSearch.getTopClicked();
    /* topClicked.forEach(function(item) {
      var imageUrl = 'https://assets.burberry.com' + item.image.split('?')[0];
      imageUrl += '?$BBY_V2_ML_3X4$&wid=402&hei=536';
      item.image = imageUrl;
    });*/
    return topClicked;
  };
};
