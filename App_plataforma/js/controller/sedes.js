angular.module('App').controller('sedesCtrl', ['$scope', '$rootScope','$http','MyService','$location', function ($scope, $rootScope,$http,MyService,$location) {
    x={ accion:"Listar_Sedes"};
    $http({
        method : "GET",
          url : "http://localhost/web_service_plataforma/Controllers/Sedes/Listar_Sedes.php?x="+JSON.stringify(x)
          }).then(function mySuccess(response) {
            console.log("Sedes"+JSON.stringify(response.data));
            $scope.Sedes=response.data.sedes;
          }, function myError(response) {
            //$scope.Usuarios_matricula=response.statusText;
          });
    $scope.editar=function(id){
        //alert("wena"+usu.rut);
        MyService.data.id=id;
        $location.url("/editar_sede");
    }
}]);