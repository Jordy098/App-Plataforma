angular.module('App').controller('crear_matriculaCtrl', ['$scope', '$rootScope','$http','$location','MyService', function ($scope, $rootScope,$http,$location,MyService) {
    $scope.usuario={};
    $scope.usuario.rut="";
    $scope.usuario.nombre="";
    $scope.usuario.correo="";
    $scope.usuario.fecha_nacimiento="";
    $scope.usuario.ciudad="";
    $scope.usuario.telefono="";
    $scope.usuario.direccion="";
    $scope.matricula={};
    $scope.matricula.curso="";
    $scope.matricula.semestres="";
    $scope.boleta={};
    $scope.boleta.planes="";
    $scope.boleta.valor_cuota="0";
    $scope.boleta.monto="";
    $scope.boleta.primera_cuota="";
    $scope.boleta.ultima_cuota="";
    $scope.arancel="";
    $scope.fecha_arancel="";
    
    
    var num = $scope.boleta.valor_cuota.replace(/\./g,'');
    if(!isNaN(num)){
        num = num.toString().split('').reverse().join('').replace(/(?=\d*\.?)(\d{3})/g,'$1.');
        num = num.split('').reverse().join('').replace(/^[\.]/,'');
        $scope.boleta.valor_cuota =num;
    }
    
//    var x={ accion:"Listar_Planes"};
//    $http({
//        method : "GET",
//          url : "http://localhost/web_service_plataforma/Controllers/Planes/Listar_Planes.php?x="+JSON.stringify(x)
//          }).then(function mySuccess(response) {
//            $scope.planes=response.data.planes;
//            console.log($scope.boleta.planes);
//          }, function myError(response) {
//            $scope.planes=response.statusText;
//          });
    $scope.form1 = function() {

      if($scope.form1.$valid) {
        console.log('Formulario Correcto'+$scope.form1.$valid);
      }

    };
    $scope.registro=function(){
        if($scope.form1.$valid) {
            console.log("Usuario"+JSON.stringify($scope.usuario));
        console.log("Matricula"+JSON.stringify($scope.matricula));
        console.log("Boleta"+JSON.stringify($scope.boleta));
          x={ accion:"Crear_Alumno",
             rut:$scope.usuario.rut,
             nombre:$scope.usuario.nombre,
             clave:1,
             correo:$scope.usuario.correo,
             fecha_n:$scope.usuario.fecha_nacimiento,
             ciudad:$scope.usuario.ciudad,
             telefono:$scope.usuario.telefono,
             direccion:$scope.usuario.direccion};
          $http({
              method : "GET",
                url : "http://localhost/web_service_plataforma/Controllers/Usuarios/Registro.php?x="+JSON.stringify(x)
                }).then(function mySuccess(response) {
                  if(response.data.Resultado!='ERROR'){//Indica que se realizo Correctamente el Registro de Usuario
                     
                        x={ accion:"Existe",
                        rut:$scope.usuario.rut};
                        $http({
                            method : "GET",
                              url : "http://localhost/web_service_plataforma/Controllers/Usuarios/Existe.php?x="+JSON.stringify(x)
                              }).then(function mySuccess(response) {
                                if(response.data.Resultado!='ERROR'){//Si el Rut existe trae el ID
                                    //console.log(response.data.usuario.id);
                                    $scope.matricula.usuario_id=response.data.usuario.id;
                                    console.log("Matricula"+JSON.stringify($scope.matricula));
                                    //
                                    x={ accion:"Registo_Boleta_Matricula",
                                        n_boleta:"1321",
                                        n_cuotas:$scope.boleta.planes,
                                        valor_cuota:$scope.boleta.valor_cuota,
                                        monto_total:$scope.boleta.monto,
                                        estado:"Proceso",
                                        fecha_inicio:$scope.boleta.primera_cuota,
                                        fecha_fin:$scope.boleta.ultima_cuota,
                                        usuario_id:$scope.matricula.usuario_id};
                                    $http({
                                        method : "GET",
                                          url : "http://localhost/web_service_plataforma/Controllers/Boletas/Registro_Boleta.php?x="+JSON.stringify(x)
                                          }).then(function mySuccess(response) {
                                            if(response.data.Resultado!='ERROR'){//Crea Boleta de Matricula
                                                MyService.data.matriculas = $scope.matricula;
                                                MyService.data.id_Usuario=$scope.matricula.usuario_id;
                                                $location.url("/matriculas");
                                            }else{
                                                Swal.fire({
                                                  type: 'error',
                                                  title: 'Uups...',
                                                  text: 'Hubo un problema al generar la boleta automatica!'
                                                })
                                            }

                                          }, function myError(response) {
                                            //$scope.planes=response.statusText;
                                          });
                                    
                                }else{
                                    Swal.fire({
                                      type: 'error',
                                      title: 'Uups...',
                                      text: 'Este Alumno ya existe en nuestra base de datos!'
                                    })
                                }

                              }, function myError(response) {
                                //$scope.planes=response.statusText;
                              });
                      
                  }else{
                      Swal.fire({
                      type: 'error',
                      title: 'Uups...',
                      text: 'Hubo un problema en el regitro del Alumno!'
                    })
                  }
                }, function myError(response) {
                  //$scope.planes=response.statusText;
                });
        }
        
    }
    $scope.Seleccion_plan=function(){
        console.log($scope.boleta.planes);
        if($scope.boleta.monto!=""){
            var p=$scope.boleta.planes;
            $scope.boleta.valor_cuota=Math.round($scope.boleta.monto/$scope.boleta.planes);
            console.log($scope.boleta.valor_cuota);
        }else{
            $scope.boleta.valor_cuota="0";
        }
    }
}]);