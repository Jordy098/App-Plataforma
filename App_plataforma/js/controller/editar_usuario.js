angular.module('App').controller('editar_usuarioCtrl', ['$scope', '$rootScope','$http', 'MyService', function ($scope, $rootScope,$http,MyService) {
    console.log("WOOW "+MyService.data.usuarios);
    //MyService.data.id=usuarios[i].id;
           
    $scope.usuario={};
    $scope.usuario.rut=MyService.data.rut;
    $scope.usuario.nombre=MyService.data.nombre;
    $scope.usuario.correo=MyService.data.correo;
    var f = new Date(MyService.data.fecha);
    var dd = f.getDate()+1;
    var mm = f.getMonth()+1;
    var yyyy = f.getFullYear();
    
    f=dd+"/"+mm+"/"+yyyy;
    $scope.usuario.fecha_n=f;
    console.log(MyService.data.fecha);
    $scope.usuario.ciudad=MyService.data.ciudad;
    $scope.usuario.telefono=MyService.data.telefono;
    $scope.usuario.direccion=MyService.data.direccion;
    
    $scope.editar=function(){
        //$accion, $id_Usuario, $nombre, $rut, $correo, $clave, $fecha_n, $ciudad, $telefono, $direccion,$rol_id, $sede_id
        x={ accion:"Editar_Alumno",
          id_Usuario:MyService.data.id,
          nombre:$scope.usuario.nombre,
          rut:$scope.usuario.rut,
          correo:$scope.usuario.correo,
          clave:"1",
          fecha_n:MyService.data.fecha,
          ciudad:$scope.usuario.ciudad,
          telefono:$scope.usuario.telefono,
          direccion:$scope.usuario.direccion,
          rol_id:"1",
          sede_id:"1"};
        $http({
        method : "GET",
          url : "http://localhost/web_service_plataforma/Controllers/Usuarios/Editar.php?x="+JSON.stringify(x)
          }).then(function mySuccess(response) {
          //console.log(JSON.stringify(response.));
          //alert(response.data.Resultado);
             //UIkit.notification(response.data.Resultado, {status:'success'})
            //$scope.Usuarios=response.data.usuarios;
          }, function myError(response) {
            //$scope.Usuarios_matricula=response.statusText;
          });
        Swal.fire({
          type: 'success',
          title: 'Los cambios fueron relaizados con exito',
          showConfirmButton: false,
          timer: 1500
        })
    }
}]);
