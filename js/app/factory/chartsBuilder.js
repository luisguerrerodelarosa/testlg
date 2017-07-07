var chartbuilder = angular.module('dashboard.factory.chartsbuilder', []);

chartbuilder.factory('chartbuilder', function chartbuilder($filter){
	/* Este controlador se encarga de dar formato a los objetos que requiere
	** cada gráfica según su tipo */

	/* aqui llegan las peticiones para construir el objeto que requiere el chart, y segun su tipo
	** se asigna el método necesario */ 
	chartbuilder.buildChart=function(type, data){
		var result={};
		switch(type){
			case 'pie':
				result= chartbuilder.buildPieChart(data);
			break;
			case 'doughnut':
				result= chartbuilder.buildPieChart(data);
			break;
			case 'bar':
				result= chartbuilder.buildBarChart(data);
			break;
		}
		return result;
	};
	//construyo el objeto que debe recibir una gráfica de pay
	chartbuilder.buildPieChart= function(data){
		//se espera recibir un objeto donde el key es el label de la gráfica y el valor que contiene
		// es numérico y alimentará a la gráfica
		var result={
			labels:[],
			data:[],
		};
		angular.forEach(data, function(data, label) {
        	result.labels.push(label);
        	result.data.push(Math.round(data.quantity * 100) / 100);
        });
		return result;
	};
	//construyo el objeto que debe recibir una gráfica de barras
	chartbuilder.buildBarChart= function(data){
		var chart={
			labels:[],
			data:[],
			series:[]
		};
		angular.forEach(data, function(infoFecha, fecha) {
			if(!isNaN(fecha)){
				var fechaData=[];
				var year= fecha.slice(0,4); 
				var month= fecha.slice(4,6);
				var fechaString= year+"-"+month+"-01";
				//cada fecha la agrego al arreglo series del objeto chart
				chart.series.push($filter('date')(fechaString, 'MMM y'));
				
				angular.forEach(infoFecha, function(infoCanal, canal) {
					if(chart.labels.indexOf(infoCanal.label) < 0){
						//cada canal la agrego al arreglo labels del objeto chart
						chart.labels.push(infoCanal.label);
					}
					//agrego informacion del canal al arreglo fechaData
					fechaData.push(Math.round(infoCanal.data.quantity * 100) / 100);
					
				});	
				//por cada fecha agrego la informacion de los canales al arreglo data del objeto chart
				chart.data.push(fechaData);
			}
		});
		return chart;
	};
	return chartbuilder;
});
