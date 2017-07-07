var dashboard = angular.module('dashboard', [
	'dashboard.providers.navigation',
	'dashboard.configuration.constants',
	'dashboard.configuration.charts',
	'dashboard.configuration.loading',
	'dashboard.services.webservices',
	'dashboard.factory.chartsbuilder',
	'dashboard.factory.tablesbuilder',
	'dashboard.factory.jsonTransform',
	'dashboard.controller.main',
	'dashboard.controller.menu',
	'dashboard.directives',
	'dashboard.routes',
	'dashboard.filters'
]);