var directives = angular.module('dashboard.directives', []);

directives.directive('menu', function() {
  return {
    scope: false,
    restrict: 'E',
    templateUrl: 'views/directives/menu.html',
    controller: 'menuCtrl'
  };
})
.directive('comparacionPeriodos', function() {
  return {
    scope: false,
    restrict: 'E',
    replace: true,
    templateUrl: 'views/directives/comparacion_periodos.html',
  };
})
.directive('pageTitle', function() {
  return {
    scope: false,
    restrict: 'E',
    replace: true,
    templateUrl: 'views/directives/pageTitle.html',
  };
})
.directive('loader', function() {
  return {
    scope: false,
    restrict: 'E',
    replace: true,
    templateUrl: 'views/directives/loader.html',
  };
});