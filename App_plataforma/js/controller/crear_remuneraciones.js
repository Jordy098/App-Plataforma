angular.module('App').controller('crear_remuneracionesCtrl', ['$scope', '$rootScope','$http', function ($scope, $rootScope,$http) {
    $scope.remuneracion={};
    $scope.remuneracion.accion="Registo_Remuneracion";
    $scope.remuneracion.banco="";
    $scope.remuneracion.tipo_cuenta="";
    $scope.remuneracion.numero_cuenta="";
    $scope.remuneracion.monto="";
    $scope.remuneracion.fecha="";
    $scope.remuneracion.usuario="";
    
    x={ accion:"Listar_Docentes"};
    $http({
        method : "GET",
          url : "http://localhost/web_service_plataforma/Controllers/Usuarios/Listar_Alumnos.php?x="+JSON.stringify(x)
          }).then(function mySuccess(response) {
            //console.log("Usuarios"+JSON.stringify(response.data));
            $scope.Usuarios=response.data.usuarios;
          }, function myError(response) {
            //$scope.Usuarios_matricula=response.statusText;
          });
    
    $scope.form1 = function() {

      if($scope.form1.$valid) {
        console.log('Formulario Correcto'+$scope.form1.$valid);
      }

    };
    
    $scope.crearRemuneracion=function(){
        if($scope.form1.$valid){
            console.log($scope.remuneracion);
        x=$scope.remuneracion;
    $http({
        method : "GET",
          url : "http://localhost/web_service_plataforma/Controllers/Remuneraciones/Registro.php?x="+JSON.stringify(x)
          }).then(function mySuccess(response) {
            //console.log("Usuarios"+JSON.stringify(response.data));
            $scope.Usuarios=response.data.usuarios;
          }, function myError(response) {
            //$scope.Usuarios_matricula=response.statusText;
          });
        }
        
    }
}]);