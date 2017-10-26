/**
 * @ngdoc service
 * @name ebApp.provider:ebConfig
 * @description Allows overriding the default configurations on a client-specific Overlay extension
 */
angular.module('ebApp').provider('ebConfig', ['ebBaseConfigProvider', function(ebBaseConfigProvider) {
  'use strict';

  var CUSTOM_CONFIG = {
    apiClientKey: '706e5f5b8e4605f6',
    loadingAnimation: 'images/loadingcss.html'
  };

  var ebConfig = ebBaseConfigProvider.setConfig(CUSTOM_CONFIG, {});

  this.setConfig = function(initConfig) {
    ebConfig = ebBaseConfigProvider.setConfig(CUSTOM_CONFIG, initConfig);
    return ebConfig;
  };

  this.$get = function() {
    return ebConfig;
  };

}]);
