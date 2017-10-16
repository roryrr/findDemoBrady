/* exported ebFacetExtendCallback */
/* global document */

var ebFacetExtendCallback = function(controller) {
  'use strict';

  var $injector = angular.element(document.querySelector('#eb-overlay')).injector();
  var ebState = $injector.get('ebState');

  controller.getNumberOfColumns = function() {
    var len = controller.facet.values.length;
    return Math.min(4, Math.floor(Math.sqrt(len)));
  };

  controller.getSelectedCount = function(facet) {
    return ebState.getSelectedCount(facet);
  };
};
