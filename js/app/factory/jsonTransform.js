var jsontransform = angular.module('dashboard.factory.jsonTransform', []);

jsontransform.factory('jsontransform', function jsontransform(webservices){
	jsontransform.transform=function(objectName, serviceName){
		var pageData= webservices.getPageData();
		var objectData= pageData[serviceName][objectName];
		var channels={};
		var channelsKeys=[];
		var variations={};
		angular.forEach(objectData, function(data, key) {
			if(typeof(data) =='object'){
				angular.forEach(data, function(channelData, channelName) {
					if(channelsKeys.indexOf(channelName) < 0){
						channelsKeys.push(channelName);
						channels[channelName]= {
							id: channelData.id,
							label: channelData.label,
							info:{}
						};
					}
					channels[channelName]['info'][key]=channelData;

				});
			}
		});
		objectData={
			id: objectData.id,
			nombre: objectData.nombre,
			channels: channels
		};
		transformedData=objectData;
		var result= transformedData;
		return result;
	};
	return jsontransform;
});

Array.prototype.max = function() {
  return Math.max.apply(null, this);
};

Array.prototype.min = function() {
  return Math.min.apply(null, this);
};
