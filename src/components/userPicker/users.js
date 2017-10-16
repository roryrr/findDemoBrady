'use strict';
angular.module('ebApp')
.factory('ebUsers', ['$http', function($http) {
  var viewedArray = [];
  var purchasedArray = [];
  setInterval(function(){
    $http.get('http://localhost:8080/').then(function(response) {
      viewedArray.length = 0;
      purchasedArray.length = 0;
      response.data.forEach(function(e){
        if(e.identifier === "viewed"){
          viewedArray.push(e);
        }
        else {
          purchasedArray.push(e);
        }
      });
    });
  }, 1000);
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

// Controller
.controller('dataSaveController', ['$scope', '$http', function ($scope, $http) {
  $scope.viewArrayPushing = function(id){
    var data = {
      productId: id
    };
    $http.post("http://localhost:8080/viewed", data).success(function(data, status) {
      console.log('Data posted successfully');
    })
    .error(function(data, status){
      console.log("you are caught");
    });
  };

  $scope.buyArrayPushing = function(id){
    var data = {
      productId: id
    };
    $http.post("http://localhost:8080/purchased", data).success(function(data, status) {
      console.log('Data posted successfullyy');
    })
    .error(function(data, status){
      console.log("you are caught");
    });
  };
  $scope.restart = function(){
    var data = {
      productId: "id"
    };
    $http.post("http://localhost:8080/delete", data).success(function(data, status) {
      console.log('Data posted successfullyy delete');
    })
    .error(function(data, status){
      console.log("you are caught");
    });
  };
}]);
