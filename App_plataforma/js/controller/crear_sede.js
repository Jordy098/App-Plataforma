angular.module('App').controller('crear_sedeCtrl', ['$scope', '$rootScope','$http', function ($scope, $rootScope,$http) {
   $scope.sede={};
   $scope.sede.accion="Registo_Sede";
   $scope.sede.nombre="";
   $scope.sede.ciudad="";
    
   $scope.registro=function(){
       x=$scope.sede;
    $http({
        method : "GET",
          url : "http://localhost/web_service_plataforma/Controllers/Sedes/Registro.php?x="+JSON.stringify(x)
          }).then(function mySuccess(response) {
            console.log("Sedes"+JSON.stringify(response.data));
            UIkit.notification(response.data.Resultado, {status:'success'})
            $scope.limpiar();
            //$scope.Sedes=response.data.sedes;
          }, function myError(response) {
            //$scope.Usuarios_matricula=response.statusText;
     });
   }
   $scope.limpiar=function(){
       $scope.sede.nombre="";
       $scope.sede.ciudad="";
   }
}]);