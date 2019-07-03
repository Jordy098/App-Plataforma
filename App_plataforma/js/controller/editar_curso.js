angular.module('App').controller('editar_cursoCtrl', ['$scope', '$rootScope','$http','MyService', function ($scope, $rootScope,$http,MyService) {
   $scope.curso={};
    x={ accion:"Listar_Cursos_Admin"};
    $http({
        method : "GET",
          url : "http://localhost/web_service_plataforma/Controllers/Cursos/Listar_Cursos.php?x="+JSON.stringify(x)
          }).then(function mySuccess(response) {
            console.log("Cursos"+JSON.stringify(response.data));
            var cursos=response.data.cursos;
            for(var i=0;i<cursos.length;i++){
                if(cursos[i].id==MyService.data.id){
                    console.log(cursos[i].nombre);
                    $scope.curso.id=cursos[i].id;
                    $scope.curso.nombre=cursos[i].nombre;
                    $scope.curso.estado=cursos[i].estado;
                }
            }
            $scope.cursos=response.data.cursos;
          }, function myError(response) {
            //$scope.Usuarios_matricula=response.statusText;
          });
    
   $scope.curso.accion="Editar_Curso";
    
   $scope.editar=function(){
       x=$scope.curso;
    $http({
        method : "GET",
          url : "http://localhost/web_service_plataforma/Controllers/Cursos/Editar.php?x="+JSON.stringify(x)
          }).then(function mySuccess(response) {
            console.log("cursos"+JSON.stringify(response.data));
            UIkit.notification(response.data.Resultado, {status:'success'})
            //$scope.cursos=response.data.cursos;
          }, function myError(response) {
            //$scope.Usuarios_matricula=response.statusText;
     });
   }
}]);