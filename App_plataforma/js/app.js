var App = angular.module("App", [
    "ui.router",
    "oc.lazyLoad"
]);


App.run(function($rootScope) {
    var usu=JSON.parse(localStorage.getItem("Usuario"));
    if(usu!=null){
//        var x={ accion:"Listar_Alumnos"};
//        $.get("http://localhost/web_service_plataforma/Controllers/Usuarios/Listar_Alumnos.php?x="+JSON.stringify(x), function(data) {
//                $rootScope.Usuarios_matricula=data;
//        });
        
        $rootScope.Nombre_usu=usu.Nombre;
        //console.log("app run "+JSON.stringify(usu.Nombre));
    }
});

App.controller('AppController', ['$scope','$location', function($scope, $location) {
  console.log("bienvenido");
  $scope.seleccionar=function(menu){
      $scope.activacionU="";
      $scope.activacionP="";
      $scope.activacion0="";
      $scope.activacion="";
      $scope.activacion1="";
      $scope.activacion2="";
      $scope.activacion3="";
      $scope.activacion3_5="";
      $scope.activacion4="";
      $scope.activacion5="";
      $scope.activacion6="";
      if(menu=='Docentes'){
          $scope.activacion0="uk-active";
          $scope.activacionU="uk-active";
      }
      else if(menu=='Alumnos'){
          $scope.activacion="uk-active";
          $scope.activacionU="uk-active";
      }
      else if(menu=='Cursos'){
          $scope.activacion1="uk-active";
          $scope.activacionU="uk-active";
      }
      else if(menu=='Matriculas'){
          $scope.activacion2="uk-active";
      }
      else if(menu=='Boletas'){
          $scope.activacion3="uk-active";
      }
      else if(menu=='Remunereciones'){
          $scope.activacion3_5="uk-active";
      }
      else if(menu=='P_Alumnos'){
          $scope.activacionP="uk-active";
          $scope.activacion4="uk-active";
      }
      else if(menu=='P_Docentes'){
          $scope.activacionP="uk-active";
          $scope.activacion5="uk-active";
      }
      else if(menu=='Configuracion'){
          $scope.activacion6="uk-active";
      }
  }
  $scope.logout = function() { 
    localStorage.removeItem("Usuario");
    $location.path('/login');
  };
}]);


App.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        // Redirect any unmatched url
        $urlRouterProvider.otherwise("/");
        $stateProvider
                .state("login", {
                        url: "/",
                        templateUrl: "view/login.html",
                        controller: 'loginCtrl',
                        resolve: {
                        "class":function($location, $rootScope){
                            if(localStorage.getItem('Usuario')!=null){
                                $location.path('/inicio');
                            }else{
                                $location.path('/');
                            }
                        }
                    }
                        
                    })
                .state("registro", {
                        url: "/registro",
                        templateUrl: "view/registro.html",
                        controller: 'registroCtrl',
                        resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load({
                                    name: 'App',
                                    files: [
                                        'js/controller/registro.js',
                                        '//code.jquery.com/jquery-1.11.1.min.js'
                                    ]
                                });
                            }]
                    }
                        
                    })
                .state("Inicio", {
                        url: "/inicio",
                        templateUrl: "view/inicio.html",
                        controller: 'inicioCtrl',
                        resolve: { 
                            "check": function($location, $rootScope){
                                if(localStorage.getItem('Usuario')==null){
                                   $location.path('/');
                                }
                            }
                        }
                        
                    })
                //-----------------------------------------------------------------------Usuarios
                .state("Usuarios", {
                        url: "/usuarios",
                        templateUrl: "view/usuarios.html",
                        controller: 'usuariosCtrl',
                        resolve: { 
                            "check": function($location, $rootScope){
                                if(localStorage.getItem('Usuario')==null){
                                   $location.path('/');
                                }
                            }
                        }
                        
                    })
                .state("Alumnos", {
                        url: "/alumnos",
                        templateUrl: "view/alumnos.html",
                        controller: 'alumnosCtrl',
                        resolve: { 
                            "check": function($location, $rootScope){
                                if(localStorage.getItem('Usuario')==null){
                                   $location.path('/');
                                }
                            }
                        }
                        
                    })
                .state("Docentes", {
                        url: "/docentes",
                        templateUrl: "view/docentes.html",
                        controller: 'docentesCtrl',
                        resolve: { 
                            "check": function($location, $rootScope){
                                if(localStorage.getItem('Usuario')==null){
                                   $location.path('/');
                                }
                            }
                        }
                        
                    })
                .state("Alumnos_Matricula", {
                        url: "/alumnos_matricula",
                        templateUrl: "view/alumnos_matricula.html",
                        controller: 'alumnos_matriculaCtrl',
                        resolve: { 
                            "check": function($location, $rootScope){
                                if(localStorage.getItem('Usuario')==null){
                                   $location.path('/');
                                }
                            }
                        }
                        
                    })
                .state("Crear_Docente", {
                        url: "/crear_docente",
                        templateUrl: "view/crear_docente.html",
                        controller: 'crear_docenteCtrl',
                        resolve: { 
                            "check": function($location, $rootScope){
                                if(localStorage.getItem('Usuario')==null){
                                   $location.path('/');
                                }
                            }
                        }
                        
                    })
                .state("Configuracion", {
                        url: "/configuracion",
                        templateUrl: "view/configuracion.html",
                        controller: 'configuracionCtrl',
                        resolve: { 
                            "check": function($location, $rootScope){
                                if(localStorage.getItem('Usuario')==null){
                                   $location.path('/');
                                }
                            }
                        }
                        
                    })
                
                //---------------------------------------------------------------------------Matriculas
                .state("Crear-Matriculas", {
                        url: "/crear_matricula",
                        templateUrl: "view/crear_matricula.html",
                        controller: 'crear_matriculaCtrl',
                        resolve: { 
                            "check": function($location, $rootScope){
                                if(localStorage.getItem('Usuario')==null){
                                   $location.path('/');
                                }
                            }
                        }
                        
                    })
                .state("Matriculas", {
                        url: "/matriculas",
                        templateUrl: "view/matriculas.html",
                        controller: 'matriculasCtrl',
                        resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load({
                                    name: 'App',
                                    files: [
                                        'js/controller/matriculas.js',
                                        'https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js',
                                        'vendor/jspdf.js',
                                        'vendor/pdfFromHTML.js'
                                    ]
                                });
                            }]
                    }
                        
                    })
                //---------------------------------------------------------------------------Pagos
                .state("Pago-Alumno", {
                        url: "/pago_alumno",
                        templateUrl: "view/pago_alumno.html",
                        controller: 'pago_alumnoCtrl',
                        resolve: { 
                            "check": function($location, $rootScope){
                                if(localStorage.getItem('Usuario')==null){
                                   $location.path('/');
                                }
                            }
                        }
                        
                    })
                .state("Pago-Docente", {
                        url: "/pago_docente",
                        templateUrl: "view/pago_docente.html",
                        controller: 'pago_docenteCtrl',
                        resolve: { 
                            "check": function($location, $rootScope){
                                if(localStorage.getItem('Usuario')==null){
                                   $location.path('/');
                                }
                            }
                        }
                        
                    })
                //---------------------------------------------------------------------------Curso
                .state("Alumnos-Curso", {
                        url: "/alumnos_curso",
                        templateUrl: "view/alumnos_curso.html",
                        controller: 'alumnos_cursoCtrl',
                        resolve: { 
                            "check": function($location, $rootScope){
                                if(localStorage.getItem('Usuario')==null){
                                   $location.path('/');
                                }
                            }
                        }
                        
                    })
                .state("Asignar-Curso", {
                        url: "/asignar_curso",
                        templateUrl: "view/asignar_curso.html",
                        controller: 'asignar_cursoCtrl',
                        resolve: { 
                            "check": function($location, $rootScope){
                                if(localStorage.getItem('Usuario')==null){
                                   $location.path('/');
                                }
                            }
                        }
                        
                    })
                .state("Curso", {
                        url: "/cursos",
                        templateUrl: "view/cursos.html",
                        controller: 'cursosCtrl',
                        resolve: { 
                            "check": function($location, $rootScope){
                                if(localStorage.getItem('Usuario')==null){
                                   $location.path('/');
                                }
                            }
                        }
                        
                    })
                //---------------------------------------------------------------------------Boleta
                .state("Boletas", {
                        url: "/boletas",
                        templateUrl: "view/boletas.html",
                        controller: 'boletasCtrl',
                        resolve: { 
                            "check": function($location, $rootScope){
                                if(localStorage.getItem('Usuario')==null){
                                   $location.path('/');
                                }
                            }
                        }
                        
                    })
                .state("Crear_Boleta", {
                        url: "/crear_boleta",
                        templateUrl: "view/crear_boleta.html",
                        controller: 'crear_boletaCtrl',
                        resolve: { 
                            "check": function($location, $rootScope){
                                if(localStorage.getItem('Usuario')==null){
                                   $location.path('/');
                                }
                            }
                        }
                        
                    })
                //---------------------------------------------------------------------------Sede
                .state("Sedes", {
                        url: "/sedes",
                        templateUrl: "view/sedes.html",
                        controller: 'sedesCtrl',
                        resolve: { 
                            "check": function($location, $rootScope){
                                if(localStorage.getItem('Usuario')==null){
                                   $location.path('/');
                                }
                            }
                        }
                        
                    })
                //---------------------------------------------------------------------------Remuneraciones
                .state("Remuneraciones", {
                        url: "/remuneraciones",
                        templateUrl: "view/remuneraciones.html",
                        controller: 'remuneracionesCtrl',
                        resolve: { 
                            "check": function($location, $rootScope){
                                if(localStorage.getItem('Usuario')==null){
                                   $location.path('/');
                                }
                            }
                        }
                        
                    })

                
}]);
App.factory("MyService", function() {
  return {
    data: {}
  };
});