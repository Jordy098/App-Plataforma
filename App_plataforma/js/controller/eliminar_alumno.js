angular.module('App').controller('eliminar_alumnoCtrl', ['$scope', '$rootScope','$http', 'MyService', function ($scope, $rootScope,$http,MyService) {
    console.log("WOOW "+MyService.data.usuarios);
    //MyService.data.id=usuarios[i].id;
           
    $scope.usuario={};
    $scope.usuario.rut=MyService.data.rut;
    $scope.usuario.nombre=MyService.data.nombre;
    $scope.usuario.correo=MyService.data.correo;
    var f = new Date(MyService.data.fecha);
    var dd = f.getDate()+1;
    var mm = f.getMonth()+1;
    var yyyy = f.getFullYear();
    
    f=dd+"/"+mm+"/"+yyyy;
    $scope.usuario.fecha_n=f;
    console.log(MyService.data.fecha);
    $scope.usuario.ciudad=MyService.data.ciudad;
    $scope.usuario.telefono=MyService.data.telefono;
    $scope.usuario.direccion=MyService.data.direccion;
}]);