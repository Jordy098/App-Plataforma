angular.module('App').controller('crear_boletaCtrl', ['$scope', '$rootScope','$http', function ($scope, $rootScope,$http) {
    $scope.boleta={};
    $scope.boleta.numero="";
    $scope.boleta.valor_cuota="";
    $scope.boleta.monto="";
    $scope.boleta.estado="";
    $scope.boleta.fecha_inicio="";
    $scope.boleta.fecha_termino="";
    
    
    $scope.crearBoleta=function(){
        //alert(JSON.stringify($scope.usuario));
        //var string=$scope.usuario.fecha_n.toString();
        let fecha_i = new Date().toISOString().substr(0, 10);
        document.querySelector("#fecha_i").value = fecha_i;
        let fecha_f = new Date().toISOString().substr(0, 10);
        document.querySelector("#fecha_f").value = fecha_f;
        //alert(fecha);
        x={ accion:"Registo_Boleta",
          n_boleta:$scope.boleta.numero,
          n_cuotas:1,
          valor_cuota:$scope.boleta.valor_cuota,
          monto_total:$scope.boleta.monto,
          estado:$scope.boleta.estado,
          fecha_inicio:fecha_i,
          fecha_fin:fecha_f,
          usuario_id:null};
          /*accion:"Registo_Boleta",
          n_boleta:"1321",
          n_cuotas:$scope.boleta.planes,
          valor_cuota:$scope.boleta.valor_cuota,
          monto_total:$scope.boleta.monto,
          estado:"Proceso",
          fecha_inicio:$scope.boleta.primera_cuota,
          fecha_fin:$scope.boleta.ultima_cuota,
          usuario_id:$scope.matricula.usuario_id*/
        console.log(JSON.stringify(x));
    $http({
        method : "GET",
          url : "http://localhost/web_service_plataforma/Controllers/Boletas/Registro_Boleta.php?x="+JSON.stringify(x)
          }).then(function mySuccess(response) {
          //console.log(JSON.stringify(response.));
          //alert(response.data.Resultado);
             UIkit.notification(response.data.Resultado, {status:'success'})
            //$scope.Usuarios=response.data.usuarios;
          }, function myError(response) {
            //$scope.Usuarios_matricula=response.statusText;
          });
    }
    
}]);