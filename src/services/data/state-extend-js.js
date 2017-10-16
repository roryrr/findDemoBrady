/* exported ebStateExtendCallback */

var ebStateExtendCallback = function(service) {
  'use strict';

  service.getSelectedCount = function(facet) {
    var count = 0;
    for (var i = 0; i < service.filters.length; i++) {
      var filter = service.filters[i];
      if (filter.indexOf(facet) !== -1) {
        count++;
      }
    }
    return count;
  };

  return {
    getSelectedCount: service.getSelectedCount
  };
};
