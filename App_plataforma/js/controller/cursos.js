angular.module('App').controller('cursosCtrl', ['$scope', '$rootScope','$http', function ($scope, $rootScope,$http) {
    x={ accion:"Listar_Cursos"};
    $http({
        method : "GET",
          url : "http://localhost/web_service_plataforma/Controllers/Cursos/Listar_Cursos.php?x="+JSON.stringify(x)
          }).then(function mySuccess(response) {
            console.log("Sedes"+JSON.stringify(response.data));
            $scope.Cursos=response.data.cursos;
          }, function myError(response) {
            //$scope.Usuarios_matricula=response.statusText;
          });
}]);