angular.module('App').controller('sedesCtrl', ['$scope', '$rootScope','$http', function ($scope, $rootScope,$http) {
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
}]);