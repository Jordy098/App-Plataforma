angular.module('App').controller('editar_usuarioCtrl', ['$scope', '$rootScope','$http', 'MyService', function ($scope, $rootScope,$http,MyService) {
    console.log("WOOW "+MyService.data.rut_usuario);
    $scope.rol_disponible=false;
    $scope.config=false;
    if(MyService.data.accion=="usu"){
       $scope.rut=MyService.data.rut;
       $scope.id=MyService.data.id;
        console.log(MyService.data.id);
       $scope.config=true;
    }else if(MyService.data.accion=="mio"){
        var usu=JSON.parse(localStorage.getItem("Usuario"));
        $scope.rut=usu.Rut;
        $scope.config=false;
    }
    
    $scope.usuario_rol_id="";
    $scope.usuario_sede_id="";
    
     x={ accion:"Listar_Roles"};
    $http({
        method : "GET",
          url : "http://localhost/web_service_plataforma/Controllers/Roles/Listar_Roles.php?x="+JSON.stringify(x)
          }).then(function mySuccess(response) {
            console.log("Roles"+JSON.stringify(response.data));
            $scope.Roles=response.data.roles;
          }, function myError(response) {
            //$scope.Usuarios_matricula=response.statusText;
    });
     x={ accion:"Listar_Sedes"};
    $http({
        method : "GET",
          url : "http://localhost/web_service_plataforma/Controllers/Sedes/Listar_Sedes.php?x="+JSON.stringify(x)
          }).then(function mySuccess(response) {
            console.log("Sedes"+JSON.stringify(response.data));
            $scope.Sedes=response.data.sedes;
          }, function myError(response) {
            //$scope.Usuarios_matricula=response.statusText;
    });
    
     x={ accion:"Existe",
         rut:$scope.rut};
    $http({
        method : "GET",
          url : "http://localhost/web_service_plataforma/Controllers/Usuarios/Existe.php?x="+JSON.stringify(x)
          }).then(function mySuccess(response) {
             console.log(JSON.stringify(response.data));
             //alert(response.data.Resultado);
             //UIkit.notification(response.data.Resultado, {status:'success'})
             $scope.usuarios=response.data.usuario;
             console.log($scope.usuarios);
            
            $scope.usuario.id=response.data.usuario.id;
            $scope.usuario.rut=$scope.rut;
            $scope.usuario.nombre=response.data.usuario.nombre;
            $scope.usuario.correo=response.data.usuario.correo;
            $scope.usuario.clave="";
            $scope.usuario.fecha=response.data.usuario.fecha_n;
            var f = new Date($scope.usuario.fecha);
            var dd = f.getDate()+1;
            var mm = f.getMonth()+1;
            var yyyy = f.getFullYear();

            f=dd+"/"+mm+"/"+yyyy;
            $scope.usuario.fecha_n=f;
            console.log(response.data.usuario.fecha);
            $scope.usuario.ciudad=response.data.usuario.ciudad;
            $scope.usuario.telefono=response.data.usuario.telefono;
            $scope.usuario.direccion=response.data.usuario.direccion;
            $scope.usuario_rol_id=response.data.usuario.rol_id;
            $scope.usuario_sede_id=response.data.usuario.sede_id;
          }, function myError(response) {
            //$scope.Usuarios_matricula=response.statusText;
          });
    //MyService.data.id=usuarios[i].id;
           
    $scope.usuario={};
    
    
    $scope.editar=function(){
        //$accion, $id_Usuario, $nombre, $rut, $correo, $clave, $fecha_n, $ciudad, $telefono, $direccion,$rol_id, $sede_id
        var pass="1";// este es el valor por defecto del password para no enviarlo como null
        if($scope.usuario.clave!=""){
           pass=$scope.usuario.clave;
        }
        x={ accion:"Editar_Admin",
          id_Usuario:$scope.usuario.id,
          nombre:$scope.usuario.nombre,
          rut:$scope.usuario.rut,
          correo:$scope.usuario.correo,
          clave:pass,
          fecha_n:$scope.usuario.fecha,
          ciudad:$scope.usuario.ciudad,
          telefono:$scope.usuario.telefono,
          direccion:$scope.usuario.direccion,
          rol_id:$scope.usuario_rol_id,
          sede_id:$scope.usuario_sede_id};
        $http({
        method : "GET",
          url : "http://localhost/web_service_plataforma/Controllers/Usuarios/Editar.php?x="+JSON.stringify(x)
          }).then(function mySuccess(response) {
          //console.log(JSON.stringify(response.));
          //alert(response.data.Resultado);
             //UIkit.notification(response.data.Resultado, {status:'success'})
            //$scope.Usuarios=response.data.usuarios;
            Swal.fire({
              type: 'success',
              title: response.data.Resultado,
              showConfirmButton: false,
              timer: 1500
            })
          }, function myError(response) {
            //$scope.Usuarios_matricula=response.statusText;
          });
    }
}]);
