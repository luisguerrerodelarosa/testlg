angular.module('dashboard.configuration.loading', [])

.config(function($httpProvider) {
	// interceptamos cada solicitud http para cargar loader cuando se solicite una llamada a algun servicio
	$httpProvider.interceptors.push(['$rootScope', function($rootScope) {
		return {
			request: function(config) {
				// To avoid ng-include HTTP requests.
				//if (config.url.match(/http/)) {
					$rootScope.loading = true;
				//}
				return config;
			},
			
			response: function(response) {
				$rootScope.loading = false;
				return response;
			},
		}
	}]);
});