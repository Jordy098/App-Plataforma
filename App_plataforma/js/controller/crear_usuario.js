angular.module('App').controller('crear_usuarioCtrl', ['$scope', '$rootScope','$http', function ($scope, $rootScope,$http) {
    $scope.usuario={};
    $scope.usuario.rut="";
    $scope.usuario.nombre="";
    $scope.usuario.correo="";
    $scope.usuario.clave="";
    $scope.usuario.fecha_n="";
    $scope.usuario.ciudad="";
    $scope.usuario.telefono="";
    $scope.usuario.direccion="";
    $scope.usuario.rol_id="";
    $scope.usuario.sede_id="";
    $scope.usuario.accion="";
    $scope.sw=false;
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
    $scope.registro=function(){
        if(!$scope.sw){//creación normal (es falso)
           console.log("false");
           $scope.usuario.accion="Crear_Admin";
           $http({
                method : "GET",
                  url : "http://localhost/web_service_plataforma/Controllers/Usuarios/Registro_Admin.php?x="+JSON.stringify($scope.usuario)
                  }).then(function mySuccess(response) {
                    console.log("Usuarios"+JSON.stringify(response.data));
                    $scope.limpiar();
                    UIkit.notification(response.data.Resultado, {status:'success'})
                    //$scope.usuario=response.data.sedes;
                  }, function myError(response) {
                    //$scope.Usuarios_matricula=response.statusText;
             });
        }else{// creación rapida
            console.log("verdadero");
            $scope.usuario.accion="Crear_Admin_Express";
            $scope.usuario.fecha_n="1";
            $scope.usuario.ciudad="1";
            $scope.usuario.telefono="1";
            $scope.usuario.direccion="1";
            $http({
                method : "GET",
                  url : "http://localhost/web_service_plataforma/Controllers/Usuarios/Registro_Admin.php?x="+JSON.stringify($scope.usuario)
                  }).then(function mySuccess(response) {
                    console.log("Usuarios"+JSON.stringify(response.data));
                    $scope.limpiar();
                    UIkit.notification(response.data.Resultado, {status:'success'})
                    //$scope.usuario=response.data.sedes;
                  }, function myError(response) {
                    //$scope.Usuarios_matricula=response.statusText;
             });
            console.log("usuario : "+JSON.stringify($scope.usuario));
        }
    }
    
    $scope.switch=function(){
        if(!$scope.sw){
            $scope.sw=true;
        }else{
            $scope.sw=false;
        }
        console.log($scope.sw);
    }
    $scope.limpiar=function(){
        $scope.usuario.rut="";
        $scope.usuario.nombre="";
        $scope.usuario.correo="";
        $scope.usuario.clave="";
        $scope.usuario.fecha_n="";
        $scope.usuario.ciudad="";
        $scope.usuario.telefono="";
        $scope.usuario.direccion="";
        $scope.usuario.rol_id="";
        $scope.usuario.sede_id="";
    }
}]);