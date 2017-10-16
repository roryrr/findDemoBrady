/* exported ebTopTrendsServiceExtendCallback */
/* global document */

var ebTopTrendsServiceExtendCallback = function(service) {
  'use strict';

  var $injector = angular.element(document.querySelector('#eb-overlay')).injector();
  var ebFeatures = $injector.get('ebFeatures');
  var ebSearch = $injector.get('ebSearch');
  var $timeout = $injector.get('$timeout');
  var $q = $injector.get('$q');
  var $http = $injector.get('$http');

  service.getTerms = function(query, lang, rows) {
    if (query && query.length && (!service.lastQuery || query !== service.lastQuery)) {
      $timeout.cancel(service.timeout);
      service.timeout = $timeout(function() {
        var canceller = $q.defer();
        var req = $http.get(service.url, {
          responseType: 'json',
          timeout: canceller.promise,
          params: {
            query: query,
            lang: lang,
            start: 0,
            rows: rows
          }
        });
        req.success(function(response) {
          var terms = [];
          response.forEach(function(term) {
            if (term.type === 'CATEGORY') { // Right now TOPTRENDS is the only supported value, filtering just for safety
              terms.push({
                term: term.terms.toLowerCase(),
                html: term.terms.toLowerCase().replace(query, '<span class="eb-empathize-hl">' + query + '</span>')
              });
            }
          });
          ebSearch.setTopTrends(terms);
        });
      }, ebFeatures.components.empathize.timeout);
    }
    service.lastQuery = query;
  };

};
