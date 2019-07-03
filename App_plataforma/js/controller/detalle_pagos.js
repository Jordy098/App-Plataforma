angular.module('App').controller('detalle_pagosCtrl', ['$scope', '$rootScope','$http','MyService', function ($scope,$rootScope,$http,MyService) {
     console.log(MyService.data.id);
    
    var x={ accion:"Listar_Boletas"};
    $http({
        method : "GET",
          url : "http://localhost/web_service_plataforma/Controllers/Boletas/Listar_Boletas.php?x="+JSON.stringify(x)
          }).then(function mySuccess(response) {
            console.log("boletas"+JSON.stringify(response.data.boletas));
            $scope.Boletas=[];
            var boletas=response.data.boletas;
            for(i=0;boletas.length;i++){
                if(boletas[i].usuario_id==MyService.data.id){
                   var cuotas=Math.round(boletas[i].monto_total/boletas[i].valor_cuota);
                   boletas[i].cuotas=cuotas;
                   $scope.Boletas.push(boletas[i]);
                }
            }
        
            
            x={ accion:"Listar_Pagos",
             id:3};
            $http({
                method : "GET",
                  url : "http://localhost/web_service_plataforma/Controllers/Pagos/Listar_Pagos.php?x="+JSON.stringify(x)
                  }).then(function mySuccess(response) {
                    //console.log(JSON.stringify(response.data));
                    $scope.pagos_usuarios=response.data.pagos;
                    //$scope.Boletas=boletas;
                    console.log("pagos"+response.data.pagos);
                    var pagos=response.data.pagos;
                    var boletas=$scope.Boletas;
                    
                    
                  }, function myError(response) {
                    //$scope.Curso_usuarios=response.statusText;
                  });
             
            
          }, function myError(response) {
            //$scope.Usuarios_matricula=response.statusText;
          });
   
    x={ accion:"Listar_Pagos",
             id:3};
            $http({
                method : "GET",
                  url : "http://localhost/web_service_plataforma/Controllers/Pagos/Listar_Pagos.php?x="+JSON.stringify(x)
                  }).then(function mySuccess(response) {
                    //console.log(JSON.stringify(response.data));
                    $scope.pagos_usuarios=response.data.pagos;
                    //$scope.Boletas=boletas;
                    console.log("pagos"+JSON.stringify(response.data.pagos));
                    var pagos=response.data.pagos;
                    var boletas=$scope.Boletas;
                    
                    
                  }, function myError(response) {
                    //$scope.Curso_usuarios=response.statusText;
                  });
            
    
}]);