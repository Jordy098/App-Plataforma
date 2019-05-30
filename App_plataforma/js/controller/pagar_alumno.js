angular.module('App').controller('pagar_alumnoCtrl', ['$scope', '$rootScope','$http', function ($scope, $rootScope,$http) {
    $scope.pago={};
    $scope.pago.accion="Registo_Pago";
    $scope.pago.boleta="";
    $scope.pago.valor_pago="";
    $scope.pago.detalle="Matricula";
    $scope.pago.fecha="";
    $scope.pago.tipo_pago="";
    $scope.pago.matricula="";
    
    x={ accion:"Listar_Boletas_Pendientes"};
    $http({
        method : "GET",
          url : "http://localhost/web_service_plataforma/Controllers/Boletas/Listar_Boletas.php?x="+JSON.stringify(x)
          }).then(function mySuccess(response) {
            console.log("boletas"+JSON.stringify(response.data));
            $scope.Boletas=response.data.boletas;
          }, function myError(response) {
            //$scope.Usuarios_matricula=response.statusText;
          });
    
    
    $scope.seleccion_boleta=function(){
            var boletas=$scope.Boletas;
            for(var i=0;i<boletas.length;i++){
                if(boletas[i].id==$scope.pago.boleta){
                   $scope.valor_boleta=boletas[i].monto_total;
                   //$scope.pago.matricula=boletas[i].usuario_id;
                   console.log(boletas[i].usuario_id);

                     x={ accion:"Existe",
                         id:boletas[i].usuario_id};
                    $http({
                        method : "GET",
                          url : "http://localhost/web_service_plataforma/Controllers/Matriculas/Existe.php?x="+JSON.stringify(x)
                          }).then(function mySuccess(response) {
                            //console.log("id_matricula :"+JSON.stringify(response.data));
                            $scope.pago.matricula=response.data.matricula.id;
                            //$scope.Boletas=response.data;
                          }, function myError(response) {
                            //$scope.Usuarios_matricula=response.statusText;
                          });

                }
            }
        
    }
    
    $scope.crearPago=function(){
        console.log($scope.trae_pagos($scope.pago.boleta));
        if($scope.pago.valor_pago==$scope.valor_boleta){//en el caso de que el monto de la boleta se cancele en su totalidad
             //console.log($scope.trae_pagos($scope.pago.boleta));
             var suma_pagos=$scope.trae_pagos($scope.pago.boleta);
             suma_pagos=parseInt(suma_pagos, 10);
             if(suma_pagos==0){//verifica que no tenga otro pago

                x=$scope.pago;
            $http({
                method : "GET",
                  url : "http://localhost/web_service_plataforma/Controllers/Pagos/Registro.php?x="+JSON.stringify(x)
                  }).then(function mySuccess(response) {
                    console.log(response);
                    //console.log("boletas"+JSON.stringify(response.data));
                    UIkit.notification(response.data.Resultado, {status:'success'})
                    Swal.fire({
                          type: 'success',
                          title: response.data.Resultado,
                          showConfirmButton: false,
                          timer: 1500
                    })
                    $scope.finalizar_boleta();
                    $scope.pago.boleta="";
                    $scope.pago.valor_pago="";
                    $scope.pago.detalle="";
                    $scope.pago.fecha="";
                    $scope.pago.tipo_pago="";
                    $scope.pago.matricula="";
                    //$scope.Boletas=response.data.boletas;
                  }, function myError(response) {
                    //$scope.Usuarios_matricula=response.statusText;
                  });
                 
             }else{//en el caso de que tenga mas pagos 
                  Swal.fire({
                      type: 'error',
                      title: 'Uuups...',
                      text: 'Hay un problema con este pago!'
                    })
             }
            console.log($scope.valor_boleta);
        }else{
             //console.log($scope.trae_pagos($scope.pago.boleta));
             var suma_pagos=$scope.trae_pagos($scope.pago.boleta);
             
            console.log("condicion 1");
             if(suma_pagos==0){//verifica que no tenga otro pago
                 
                   x=$scope.pago;
            $http({
                method : "GET",
                  url : "http://localhost/web_service_plataforma/Controllers/Pagos/Registro.php?x="+JSON.stringify(x)
                  }).then(function mySuccess(response) {
                    console.log(response);
                    //console.log("boletas"+JSON.stringify(response.data));
                    UIkit.notification(response.data.Resultado, {status:'success'})
                    Swal.fire({
                          type: 'success',
                          title: response.data.Resultado,
                          showConfirmButton: false,
                          timer: 1500
                        })
                    $scope.pago.boleta="";
                    $scope.pago.valor_pago="";
                    $scope.pago.detalle="";
                    $scope.pago.fecha="";
                    $scope.pago.tipo_pago="";
                    $scope.pago.matricula="";
                    //$scope.Boletas=response.data.boletas;
                  }, function myError(response) {
                    //$scope.Usuarios_matricula=response.statusText;
                  });
                 
             }else{//en el caso de que los tenga (se debe sumar mas la cantidad actual)
                 //                console.log($scope.pago);
                 console.log("condicion 2");
                 var suma_pagos=$scope.trae_pagos($scope.pago.boleta);
                 console.log("condicion suma = "+suma_pagos);
                 suma_pagos=parseInt(suma_pagos, 10);
                 suma_pagos=suma_pagos+$scope.pago.valor_pago;
                 if($scope.valor_boleta==suma_pagos){
                     console.log("condicion 3");
                       x=$scope.pago;
                $http({
                    method : "GET",
                      url : "http://localhost/web_service_plataforma/Controllers/Pagos/Registro.php?x="+JSON.stringify(x)
                      }).then(function mySuccess(response) {
                        console.log(response);
                        //console.log("boletas"+JSON.stringify(response.data));
                        UIkit.notification(response.data.Resultado, {status:'success'})
                         Swal.fire({
                          type: 'success',
                          title: response.data.Resultado,
                          showConfirmButton: false,
                          timer: 1500
                        })
                        $scope.finalizar_boleta();
                        $scope.pago.boleta="";
                        $scope.pago.valor_pago="";
                        $scope.pago.detalle="";
                        $scope.pago.fecha="";
                        $scope.pago.tipo_pago="";
                        $scope.pago.matricula="";
                        //$scope.Boletas=response.data.boletas;
                      }, function myError(response) {
                        //$scope.Usuarios_matricula=response.statusText;
                      });
                     
                 }else if($scope.valor_boleta>suma_pagos){
                     x=$scope.pago;
                $http({
                    method : "GET",
                      url : "http://localhost/web_service_plataforma/Controllers/Pagos/Registro.php?x="+JSON.stringify(x)
                      }).then(function mySuccess(response) {
                        console.log(response);
                        //console.log("boletas"+JSON.stringify(response.data));
                        UIkit.notification(response.data.Resultado, {status:'success'})
                        Swal.fire({
                          type: 'success',
                          title: response.data.Resultado,
                          showConfirmButton: false,
                          timer: 1500
                        })
                        $scope.pago.boleta="";
                        $scope.pago.valor_pago="";
                        $scope.pago.detalle="";
                        $scope.pago.fecha="";
                        $scope.pago.tipo_pago="";
                        $scope.pago.matricula="";
                        //$scope.Boletas=response.data.boletas;
                      }, function myError(response) {
                        //$scope.Usuarios_matricula=response.statusText;
                      });
                 }else{
                     Swal.fire({
                      type: 'warning',
                      title: 'Uuups...',
                      text: 'La suma de los pagos'+' ($'+suma_pagos+') '+'supera el valor total de la Boleta '+' ($'+$scope.valor_boleta+')'
                    })
                 }
             }
        }
        

    }
    x={ accion:"Listar_Pagos",
             id:3};
        $http({
            method : "GET",
              url : "http://localhost/web_service_plataforma/Controllers/Pagos/Listar_Pagos.php?x="+JSON.stringify(x)
              }).then(function mySuccess(response) {
                $scope.lista_pagos=response.data.pagos;
//                console.log(response.data.pagos);
//                $scope.pagos_usuarios=response.data;
//                return response.data;
              }, function myError(response) {
                //$scope.Curso_usuarios=response.statusText;
              });
    $scope.trae_pagos=function(id_boleta){
        //listar pagos
         var suma_pagos=0;
        var pagos=$scope.lista_pagos;
        for(var i=0;i<pagos.length;i++){
                    if(pagos[i].boleta_id==id_boleta){
                       var monto_pago=parseInt(pagos[i].monto, 10);
                       suma_pagos=suma_pagos+monto_pago;
                    }
                }
        return suma_pagos;
    }
    $scope.finalizar_boleta=function(){
        x={ accion:"Boleta_Finalizada_M",
            boleta:$scope.pago.boleta};
          $http({
              method : "GET",
                url : "http://localhost/web_service_plataforma/Controllers/Boletas/Boleta_Finalizada.php?x="+JSON.stringify(x)
                }).then(function mySuccess(response) {
                  console.log("Boleta_punto :"+JSON.stringify(response.data));
                  //$scope.pago.matricula=response.data.matricula.id;
                  //$scope.Boletas=response.data;
                }, function myError(response) {
                  //$scope.Usuarios_matricula=response.statusText;
                });
        if($scope.pago.matricula!=""){
           x={ accion:"Matricula_Finalizada",
            boleta:$scope.pago.boleta};
          $http({
              method : "GET",
                url : "http://localhost/web_service_plataforma/Controllers/Boletas/Boleta_Finalizada.php?x="+JSON.stringify(x)
                }).then(function mySuccess(response) {
                  console.log("Boleta_punto :"+JSON.stringify(response.data));
                  //$scope.pago.matricula=response.data.matricula.id;
                  //$scope.Boletas=response.data;
                }, function myError(response) {
                  //$scope.Usuarios_matricula=response.statusText;
                });
        }
    }
}]);