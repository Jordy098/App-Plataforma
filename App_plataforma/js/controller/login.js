angular.module('App').controller('loginCtrl', ['$scope', '$rootScope', function ($scope, $rootScope) {
    $scope.mensaje="wena1";
    $scope.nombre_usuario="";
    $scope.clave_usuario="";
    
//    $scope.login=function(){
//        //alert("usuario="+$scope.nombre_usuario+" clave="+$scope.clave_usuario);
//        if($scope.nombre_usuario=="a@a.cl" && $scope.clave_usuario=="admin"){
//            window.location="#/inicio";
//        }
//    };
    $scope.login=function(){
        if($scope.nombre_usuario=="" || $scope.clave_usuario==""){
           UIkit.notification("Debe llenar todos los campos", {status:'warning'})
        }else
        var session={
                Correo:$scope.nombre_usuario,
                Nickname:null,
                Clave:$scope.clave_usuario
        };
        $.get("http://localhost/web_service_plataforma/Controllers/Usuarios/Login.php?x="+JSON.stringify(session), function(data) {
            session={};
            if(data.nombre!=null){
               $rootScope.loggedIn=true;
               $rootScope.usu_nombre=data.nombre;
               session.Nombre=data.nombre;
               session.Rol=data.rol;
               session.Id=data.id;
               console.log(JSON.stringify(session));
               localStorage.setItem('Usuario', JSON.stringify(session));
               location.href ="#/inicio";
               //$location.path('/');
            }else{
                console.log(data.Resultado);
                UIkit.notification(data.Resultado, {status:'warning'})
            }
            console.log(data);
        });
        
    }

}]);
