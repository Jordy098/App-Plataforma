angular.module('App').controller('crear_cursoCtrl', ['$scope', '$rootScope','$http', function ($scope, $rootScope,$http) {
   $scope.curso={};
   $scope.curso.accion="Registro_Curso";
   $scope.curso.nombre="";
   $scope.curso.estado="";
    
   $scope.registro=function(){
       x=$scope.curso;
    $http({
        method : "GET",
          url : "http://localhost/web_service_plataforma/Controllers/Cursos/Registro.php?x="+JSON.stringify(x)
          }).then(function mySuccess(response) {
            console.log("Sedes"+JSON.stringify(response.data));
            UIkit.notification(response.data.Resultado, {status:'success'})
            $scope.limpiar();
            //$scope.Sedes=response.data.sedes;
          }, function myError(response) {
            //$scope.Usuarios_matricula=response.statusText;
     });
   }
   $scope.limpiar=function(){
       $scope.curso.nombre="";
       $scope.curso.estado="";
   }
}]);