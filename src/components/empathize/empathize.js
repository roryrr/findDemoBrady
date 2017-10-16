/* exported ebEmpathizeExtendCallback */
/* global document */

var ebEmpathizeExtendCallback = function(controller) {
  'use strict';

  // Injecting dependencies
  var $injector = angular.element(document.querySelector('#eb-overlay')).injector();
  var ebConfig = $injector.get('ebConfig');
  var ebSearch = $injector.get('ebSearch');
  var ebState = $injector.get('ebState');
  var $rootScope = $injector.get('$rootScope');

  controller.showHistory = function() {
    return ebState.getQuery() === '';
  };

  controller.getHistory = function() {
    return ebSearch.getHistory();
  };

  controller.titleClick = function(e) {
    e.preventDefault();
  };

  $rootScope.$on('eb-search-box-initialized', function() {

    angular.element(document.querySelectorAll(ebConfig.domInput))
      .on('click', controller.show)
      .on('focus', controller.show)
      .on('blur', controller.hide)
      .on('keydown', controller.onKeyDown);

    if (document.querySelector(ebConfig.domInput) === document.activeElement) {
      controller.show();
    }
  });

};
