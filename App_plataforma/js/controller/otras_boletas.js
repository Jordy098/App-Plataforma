angular.module('App').controller('otras_boletasCtrl', ['$scope', '$rootScope','$http', function ($scope, $rootScope,$http) {
    var x={ accion:"Listar_Todas_Boletas"};
    $http({
        method : "GET",
          url : "http://localhost/web_service_plataforma/Controllers/Boletas/Listar_Boletas.php?x="+JSON.stringify(x)
          }).then(function mySuccess(response) {
            console.log("boletas"+JSON.stringify(response.data));
            $scope.Boletas=response.data.boletas;
          }, function myError(response) {
            //$scope.Usuarios_matricula=response.statusText;
          });
}]);