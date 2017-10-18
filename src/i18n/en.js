angular.module('ebApp').config(['$translateProvider', function($translateProvider) {
  'use strict';

  $translateProvider.translations('en', {
    SEARCHBOX_PLACEHOLDER: 'Search & Find',
    RESULTS_FOUND: '{{results}} results',
    RESULTS_NORESULTS: 'Sorry, we could not find results for "{{query}}"',
    RESULTS_SUGGESTION: '{{results}} for {{suggestion}}:',
    RESULTS_SPELLCHECKED: 'Showing results for:',
    RESULTS_PARTIALS: 'No results found for search <span class="eb-partials-term">{{query}}</span>, but we have found these partial results:',
    LOADING: 'Loading...',
    FACETS_SELECTED: 'Your filters',
    FACETS_SHOW_MORE: '+ show more',
    FACETS_SHOW_LESS: '- show less',
    RESULTS_WE_RECOMMEND: 'We recommend',
    FACETS_CLEAN_PRICE: 'Clear price',
    CLOSE: 'Close',
    FACETS_REFINE_BY: 'Filters',
    FACETS_OK: 'View',
    FACET_CLEAR: 'Clear',
    FACET_TITLE: {
      RELEASEDATE: 'Release date',
      BRAND: 'Brand',
      CATEGORYNAME: 'Category',
      PRODUCT_EFFECTIVEPRICE_CENTS: 'Price',
      PRODUCT_SALEPRICE_CENTS: 'Price',
      PRODUCT_PRICECENTS: 'Price',
      COLORGROUP: 'Colour',
      SIZE: 'Size',
      GENDER: 'Gender',
      AGE_GROUP: 'Age',
      REPORTINGCOLOUR: 'Colour',
      COLOR: 'Color',
      COLOR_GROUP: 'Color Group'
    },
    SORT: {
      LABEL: 'Sort by',
      RELEVANCE: 'Relevance',
      PRICE_ASC: 'Price: Low',
      PRICE_DESC: 'Price: High',
      CLOSE: 'View'
    },
    PRICE_RANGE: {
      UNDER: 'Under {{price}}',
      OVER: 'Over {{price}}',
      BETWEEN: '{{start}} - {{end}}'
    },
    TRY_AGAIN: 'Please try again with a different search criteria',
    SHOW_MORE: '(Show more)',
    SHOW_ALL: 'Show all {{number}}',
    TOP_CLICKED: 'The products most viewed today',
    IN: 'in',
    ADD_TO_CART: 'Add to cart'
  });

}]);
