angular.module('App').controller('cursosCtrl', ['$scope', '$rootScope','$http','MyService','$location', function ($scope, $rootScope,$http,MyService,$location) {
    $scope.listar_cursos=function(){
        x={ accion:"Listar_Cursos_Admin"};
        $http({
            method : "GET",
              url : "http://localhost/web_service_plataforma/Controllers/Cursos/Listar_Cursos.php?x="+JSON.stringify(x)
              }).then(function mySuccess(response) {
                console.log("Sedes"+JSON.stringify(response.data));
                $scope.Cursos=response.data.cursos;
              }, function myError(response) {
                //$scope.Usuarios_matricula=response.statusText;
              });
    }
    $scope.listar_cursos();
    
    $scope.editar=function(id){
        MyService.data.id=id;
        $location.url("/editar_curso");
    }
    $scope.cambio_estado=function(id,estado){
        console.log(id+","+estado);
        var aux=estado;
        if(aux==0){
           estado=1;
        }else{
           estado=0;
        }
        x={accion:"Editar_Estado_Curso",
           id:id,
           estado:estado,
           nombre:"nada"};
        $http({
            method : "GET",
              url : "http://localhost/web_service_plataforma/Controllers/Cursos/Editar.php?x="+JSON.stringify(x)
              }).then(function mySuccess(response) {
                console.log("cursos"+JSON.stringify(response.data));
                $scope.listar_cursos();
                //$scope.cursos=response.data.cursos;
              }, function myError(response) {
                //$scope.Usuarios_matricula=response.statusText;
         });
    }
    
}]);