angular.module('ebApp').factory('ebDemoUser', [function() {
  'use strict';

  var service = this;
  service.setUser = function(user) {
    service.demoUser = user;
  };

  service.getUser = function() {
    return service.demoUser;
  };

  return {
    setUser: service.setUser,
    getUser: service.getUser
  };
}]);
