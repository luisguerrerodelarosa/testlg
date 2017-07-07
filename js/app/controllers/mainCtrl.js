var main = angular.module('dashboard.controller.main', ['sticky']);

main.controller('mainCtrl', function($scope, navigation, $location, webservices, $filter, $rootScope, chartbuilder, jsontransform, $q, tablesbuilder){
	//inicializamos objetos para tenerlos disponibles mas adelante
	$scope.pageData={};
	$scope.charts={};
	$scope.tables={};
	var transformedData={};

	$scope.$on('$routeChangeSuccess', function(event, current, previous) { 
		var current= $location.$$path.replace(/\//g,"");
        navigation.setCurrent(current);
        $scope.currentPage= navigation.current;
        //obtener fechas disponibles para filtros
        if($scope.filterDates === undefined){
        	webservices.execute('information/date')
			.then(function(result) {
				$scope.filterDates=result.data;
				if(result.data !== ""){
					//agrupo por año y tomo los keys del objeto como años
					$scope.years= Object.keys($filter('groupBy')($scope.filterDates, 'year'));
					//obtener keys o claves del objeto de las fechas recibidas por el filtro
					var keysFilterDates= Object.keys($scope.filterDates);
					$scope.servicesParams={
						comparingDate:{
							date1: $scope.filterDates[keysFilterDates.length-2].formatDate, //obtengo la penultima fecha y la pongo por default
							date2: $scope.filterDates[keysFilterDates.length-1].formatDate}, //obtengo la ultima fecha y la pongo por default
						year: $scope.years[$scope.years.length-1] //obtengo el ultimo año y lo pongo por default
					};
					webservices.setParams($scope.servicesParams);
					//preparo carga de servicios inicial de la pagina
					$scope.loadServices();
				}
				
			});
        }else{
        	$scope.loadServices();
        }
        
	});
	$scope.loadTablesAndCharts=function(){
		if($scope.currentPage.charts != undefined){
        	$scope.loadCharts($scope.currentPage.charts);
        }
    	    //construimos tables de la pagina
        if($scope.currentPage.tables != undefined){
        	$scope.loadTables($scope.currentPage.tables);
        }
	}
	$scope.loadCharts=function(data){
		buildData(data, 'charts');
	}
	$scope.loadTables=function(tables){
		buildData(tables, 'tables').then(function(){
			console.log($scope.tables);
			console.log(webservices.getPageData());
		});
	}
	$scope.loadServices=function(params, method){
		if(params !=undefined){
			webservices.setParams(params);
		}
		//si la pagina consume servicios
		if($scope.currentPage.services !==undefined){
			$scope.loadingPage= true;
			//por cada servicio
			angular.forEach($scope.currentPage.services, function(service, serviceName) {
				//si metodo no esta definido, por default es get
				var method = service.method !== undefined ? service.method : 'GET';
				var toSendParams={};
				if(service.requiredParams != undefined){
					angular.forEach(service.requiredParams, function(requiredParam, key) {
						toSendParams[requiredParam]=webservices.servicesParams[requiredParam];
					});
				}
				webservices.loadServices(service.url, toSendParams, method, serviceName).then(function(){
		            /*if(service.transformJSON != undefined){
		            	angular.forEach(service.transformJSON, function(objectName, key) {
		            		transformedData[objectName]=jsontransform.transform(objectName, serviceName);
		            		
		            	});
		            }*/
		            //webservices.setPageData(transformedData, 'transformedData');
		            $scope.pageData= webservices.getPageData();
		            //construimos charts y tables de la pagina
		           	$scope.loadTablesAndCharts();
		            $scope.loadingPage= false;
		            $rootScope.$broadcast('reload');
				});
		    });
	    }else{
	    	$scope.loadTablesAndCharts();
	    }
	};
	function buildData(data, type) {
		var deferred = $q.defer();
		if(data !=undefined && type != undefined){
			angular.forEach(data, function(spec, name) {
				validateService(name, spec).then(function(){
					var pageData = webservices.getPageData();
					var requiredServices= spec.requiredService;
					var toBuildData={};
					angular.forEach(requiredServices, function(service, serviceName) {
						if(spec.serviceChild !== undefined){
							toBuildData= pageData[serviceName][spec.serviceChild];
						}else{
							toBuildData= pageData[serviceName];
						}
					});
					if(spec.titlePreffix != undefined){
						toBuildData.titlePreffix= spec.titlePreffix;
					}
					switch(type){
						case 'charts':
							$scope.charts[name]= chartbuilder.buildChart(spec.type, toBuildData);
							deferred.resolve('built');
						break;
						case 'tables':
							$scope.tables[name]= tablesbuilder.buildTable(toBuildData);
							deferred.resolve('built');
						break;
					}
				});
			});
		}else{
			deferred.reject('Undefined data on buildData');
		}
        return deferred.promise;
	}
	function validateService(chartName, chartSpec){
		var deferred = $q.defer();
		if(chartSpec.requiredService != undefined){
			//el chart ocupa servicios 
			angular.forEach(chartSpec.requiredService, function(service, serviceName) {
				//por cada servicio
				if(webservices.pageData[serviceName]== undefined){ 
					//el servicio no se ha consumido previamente
					var toSendParams={};
					var method = service.method !== undefined ? service.method : 'GET';
					if(service.requiredParams != undefined){
						angular.forEach(service.requiredParams, function(requiredParam, key) {
							toSendParams[requiredParam]=webservices.servicesParams[requiredParam];
						});
					}
					webservices.loadServices(service.url, toSendParams, method, serviceName).then(function(){
						$scope.pageData= webservices.getPageData();
						deferred.resolve('loaded');
					});
				}else{
					//el servicio ya se consumió
					deferred.resolve('Servicio existente');
				}
			});
		}else{
			//el chart no ocupa servicios 
			deferred.resolve('Sin Servicios requeridos');
		}
		return deferred.promise;
	}
});
