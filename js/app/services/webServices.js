var services = angular.module('dashboard.services.webservices', []);

services.service('webservices', function webservices($http, SERVICE_URL, $q){
	webservices.data={};
	webservices.pageData={};
	webservices.servicesParams={};
	//se puede ejecutar este método para consumir un webservice, 
	//como url se envía la uri del servicio, y los parámetros necesarios
	//por default es una petición get
	webservices.execute = function(url, params, method) {
		var method = method !== undefined ? method : 'GET';
		var params = params !== undefined ? params : {};
		var c_url= SERVICE_URL + url;
		angular.forEach(params, function(value) {
			if(typeof value === 'object'){
				angular.forEach(value, function(item) {
					c_url+="/"+ item;
				});
			}else{
				c_url+="/"+ value;
			}
	    });
		var options = {
			method: method,
			url: c_url
		};
		return $http(options).success(function(data) {
			webservices.data = data;
		});
	};
	//se ejecuta al cargar la información de una página
	webservices.loadServices = function(url, params, method, name) {
		//se agrega $q para permitir que se lea como promesa
		var deferred = $q.defer();
		//se ejecuta el servicio con la infromación solicitada
		webservices.execute(url, params, method)
		.then(function(result) {
			//se guarda en pageData con el key del nombre del servicio la información devuelta.
			webservices.pageData[name]=result.data;
			deferred.resolve(name);
		});
			
		return deferred.promise;
	};
	//metodo para obtener la información de la página
	webservices.getPageData= function(){
		return webservices.pageData;
	};
	webservices.setPageData= function(data, key){
		webservices.pageData[key]= data;
	};
	webservices.setParams= function(params){
		webservices.servicesParams=params;
	};
	webservices.getParams= function(){
		return webservices.servicesParams;
	};
	return webservices;

});