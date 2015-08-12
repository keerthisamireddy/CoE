'use strict';

angular.module('excelApp')
  .controller('LoginCtrl', function ($scope, Auth, $location, $window, $state, toaster, $rootScope) {
    $scope.user = {};
    $scope.errors = {};
        $scope.displayToaster = function(){
            if(window.location.href == "http://localhost:9000/login#"){
                toaster.pop('error', "title", "text");
            }
        }
    $scope.login = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        Auth.login({
          email: $scope.user.email,
          password: $scope.user.password
        })
        .then( function() {
          // Logged in, redirect to home
          $location.path('/main');
        })
        .catch( function(err) {
          $scope.errors.other = err.message;
        });
      }
    };

    $scope.loginOauth = function(provider) {
      $window.location.href = '/auth/' + provider;
    };
  });
