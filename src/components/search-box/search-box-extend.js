/* exported ebSeachBoxExtendCallback */
/* global document */

var ebSeachBoxExtendCallback = function(/* controller */) {
  'use strict';

  var $injector = angular.element(document.querySelector('#eb-overlay')).injector();
  var $rootScope = $injector.get('$rootScope');

  $rootScope.$broadcast('eb-search-box-initialized');
};
