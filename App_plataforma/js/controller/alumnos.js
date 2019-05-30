angular.module('App').controller('alumnosCtrl', ['$scope', '$rootScope','$http','MyService','$location', function ($scope, $rootScope,$http,MyService,$location) {
   $scope.width_rut='12%';
    $scope.width_nombre="12%";
    $scope.width_correo="19%";
    $scope.width_fecha="13%";
    $scope.width_ciudad="12%";
    $scope.width_telefono="12%";
    $scope.width_direccion="12%";
    $scope.width_acccion="12%";
    $scope.align="";
    x={ accion:"Listar_Alumnos"};
    $http({
        method : "GET",
          url : "http://localhost/web_service_plataforma/Controllers/Usuarios/Listar_Alumnos.php?x="+JSON.stringify(x)
          }).then(function mySuccess(response) {
            console.log("Usuarios"+JSON.stringify(response.data));
            $scope.Usuarios=response.data.usuarios;
          }, function myError(response) {
            //$scope.Usuarios_matricula=response.statusText;
          });
    
    $scope.editar=function(id){
        console.log(id);
        var usuarios=$scope.Usuarios;
        for(var i=0;i<usuarios.length;i++){
            if(usuarios[i].id==id){
               console.log(JSON.stringify(usuarios[i]));
               MyService.data.id=usuarios[i].id;
               MyService.data.rut=usuarios[i].rut;
               MyService.data.nombre=usuarios[i].nombre;
               MyService.data.correo=usuarios[i].correo;
               MyService.data.fecha=usuarios[i].fecha_nacimiento;
               MyService.data.ciudad=usuarios[i].ciudad;
               MyService.data.telefono=usuarios[i].telefono;
               MyService.data.direccion=usuarios[i].direccion;
               $location.url("/editar_alumno");
            }
        }
    }
    /*x={ accion:"Listar_Usuarios"};
    $http({
        method : "GET",
          url : "http://localhost/web_service_plataforma/Controllers/Usuarios/Listar_Usuarios.php?x="+JSON.stringify(x)
          }).then(function mySuccess(response) {
            console.log("Usuarios"+JSON.stringify(response.data));
            $scope.Usuarios=response.data.usuarios;
          }, function myError(response) {
            //$scope.Usuarios_matricula=response.statusText;
          });*/
}]);