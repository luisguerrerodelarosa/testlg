var chartsConfig = angular.module('dashboard.configuration.charts', ['chart.js']);

chartsConfig.config(function (ChartJsProvider) {
	var colors=['#FFA400', '#FF671B', '#B01657', '#4E4044', '#EB0029', '#018375', '#39B6AC', '#71B84C', '#025850'];
    // Configuracion default de las graficas
    ChartJsProvider.setOptions({
     	colours: colors,
      	responsive: true,
      	animateScale: true
    });
});