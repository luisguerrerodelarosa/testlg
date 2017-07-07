var menu = angular.module('dashboard.controller.menu', ['ui.bootstrap', 'ngAside']);

menu.controller('menuCtrl', function($scope, navigation, $aside){
  //de mi provider navigation obtengo el objeto con la navegación y parámetros de cada página de la aplicación
	var navigation= navigation.getNavigation();
  //inicializo objeto menú
	var menu= {};
  //por cada elemento en navegación
	angular.forEach(navigation, function(value, key) {
    //si tiene seteado el campo menu item
      if(value.menuItem !=undefined){
        //se agregará el elemento al objeto que desplegará los menús con el nombre del campo
      	menu[key]= value;
      }
  });
  $scope.menu= menu;
 
  /**** MENÚ EN MÓVILES ****/
  //por default ocultamos el menu lateral que se mostrara en moviles
  $scope.asideState = {
    open: false
  };
  //seteamos el metodo open menu
  $scope.openMenu = function() {
    //al menu le ponemos como estado true y le asignamos la posicion
    $scope.asideState = {
      open: true,
      position: 'left'
    };
    //cuando se cuerra el menu se asigna el estado false
    function postClose() {
      $scope.asideState.open = false;
    }
    //al abrirse mostramos el template del siguiente archivo con las
    //siguientes especificaciones
    $aside.open({
      templateUrl: 'views/partials/templates/menu-tpl.html',
      placement: 'left',
      size: 'sm',
      backdrop: true,
      controller: function($scope, $uibModalInstance, navigation) {
      	$scope.menu= menu;
        $scope.cancel = function(e) {
            $uibModalInstance.dismiss();
            e.stopPropagation();
        };
      }
    }).result.then(postClose, postClose);
  };
});
