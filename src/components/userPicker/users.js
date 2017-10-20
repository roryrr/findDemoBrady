'use strict';
angular.module('ebApp')
.service('ebUsers', ['$http', 'newDataService', 'newDataServiceForPurchased', function($http, newDataService, newDataServiceForPurchased) {
  var viewedArray = newDataService.getData();
  var purchasedArray = newDataServiceForPurchased.getData();

  return {
    u1: {
      id: 'u1',
      sessionId: 's1234',
      name: 'Unknown User',
      img: 'images/anonymous.png',
      color: '#25ae88',
      viewed: [],
      purchased: [],
      searchConfig: {
        maxvb: 5.0,
        maxpb: 5.0,
        nb: 10.0,
        db: 10.0,
        ab: 10.0,
        vbp: 1.1,
        pbp: 1.1,
        psdMinS: 0.0,
        psdMaxS: 1.0,
        pBal: 4.0,
        psEnable: false,
        enableMetrics: true,
        items: 25,
        psdItem: 25
      }
    },
    u2: {
      id: 'u2',
      sessionId: 's1234',
      name: 'John Doe',
      img: 'images/johnDoe.png',
      color: '#f76363',
      viewed: viewedArray,
      purchased: purchasedArray,
      searchConfig: {
        maxvb: 5.0,
        maxpb: 5.0,
        nb: 10.0,
        db: 10.0,
        ab: 10.0,
        vbp: 1.1,
        pbp: 1.1,
        psdMinS: 0.0,
        psdMaxS: 0.0,
        pBal: 4.0,
        psEnable: true,
        enableMetrics: true,
        items: 25,
        psdItem: 25
      }
    }
  };
}])

.service('newDataService',['$http', function($http){
  var viewedArray = [];
  return{
    getData: function(){
      $http.get('http://ec2-52-90-50-25.compute-1.amazonaws.com:8080/').then(function(response) {
        viewedArray.length = 0;
        response.data.forEach(function(e){
          if(e.identifier === "viewed"){
            viewedArray.push(e);
          }
        });
      });
      return viewedArray;
    }
  }
}])

.service('newDataServiceForPurchased',['$http', function($http){
  var purchasedArray = [];
  return{
    getData: function(){
      $http.get('http://ec2-52-90-50-25.compute-1.amazonaws.com:8080/').then(function(response) {
        purchasedArray.length = 0;
        response.data.forEach(function(e){
          if(e.identifier === "purchased"){
            purchasedArray.push(e);
          }
        });
      });
      return purchasedArray;
    }
  }
}])

// Controller
.controller('dataSaveController', ['$scope', '$http', 'newDataService', 'newDataServiceForPurchased', function ($scope, $http, newDataService, newDataServiceForPurchased) {
  // var vArray = [];
  // var pArray = [];
  $scope.viewArrayPushing = function(id){
    var data = {
      productId: id
    };
    $http.post("http://ec2-52-90-50-25.compute-1.amazonaws.com:8080/viewed", data).success(function(data, status) {
      console.log('Data posted successfully');
      newDataService.getData();
    })
    .error(function(data, status){
      console.log("you are caught");
    });
  };

  $scope.buyArrayPushing = function(id){
    var data = {
      productId: id
    };
    $http.post("http://ec2-52-90-50-25.compute-1.amazonaws.com:8080/purchased", data).success(function(data, status) {
      console.log('Data posted successfullyy');
      newDataServiceForPurchased.getData();
    })
    .error(function(data, status){
      console.log("you are caught");
    });
  };
  $scope.restart = function(){
    var data = {
      productId: "id"
    };
    $http.post("http://ec2-52-90-50-25.compute-1.amazonaws.com:8080/delete", data).success(function(data, status) {
      console.log('Data posted successfullyy delete');
      newDataService.getData();
      newDataServiceForPurchased.getData();
    })
    .error(function(data, status){
      console.log("you are caught");
    });
  };
}]);
