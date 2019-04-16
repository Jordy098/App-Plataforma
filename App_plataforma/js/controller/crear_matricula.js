angular.module('App').controller('crear_matriculaCtrl', ['$scope', '$rootScope','$http', function ($scope, $rootScope,$http) {
    $scope.usuario=[];
    $scope.usuario.rut="";
    $scope.usuario.nombre="";
    $scope.usuario.correo="";
    $scope.usuario.fecha_nacimiento="";
    $scope.usuario.ciudad="";
    $scope.usuario.telefono="";
    $scope.usuario.direccion="";
    $scope.matricula=[];
    $scope.matricula.curso="";
    $scope.matricula.semestres="";
    $scope.boleta=[];
    $scope.matricula.planes="";
    $scope.matricula.valor_cuota="0";
    $scope.matricula.monto="";
    $scope.matricula.primera_cuota_arancel="";
    $scope.matricula.ultima_cuota_arancel="";
    $scope.arancel="";
    
    var num = $scope.matricula.valor_cuota.replace(/\./g,'');
    if(!isNaN(num)){
        num = num.toString().split('').reverse().join('').replace(/(?=\d*\.?)(\d{3})/g,'$1.');
        num = num.split('').reverse().join('').replace(/^[\.]/,'');
        $scope.matricula.valor_cuota =num;
    }
    
    var x={ accion:"Listar_Planes"};
    $http({
        method : "GET",
          url : "http://localhost/web_service_plataforma/Controllers/Planes/Listar_Planes.php?x="+JSON.stringify(x)
          }).then(function mySuccess(response) {
            $scope.planes=response.data.planes;
            console.log($scope.matricula.planes);
          }, function myError(response) {
            $scope.planes=response.statusText;
          });
    
    $scope.Seleccion_plan=function(){
        console.log($scope.matricula.planes);
        if($scope.matricula.monto!=""){
            var p=$scope.matricula.planes;
            $scope.matricula.valor_cuota=Math.round($scope.matricula.monto/$scope.matricula.planes);
            console.log($scope.matricula.valor_cuota);
        }else{
            $scope.matricula.valor_cuota="0";
        }
    }
}]);