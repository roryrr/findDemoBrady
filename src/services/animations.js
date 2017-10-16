/* exported ebAnimationsServiceExtendCallback */
/* global document */

var ebAnimationsServiceExtendCallback = function(service) {
  'use strict';

  // Injecting dependencies
  var $injector = angular.element(document.querySelector('#eb-overlay')).injector();
  var $document = $injector.get('$document');
  var $timeout = $injector.get('$timeout');
  var ebFeatures = $injector.get('ebFeatures');
  var ebConfig = $injector.get('ebConfig');
  var ebMotionService = $injector.get('ebMotionService');

  service.open = function() {
    var domOverlayElement = $document[0].querySelector(ebFeatures.domOverlay);
    if (domOverlayElement) {
      domOverlayElement.style.cssText = 'display: block !important';
    }
    angular.element($document[0].querySelectorAll(ebConfig.domInput)).triggerHandler('focus');
    service.placeOverlay();
    angular.element($document[0].querySelector(ebFeatures.domBody)).addClass('eb-body-fixed');
  };

  service.orderSuggestions = function() {
    $timeout(function() {
      if (ebFeatures.bodyResultsMotion) {
        var suggestions = angular.element($document[0].querySelectorAll('.eb-suggestion'));
        for (var i = 0; i < suggestions.length; i++) {
          // Move all elements to their position from 0.0
          var suggestion = suggestions[i];
          var alldocs = suggestion.querySelectorAll('.eb-result:not(.ng-leave)');
          if (ebFeatures.bodyResultsMotion) {
            for (var j = 0; j < alldocs.length; j++) {
              var doc = angular.element(alldocs[j]);
              doc.css({transform: ebMotionService.getTranslate('.eb-suggestion-list.eb-motion-grid', j)});
              doc.css({opacity: 1});
            }
          }
          // Calculate container height
          angular.element(suggestion.querySelector('.eb-suggestion-list.eb-motion-grid')).css({height: ebMotionService.getListHeight('.eb-suggestion-list.eb-motion-grid', alldocs.length)});
        }
      }
    }, 50);
  };

};
