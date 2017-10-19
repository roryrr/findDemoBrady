/* globals ebSearchServiceExtendCallback, ebAnimationsServiceExtendCallback, ebComponentRenderingHelperExtendCallback, ebFacetExtendCallback, ebSortExtendCallback, ebNoResultsExtendCallback, ebEmpathizeExtendCallback, ebSeachBoxExtendCallback, ebRecsServiceExtendCallback, ebTopTrendsServiceExtendCallback, ebStateExtendCallback */

/**
 * @ngdoc service
 * @name ebApp.provider:ebFeatures
 * @description Allows overriding the default features on a client-specific Overlay extension
 */
angular.module('ebApp').provider('ebFeatures', ['ebBaseFeaturesProvider', function(ebBaseFeaturesProvider) {
  'use strict';

  var CUSTOM_FEATURES = {
    bodyTemplate: 'eb-body-template-rows',
    bodyFacetsSeeMoreSystem: 'default',
    bodyFacetsOpenClose: true,
    orderFacetValuesBySelected: false,
    bodyFacetsMultiSelect: true,
    bodyFacetsClear: true,
    headerResponsiveTwoRows: false,
    icons: {
      showSortIcon: false,
      showNoResultsIcon: false
    },
    history: {
      enabled: true
    },
    components: {
      facets: {
        filter: ['color_group', 'releaseDate', 'product_pricecents', 'rating']
      },
      empathize: {
        enabled: true,
        realTime: true,
        limit: 10,
        timeout: 100,
        openOnLoad: false
      },
      sort: {
        type: 'list',
        values: [
          {
            id: 'RELEVANCE',
            value: ''
          },
          {
            id: 'PRICE_ASC',
            value: 'product_effectiveprice_cents asc'
          },
          {
            id: 'PRICE_DESC',
            value: 'product_effectiveprice_cents desc'
          }
        ]
      }
    },
    extend: {
      components: {
        ebFacet: ebFacetExtendCallback,
        ebSort: ebSortExtendCallback,
        ebEmpathize: ebEmpathizeExtendCallback,
        ebNoResults: ebNoResultsExtendCallback,
        ebSearchBox: ebSeachBoxExtendCallback
      },
      services: {
        ebSearchService: ebSearchServiceExtendCallback,
        ebAnimationsService: ebAnimationsServiceExtendCallback,
        ebComponentRenderingHelper: ebComponentRenderingHelperExtendCallback,
        ebRecsService: ebRecsServiceExtendCallback,
        ebTopTrendsService: ebTopTrendsServiceExtendCallback,
        ebState: ebStateExtendCallback
      }
    }
  };

  var ebFeatures = ebBaseFeaturesProvider.setFeatures(CUSTOM_FEATURES);

  this.$get = function() {
    return ebFeatures;
  };

}]);
