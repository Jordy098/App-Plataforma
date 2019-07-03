angular.module('App').controller('editar_sedeCtrl', ['$scope', '$rootScope','$http','MyService', function ($scope, $rootScope,$http,MyService) {
    $scope.sede={};
    x={ accion:"Listar_Sedes"};
    $http({
        method : "GET",
          url : "http://localhost/web_service_plataforma/Controllers/Sedes/Listar_Sedes.php?x="+JSON.stringify(x)
          }).then(function mySuccess(response) {
            console.log("Sedes"+JSON.stringify(response.data));
            var sedes=response.data.sedes;
            for(var i=0;i<sedes.length;i++){
                if(sedes[i].id==MyService.data.id){
                    console.log(sedes[i].nombre);
                    $scope.sede.id=sedes[i].id;
                    $scope.sede.nombre=sedes[i].nombre;
                    $scope.sede.ciudad=sedes[i].ciudad;
                }
            }
            $scope.Sedes=response.data.sedes;
          }, function myError(response) {
            //$scope.Usuarios_matricula=response.statusText;
          });
    
   $scope.sede.accion="Editar_Sede";
    
   $scope.editar=function(){
       x=$scope.sede;
    $http({
        method : "GET",
          url : "http://localhost/web_service_plataforma/Controllers/Sedes/Editar.php?x="+JSON.stringify(x)
          }).then(function mySuccess(response) {
            console.log("Sedes"+JSON.stringify(response.data));
            UIkit.notification(response.data.Resultado, {status:'success'})
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