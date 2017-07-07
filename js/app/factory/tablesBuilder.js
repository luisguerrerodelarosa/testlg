var tablesbuilder = angular.module('dashboard.factory.tablesbuilder', []);

tablesbuilder.factory('tablesbuilder', function tablesbuilder($rootScope, $filter){
	/* Este controlador se encarga de dar formato a los objetos que requiere cada tabla */

	tablesbuilder.buildTable=function(data){
		if(data !=undefined){
			var table={};
			table.title=data.nombre != undefined ? data.nombre : data.label;
			if(data.titlePreffix !=undefined){
				table.title= data.titlePreffix.concat(table.title);
			}
			table.data={};
			table.headers=[
				{
					label: 'Canales',
					key: 'canal'
				}
			];
			angular.forEach(data, function(item, datekey){
				if((typeof item === 'object')){
					var date= $filter('date')(stringToDate(datekey), 'MMMM y');
					var dateHeader={
						label: date,
						key: datekey
					}
					table.headers.push(dateHeader);
					angular.forEach(item, function(canal, canalkey){
						if(table.data[canalkey] == undefined){
							table.data[canalkey]={
								canal: canal.label
							};
						}
						table.data[canalkey][datekey]= canal.data!=undefined ? canal.data.quantity : canal.quantity;
						angular.forEach(canal, function(detalle, detallekey){
							if((typeof detalle === 'object')){
								if(detallekey !='data'){
									if(table.data[canalkey]['detail'] == undefined){
										table.data[canalkey]['detail']={};
									}
									if(table.data[canalkey]['detail'][detallekey] == undefined){
										table.data[canalkey]['detail'][detallekey]={
											canal: detalle.indicator != undefined ? detalle.indicator : detalle.label
										};
									}
									table.data[canalkey]['detail'][detallekey][datekey]= detalle.quantity;
								}
							}
						});
					});
				}
			});
		}
		return table;
	};
	
	return tablesbuilder;

	function stringToDate(string){
		var year= string.slice(0,4); 
		var month= string.slice(4,6);
		var fechaString= year+"-"+month+"-01";
		return fechaString;
	}
});
