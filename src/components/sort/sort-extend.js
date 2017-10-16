/* exported ebSortExtendCallback */
/* global document */

var ebSortExtendCallback = function(controller) {
  'use strict';

  var $injector = angular.element(document.querySelector('#eb-overlay')).injector();
  var ebFeatures = $injector.get('ebFeatures');
  var ebState = $injector.get('ebState');

  controller.listClick = function() {};

  controller.isCollapsed = function() {
    if (controller.collapsed === undefined || controller.collapsed === null) {
      controller.collapsed = true;
    }
    return controller.collapsed;
  };

  if (controller.collapsed) {
    controller.toggleIconPath = 'commons/icons/toggle/' + ebFeatures.icons.openFacet + '.html';
  } else {
    controller.toggleIconPath = 'commons/icons/toggle/' + ebFeatures.icons.collapseFacet + '.html';
  }

  controller.toggleSort = function() {
    controller.collapsed = !controller.collapsed;
  };

  controller.isSelectedOption = function(value) {
    var sort = ebState.getSort();
    return (!sort && value.length === 0) || value === sort;
  };

};
