var filters = angular.module('dashboard.filters', []);
//se crea filtro de angular para agrupar
filters.filter('groupBy', function ($timeout, $filter) {
    return function (data, key) {
        if (!key) return data;
        var outputPropertyName = '__groupBy__' + key;
        if(!data[outputPropertyName]){
            var result = {};  
            for (var i=0;i<data.length;i++) {
                if (!result[data[i][key]])
                    result[data[i][key]]=[];
                result[data[i][key]].push(data[i]);
            }
            Object.defineProperty(data, outputPropertyName, {enumerable:false, configurable:true, writable: false, value:result});
            $timeout(function(){delete data[outputPropertyName];},0,false);
        }
        return data[outputPropertyName];
    };
})
.filter('percentage', function ($filter) {
  return function (input) {
    return $filter('number')(input, 1) + '%';
  };
})
.filter('setFilter', function ($filter) {
    return function (data, key) {
        if(key == undefined) return data;
        data=$filter(key)(data);
        return data;
    };
});