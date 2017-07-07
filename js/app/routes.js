var routes = angular.module('dashboard.routes', ['ngRoute']);

routes.config(function($routeProvider, navigationProvider, $locationProvider) {
	//se obtiene navegacion del provider navigation y por cada elemento creamos la ruta con sus parametros correspondientes
	var navigation= navigationProvider.getNavigation();

	angular.forEach(navigation, function(value, key) {
        $routeProvider.when(value.url, value);
    });
	$routeProvider.otherwise({
	      redirectTo: '/'
	});
});
