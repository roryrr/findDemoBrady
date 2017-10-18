angular.module('ebApp').component('ebUserPicker', {
  templateUrl: 'components/userPicker/userPicker.html',
  controller: ['ebSearch', 'ebSearchService', 'ebState', 'ebDemoUser', 'ebUsers', 'newDataService', function(ebSearch, ebSearchService, ebState, ebDemoUser, ebUsers, newDataService) {
    'use strict';

    var controller = this;
    controller.open = false;
    controller.showDetails = false;

    controller.users = [];
    for (var userKey in ebUsers) {
      if (ebUsers.hasOwnProperty(userKey)) {
        controller.users.push(ebUsers[userKey]);
      }
    }
    controller.selectedUser = controller.users[0];

    controller.categoryAffinities = {};
    controller.users.forEach(function(user) {
      controller.categoryAffinities[user.id] = [];
      user.viewed.forEach(function(product) {
        product.categories.forEach(function(category) {
          if (controller.categoryAffinities[user.id].indexOf(category) === -1) {
            controller.categoryAffinities[user.id].push(category);
          }
        });
      });
    });

    controller.getCategoryAffinities = function() {
      if (controller.selectedUser) {
        return controller.categoryAffinities[controller.selectedUser.id];
      } else {
        return [];
      }
    };

      controller.getProducts = function() {
        if (controller.selectedUser) {
          return controller.selectedUser.viewed;
        } else {
          return [];
        }
      };

      controller.getPurchasedProducts = function() {
        if (controller.selectedUser) {
          return controller.selectedUser.purchased;
        } else {
          return [];
        }
      };

    controller.clickUser = function(user) {
      if (controller.open) {
        if (controller.selectedUser === user) {
          controller.showDetails = !controller.showDetails;
        } else {
          controller.selectedUser = user;
          controller.showDetails = true;
          ebDemoUser.setUser(user);
          ebSearch.clear();
          ebSearchService.newSearch();
        }
      } else {
        controller.open = true;
      }
    };

    controller.isSelectedUser = function(user) {
      return controller.selectedUser === user;
    };

  }]
});
