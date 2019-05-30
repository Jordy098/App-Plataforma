angular.module('App').controller('crear_docenteCtrl', ['$scope', '$rootScope','$http', function ($scope, $rootScope,$http) {
    $scope.usuario={};
    $scope.usuario.rut="";
    $scope.usuario.nombre="";
    $scope.usuario.correo="";
    $scope.usuario.fecha_n="";
    $scope.usuario.ciudad="";
    $scope.usuario.telefono="";
    $scope.usuario.direccion="";
    
    $scope.form1 = function() {

      if($scope.form1.$valid) {
        console.log('Formulario Correcto'+$scope.form1.$valid);
      }

    };
    
    $scope.crearUsuario=function(){
        if($scope.form1.$valid) {
        //alert(JSON.stringify($scope.usuario));
        //var string=$scope.usuario.fecha_n.toString();
        let fecha = new Date().toISOString().substr(0, 10);
        document.querySelector("#today").value = fecha;
        //alert(fecha);
        x={ accion:"Crear_Docente",
          rut:$scope.usuario.rut,
          nombre:$scope.usuario.nombre,
          clave:"1",
          correo:$scope.usuario.correo,
          fecha_n:fecha,
          ciudad:$scope.usuario.ciudad,
          telefono:$scope.usuario.telefono,
          direccion:$scope.usuario.direccion};
    $http({
        method : "GET",
          url : "http://localhost/web_service_plataforma/Controllers/Usuarios/Registro.php?x="+JSON.stringify(x)
          }).then(function mySuccess(response) {
          //console.log(JSON.stringify(response.));
          //alert(response.data.Resultado);
             UIkit.notification(response.data.Resultado, {status:'success'})
             $scope.usuario={};
             $scope.usuario.rut="";
             $scope.usuario.nombre="";
             $scope.usuario.correo="";
             $scope.usuario.fecha_n="";
             $scope.usuario.ciudad="";
             $scope.usuario.telefono="";
             $scope.usuario.direccion="";
            //$scope.Usuarios=response.data.usuarios;
          }, function myError(response) {
            //$scope.Usuarios_matricula=response.statusText;
          });
      }
        
    }
    
    
    
    
    
    
    $scope.checkRut=function(rut) {
}
    
}]);