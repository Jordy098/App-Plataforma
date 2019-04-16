angular.module('App').controller('alumnos_cursoCtrl', ['$scope', '$rootScope','$http', function ($scope, $rootScope,$http) {
    var x={ accion:"Listar_Cursos_Alumnos"};
   $http({
       method : "GET",
         url : "http://localhost/web_service_plataforma/Controllers/Cursos/Listar_Cursos_Alumnos.php?x="+JSON.stringify(x)
         }).then(function mySuccess(response) {
           console.log(response.data);
           $scope.Curso_usuarios=response.data;
         }, function myError(response) {
           $scope.Curso_usuarios=response.statusText;
         });
    x={ accion:"Listar_Cursos"};
    $http({
        method : "GET",
          url : "http://localhost/web_service_plataforma/Controllers/Cursos/Listar_Cursos.php?x="+JSON.stringify(x)
          }).then(function mySuccess(response) {
            console.log("cursos "+JSON.stringify(response.data));
            //$scope.Curso_usuarios=response.data;
          }, function myError(response) {
            //$scope.Curso_usuarios=response.statusText;
          });
}]);