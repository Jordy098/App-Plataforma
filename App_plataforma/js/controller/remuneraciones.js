angular.module('App').controller('remuneracionesCtrl', ['$scope', '$rootScope','$http', function ($scope, $rootScope,$http) {
    var x={ accion:"Listar_Remuneraciones"};
    $http({
        method : "GET",
          url : "http://localhost/web_service_plataforma/Controllers/Remuneraciones/Listar_Remuneraciones.php?x="+JSON.stringify(x)
          }).then(function mySuccess(response) {
            console.log("Remuneraciones"+JSON.stringify(response.data));
            $scope.Remuneraciones=response.data.remuneraciones;
          }, function myError(response) {
            //$scope.Usuarios_matricula=response.statusText;
          });
}]);