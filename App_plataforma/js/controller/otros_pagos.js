angular.module('App').controller('otros_pagosCtrl', ['$scope', '$rootScope','$http', function ($scope, $rootScope,$http) {
     x={ accion:"Listar_Otros_Pagos",
         id:3};
    $http({
        method : "GET",
          url : "http://localhost/web_service_plataforma/Controllers/Pagos/Listar_Pagos.php?x="+JSON.stringify(x)
          }).then(function mySuccess(response) {
            console.log(response.data);
            $scope.pagos_usuarios=response.data;
          }, function myError(response) {
            //$scope.Curso_usuarios=response.statusText;
          });
}]);