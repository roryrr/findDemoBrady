/* exported ebComponentRenderingHelperExtendCallback */
/* global document */

var ebComponentRenderingHelperExtendCallback = function(service) {
  'use strict';

  var $injector = angular.element(document.querySelector('#eb-overlay')).injector();
  var ebSearch = $injector.get('ebSearch');

  var parentCalculateEmpathizeStyles = service.calculateEmpathizeStyles;
  service.calculateEmpathizeStyles = function() {
    parentCalculateEmpathizeStyles();
    if (service.empathizeStyles) {
      var top = parseInt(service.empathizeStyles.top.replace('px', ''));
      service.empathizeStyles.top = (top + 1) + 'px';
    }
  };

  service.renderEmpathize = function() {
    return true;
  };

  service.showSuggestions = function() {
    return ebSearch.getSuggestions().length > 0;
  };


};
