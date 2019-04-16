angular.module('App').controller('alumnosCtrl', ['$scope', '$rootScope','$http', function ($scope, $rootScope,$http) {
   $scope.width_rut='2%';
    $scope.width_nombre="2%";
    $scope.width_correo="2%";
    $scope.width_fecha="2%";
    $scope.width_ciudad="2%";
    $scope.width_telefono="2%";
    $scope.width_direccion="2%";
    $scope.align="";
    x={ accion:"Listar_Alumnos"};
    $http({
        method : "GET",
          url : "http://localhost/web_service_plataforma/Controllers/Usuarios/Listar_Alumnos.php?x="+JSON.stringify(x)
          }).then(function mySuccess(response) {
            console.log("Usuarios"+JSON.stringify(response.data));
            $scope.Usuarios=response.data.usuarios;
          }, function myError(response) {
            //$scope.Usuarios_matricula=response.statusText;
          });
    /*x={ accion:"Listar_Usuarios"};
    $http({
        method : "GET",
          url : "http://localhost/web_service_plataforma/Controllers/Usuarios/Listar_Usuarios.php?x="+JSON.stringify(x)
          }).then(function mySuccess(response) {
            console.log("Usuarios"+JSON.stringify(response.data));
            $scope.Usuarios=response.data.usuarios;
          }, function myError(response) {
            //$scope.Usuarios_matricula=response.statusText;
          });*/
}]);