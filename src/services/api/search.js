/* exported ebSearchServiceExtendCallback */
/* global document, RR */

var ebSearchServiceExtendCallback = function(service) {
  'use strict';

  var $injector = angular.element(document.querySelector('#eb-overlay')).injector();
  var ebDemoUser = $injector.get('ebDemoUser');
  var ebFeatures = $injector.get('ebFeatures');
  var $log = $injector.get('$log');
  var ebSuggestionsService = $injector.get('ebSuggestionsService');
  var ebSearch = $injector.get('ebSearch');
  var parentGetParams = service.getParams;

  service.getParams = function(state) {
    var initialParams = parentGetParams(state);
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

  var parentSetResults = service.setResults;
  service.setResults = function(response) {
    if ((response.placements[0].numFound || 0) === 0) {
      ebSuggestionsService.searchSuggestions(service.request.state.query);
    } else {
      ebSearch.setSuggestions([], service.query);
    }
    parentSetResults(response);
  };

  service.successCallback = function(response) {
    if (!service.checkResponse(response)) {
      return;
    }

    if (response.placements[0].rcs) {
      RR.c('rr_rcs', response.placements[0].rcs.toString(), 730, true);
    }

    service.setLinks(response);

    if (response.placements[0].docs === undefined || response.placements[0].docs.length === 0) {
      var hnr = service.handleNoResults();
      if (!hnr) {
        return false;
      }
    } else {
      if (ebFeatures.history.enabled) {
        ebSearch.addQueryToHistory(service.request.state.query);
      }
    }

    service.mapResults(response);
    service.mapCategoryFacet(response);

    $log.debug('[SEARCH][RESPONSE]', response);
    if (service.request.isNew === true) {
      service.setResults(response);
    } else {
      service.updateResults(response);
    }

    service.trackQuery(response);
  };

  service.mapResults = function(response) {
    angular.forEach(response.placements[0].docs || [], function(item) {
      var imageUrl = item.imageId.split('?')[0];
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
};
