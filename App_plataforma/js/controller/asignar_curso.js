angular.module('App').controller('asignar_cursoCtrl', ['$scope', '$rootScope','$http', function ($scope, $rootScope,$http) {
    var x={ accion:"Listar_Alumnos"};
    $http({
        method : "GET",
          url : "http://localhost/web_service_plataforma/Controllers/Usuarios/Listar_Alumnos.php?x="+JSON.stringify(x)
          }).then(function mySuccess(response) {
            console.log("Usuarios"+JSON.stringify(response.data));
            $scope.Usuarios=response.data.usuarios;
          }, function myError(response) {
            //$scope.Usuarios_matricula=response.statusText;
          });
    x={ accion:"Listar_Cursos"};
    $http({
        method : "GET",
          url : "http://localhost/web_service_plataforma/Controllers/Cursos/Listar_Cursos.php?x="+JSON.stringify(x)
          }).then(function mySuccess(response) {
            console.log("Sedes"+JSON.stringify(response.data));
            $scope.Cursos=response.data.cursos;
          }, function myError(response) {
            //$scope.Usuarios_matricula=response.statusText;
          });
    
    $scope.form1 = function() {

      if($scope.form1.$valid) {
        console.log('Formulario Correcto'+$scope.form1.$valid);
      }

    };
    
    $scope.asignar=function(){
        
//        $scope.asignar.usuario
//        $scope.asignar.curso
        x={ accion:"Asignar_Curso",
            id_Usuario:$scope.asignar.usuario,
            id_Curso:$scope.asignar.curso
          };
    $http({
        method : "GET",
          url : "http://localhost/web_service_plataforma/Controllers/Cursos/Asignar_Curso.php?x="+JSON.stringify(x)
          }).then(function mySuccess(response) {
            //console.log("Sedes"+JSON.stringify(response.data));
            if(response.data.Resultado!='ERROR'){UIkit.notification(response.data.Resultado, {status:'success'})}
            else{UIkit.notification('Este Curso ya fue asignado a ese Usuario', {status:'warning'})}
            //$scope.Cursos=response.data.cursos; Este Curso ya esta asignado a ese Usuario
          }, function myError(response) {
            //$scope.Usuarios_matricula=response.statusText;
          });
    }
}]);