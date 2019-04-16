angular.module('App').controller('usuariosCtrl', ['$scope', '$rootScope','$http', function ($scope, $rootScope,$http) {
    x={ accion:"Listar_Usuarios"};
    $http({
        method : "GET",
          url : "http://localhost/web_service_plataforma/Controllers/Usuarios/Listar_Usuarios.php?x="+JSON.stringify(x)
          }).then(function mySuccess(response) {
            console.log("Usuarios"+JSON.stringify(response.data));
            $scope.Usuarios=response.data.usuarios;
          }, function myError(response) {
            //$scope.Usuarios_matricula=response.statusText;
          });
}]);