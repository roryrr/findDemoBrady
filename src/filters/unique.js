angular.module('ebApp').filter('ebUnique', function() {
  'use strict';

  return function(collection, field, blacklist) {
    var output = [];
    var keys = {};

    collection.forEach(function(item) {
      if (field) {
        var key = item[field];
        if (!keys[key]) {
          if (!blacklist || blacklist.indexOf(key) === -1) {
            keys[key] = true;
            output.push(item);
          }
        }
      } else {
        if (!keys[item]) {
          if (!blacklist || blacklist.indexOf(item) === -1) {
            keys[item] = true;
            output.push(item);
          }
        }
      }
    });

    return output;
  };

});
