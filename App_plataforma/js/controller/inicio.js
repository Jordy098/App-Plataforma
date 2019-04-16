angular.module('App').controller('inicioCtrl', ['$scope', '$rootScope', function ($scope, $rootScope) {
    var usu=JSON.parse(localStorage.getItem("Usuario"));
    $rootScope.Nombre_usu=usu.Nombre;
}]);