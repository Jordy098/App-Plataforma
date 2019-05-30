angular.module('App').controller('alumnos_cursoCtrl', ['$scope', '$rootScope','$http', function ($scope, $rootScope,$http) {
    $scope.Listar_Cursos_Alumnos=function(){
        var x={ accion:"Listar_Cursos_Alumnos"};
       $http({
           method : "GET",
             url : "http://localhost/web_service_plataforma/Controllers/Cursos/Listar_Cursos_Alumnos.php?x="+JSON.stringify(x)
             }).then(function mySuccess(response) {
               console.log(response.data);
               $scope.Curso_usuarios=response.data;
             }, function myError(response) {
               $scope.Curso_usuarios=response.statusText;
             });
    }
    $scope.Listar_Cursos_Alumnos();
//    x={ accion:"Listar_Cursos"};
//    $http({
//        method : "GET",
//          url : "http://localhost/web_service_plataforma/Controllers/Cursos/Listar_Cursos.php?x="+JSON.stringify(x)
//          }).then(function mySuccess(response) {
//            console.log("cursos "+JSON.stringify(response.data));
//            //$scope.Curso_usuarios=response.data;
//          }, function myError(response) {
//            //$scope.Curso_usuarios=response.statusText;
//          });
    
    $scope.eliminar=function(curso,usuario){
        
        console.log(curso+" "+usuario);
        Swal.fire({
          title: 'Esta seguro de esto?',
          text: "No podrás revertir esto!",
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          cancelButtonText: 'Cancelar',
          confirmButtonText: 'Si, Eliminar!'
        }).then((result) => {
          if (result.value) {
            Swal.fire(
              'Eliminado!',
              'El alumno se ha desvinculado de ese curso.',
              'success'
            )
            var x={ accion:"Eliminar_Alumno_Curso",
                    id_Usuario:usuario,
                    id_Curso:curso};
       $http({
           method : "GET",
             url : "http://localhost/web_service_plataforma/Controllers/Cursos/Eliminar_Alumno_Curso.php?x="+JSON.stringify(x)
             }).then(function mySuccess(response) {
               console.log(response.data);
                $scope.Listar_Cursos_Alumnos();
             }, function myError(response) {
               $scope.Curso_usuarios=response.statusText;
             });
          }
        })
    }
}]);