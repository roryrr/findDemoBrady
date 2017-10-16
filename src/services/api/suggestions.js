angular.module('ebApp').factory('ebSuggestionsService', ['$http', 'ebConfig', 'ebDemoUser', 'ebSearch', 'ebState', function($http, ebConfig, ebDemoUser, ebSearch, ebState) {
  'use strict';

  var service = this;
  service.searchSuggestions = function(query) {
    service.suggestions = [];
    service.query = query;
    var state = ebState.getState();
    var queries = query.split(' ');
    queries.forEach(function(query) {
      var params = service.getParams(state, query);
      service.doSearch(params);
    });
  };

  service.doSearch = function(params) {
    $http
      .get(ebConfig.endpoints.find + '/' + ebConfig.r3.apiKey, {
        responseType: 'json',
        params: params
      })
      .success(function(response) {
        if (response.placements[0].numFound > 0) {
          service.mapResults(response, params);
          service.suggestions.push(response.placements[0]);
          ebSearch.setSuggestions(service.suggestions, params.query);
        }
      });
  };

  service.getParams = function(state, query) {
    var initialParams = {
      query: query,
      start: 0,
      rows: 3,
      lang: ebConfig.lang,
      placement: ebConfig.searchPlacement,
      userId: ebConfig.r3.userId,
      sessionId: ebConfig.r3.sessionId,
      channelId: ebConfig.r3.channelId,
      region: ebConfig.r3.regionId,
      ssl: 'true',
      log: false
    };

    var demoUser = ebDemoUser.getUser();

    if (demoUser) {
      initialParams.userId = demoUser.id || 'u1';
      initialParams.sessionId = demoUser.sessionId || initialParams.sessionId;

      if (demoUser.viewed.length) {
        initialParams.viewed = getIds(demoUser.viewed).join('|') || '';
      }
      if (demoUser.purchased.length) {
        initialParams.purchased = getIds(demoUser.purchased).join('|') || '';
      }
      if (demoUser.searchConfig !== undefined) {
        initialParams.searchConfig = demoUser.searchConfig || {};
      }
    }
    return initialParams;
  };

  service.mapResults = function(response, params) {
    angular.forEach(response.placements[0].docs || [], function(item) {
      var imageUrl = 'https://assets.burberry.com' + item.imageId.split('?')[0];
      imageUrl += '?$BBY_V2_ML_3X4$&wid=300&hei=400';
      angular.extend(item, {
        image: imageUrl,
        hoverImage: item.AlternateImageUrl,
        price: item.priceCents / 100,
        salePrice: item.salePriceCents / 100,
        effectivePrice: item.effectivePriceCents / 100,
        a2cParams: response.placements[0].addtoCartParams,
        url: item.clickUrl + '&redirect=true',
        trackUrl: item.clickUrl
      });
    });
    response.placements[0].suggestion = params.query;
  };

  var getIds = function(array) {
    var ids = [];
    for (var p in array) {
      if (array.hasOwnProperty(p)) {
        var product = array[p];
        if (product.hasOwnProperty('id')) {
          ids.push(product.id);
        }
      }
    }
    return ids;
  };

  return {
    searchSuggestions: service.searchSuggestions
  };
}]);
