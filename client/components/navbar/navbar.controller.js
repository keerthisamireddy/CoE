'use strict';

angular.module('excelApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth, $window) {
    $scope.menu = [{
      'title': 'Home',
      'link': '/'
    }];

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.logout = function() {
      Auth.logout();
      $location.path('/login');
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };
        $scope.loginOauth = function(provider) {
            $window.location.href = '/auth/' + provider;
        };
  });