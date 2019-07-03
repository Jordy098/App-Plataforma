angular.module('App').controller('alumnos_matriculaCtrl', ['$scope', '$rootScope', 'MyService','$location','$http', function ($scope, $rootScope, MyService, $location,$http) {
    var x={ accion:"Listar_Matriculas"};
        $http({
        method : "GET",
          url : "http://localhost/web_service_plataforma/Controllers/Matriculas/Listar_Matriculas.php?x="+JSON.stringify(x)
          }).then(function mySuccess(response) {
            $scope.Usuarios_matricula=response.data;
            console.log($scope.Usuarios_matricula);
          }, function myError(response) {
            $scope.Usuarios_matricula=response.statusText;
          });
//    x={ accion:"Listar_Planes"};
//        $.get("http://localhost/web_service_plataforma/Controllers/Planes/Listar_Planes.php?x="+JSON.stringify(x), function(data) {
//                console.log(data);
//        });
//    x={ accion:"Listar_Alumnos"};
//        $.get("http://localhost/web_service_plataforma/Controllers/Usuarios/Listar_Alumnos.php?x="+JSON.stringify(x), function(data) {
//                console.log(data);
//        });
//    if($rootScope.Usuarios_matricula == null){
//       var x={ accion:"Listar_Alumnos"};
//        $.get("http://localhost/web_service_plataforma/Controllers/Usuarios/Listar_Alumnos.php?x="+JSON.stringify(x), function(data) {
//                $rootScope.Usuarios_matricula=data;
//        });
//    }
    $scope.matriculas = function(id,nombre) {
    console.log("id Matricula "+ id+" "+nombre);
    //MyService.data.name = nombre;
    //MyService.data.rut = rut;
    //console.log(MyService);
    //$location.url("/matriculas");
  };
}]);