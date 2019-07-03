var App = angular.module("App", [
    'ui.router',
    'ui.bootstrap',
    'angularUtils.directives.dirPagination',
    'oc.lazyLoad'
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

App.controller('AppController', ['$scope','$location','MyService', function($scope, $location,MyService) {
  console.log("bienvenido");
  $scope.u_editar=function(){
        $scope.seleccionar('Editar_Usuario');
        var usu=JSON.parse(localStorage.getItem("Usuario"));
        MyService.data.accion="mio";
        $location.path("editar_usuario");
    }
  $scope.seleccionar=function(menu){
      $scope.activacionU="";
      $scope.activacionP="";
      $scope.activacionB="";
      $scope.activacion0="";
      $scope.activacion="";
      $scope.activacion1="";
      $scope.activacion2="";
      $scope.activacion3="";
      $scope.activacion3b="";
      $scope.activacion3_5="";
      $scope.activacion4="";
      $scope.activacion5="";
      $scope.activacion5_5="";
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
          $scope.activacionB="uk-active";
      }
          else if(menu=='Otras_Boletas'){
          $scope.activacion3b="uk-active";
          $scope.activacionB="uk-active";
      }
      else if(menu=='Remunereciones'){
          $scope.activacion3_5="uk-active";
      }
      else if(menu=='P_Alumnos'){
          $scope.activacionP="uk-active";
          $scope.activacion4="uk-active";
      }
      else if(menu=='P_Otros'){
          $scope.activacionP="uk-active";
          $scope.activacion5="uk-active";
      }
      else if(menu=='Editar_Usuario'){
          $scope.activacion5_5="uk-active";
      }
      else if(menu=='Configuracion'){
          $scope.activacion6="uk-active";
      }
  }
  $scope.logout = function() { 
    localStorage.removeItem("Usuario");
    $location.path('login');
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
                .state("Crear-Usuario", {
                        url: "/crear_usuario",
                        templateUrl: "view/crear_usuario.html",
                        controller: 'crear_usuarioCtrl',
                        resolve: { 
                            "check": function($location, $rootScope){
                                if(localStorage.getItem('Usuario')==null){
                                   $location.path('/');
                                }
                            }
                        }
                        
                    })
                .state("Editar-Usuario", {
                        url: "/editar_usuario",
                        templateUrl: "view/editar_usuario.html",
                        controller: 'editar_usuarioCtrl',
                        resolve: { 
                            "check": function($location, $rootScope){
                                if(localStorage.getItem('Usuario')==null){
                                   $location.path('/');
                                }
                            }
                        }
                        
                    })
                .state("Editar-Usuarios", {//Este editar comparte la vista de Editar usuario, lo que cambia es el controlador y la ruta
                        url: "/editar_usuarios",
                        templateUrl: "view/editar_usuario.html",
                        controller: 'editar_usuariosCtrl',
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
                .state("Alumnos-Matricula", {
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
                .state("Editar-Alumno", {
                        url: "/editar_alumno",
                        templateUrl: "view/editar_alumno.html",
                        controller: 'editar_alumnoCtrl',
                        resolve: { 
                            "check": function($location, $rootScope){
                                if(localStorage.getItem('Usuario')==null){
                                   $location.path('/');
                                }
                            }
                        }
                        
                    })
                .state("Detalle-Pagos", {
                        url: "/detalle_pagos",
                        templateUrl: "view/detalle_pagos.html",
                        controller: 'detalle_pagosCtrl',
                        resolve: { 
                            "check": function($location, $rootScope){
                                if(localStorage.getItem('Usuario')==null){
                                   $location.path('/');
                                }
                            }
                        }
                        
                    })
                .state("Eliminar-Alumno", {
                        url: "/eliminar_alumno",
                        templateUrl: "view/eliminar_alumno.html",
                        controller: 'eliminar_alumnoCtrl',
                        resolve: { 
                            "check": function($location, $rootScope){
                                if(localStorage.getItem('Usuario')==null){
                                   $location.path('/');
                                }
                            }
                        }
                        
                    })
                .state("Crear-Docente", {
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
                .state("Editar-Docente", {
                        url: "/editar_docente",
                        templateUrl: "view/editar_docente.html",
                        controller: 'editar_docenteCtrl',
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
                            "check": function($location, $rootScope){
                                if(localStorage.getItem('Usuario')==null){
                                   $location.path('/');
                                }
                            }
                        }
                        
                    })
                //---------------------------------------------------------------------------Pagos
                .state("Pago-Alumno", {//lista de pagos de matriculas
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
                .state("Pagar-Alumno", {//pagar matricula
                        url: "/pagar_alumno",
                        templateUrl: "view/pagar_alumno.html",
                        controller: 'pagar_alumnoCtrl',
                        resolve: { 
                            "check": function($location, $rootScope){
                                if(localStorage.getItem('Usuario')==null){
                                   $location.path('/');
                                }
                            }
                        }
                        
                    })
                .state("Otros-pagos", {
                        url: "/otros_pagos",
                        templateUrl: "view/otros_pagos.html",
                        controller: 'otros_pagosCtrl',
                        resolve: { 
                            "check": function($location, $rootScope){
                                if(localStorage.getItem('Usuario')==null){
                                   $location.path('/');
                                }
                            }
                        }
                        
                    })
                .state("Pagar-Otros", {
                        url: "/pagar_otros",
                        templateUrl: "view/pagar_otros.html",
                        controller: 'pagar_otrosCtrl',
                        resolve: { 
                            "check": function($location, $rootScope){
                                if(localStorage.getItem('Usuario')==null){
                                   $location.path('/');
                                }
                            }
                        }
                        
                    })
//                .state("Pago-Docente", {
//                        url: "/pago_docente",
//                        templateUrl: "view/pago_docente.html",
//                        controller: 'pago_docenteCtrl',
//                        resolve: { 
//                            "check": function($location, $rootScope){
//                                if(localStorage.getItem('Usuario')==null){
//                                   $location.path('/');
//                                }
//                            }
//                        }
//                        
//                    })
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
                .state("Crear-Curso", {
                        url: "/crear_curso",
                        templateUrl: "view/crear_curso.html",
                        controller: 'crear_cursoCtrl',
                        resolve: { 
                            "check": function($location, $rootScope){
                                if(localStorage.getItem('Usuario')==null){
                                   $location.path('/');
                                }
                            }
                        }
                        
                    })
                .state("Editar-Curso", {
                        url: "/editar_curso",
                        templateUrl: "view/editar_curso.html",
                        controller: 'editar_cursoCtrl',
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
                .state("Otras-Boletas", {
                        url: "/otras_boletas",
                        templateUrl: "view/otras_boletas.html",
                        controller: 'otras_boletasCtrl',
                        resolve: { 
                            "check": function($location, $rootScope){
                                if(localStorage.getItem('Usuario')==null){
                                   $location.path('/');
                                }
                            }
                        }
                        
                    })
                .state("Crear-Boleta", {
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
//                .state("Crear-Otra-Boleta", {
//                        url: "/crear_otra_boleta",
//                        templateUrl: "view/crear_otra_boleta.html",
//                        controller: 'crear_otra_boletaCtrl',
//                        resolve: { 
//                            "check": function($location, $rootScope){
//                                if(localStorage.getItem('Usuario')==null){
//                                   $location.path('/');
//                                }
//                            }
//                        }
//                        
//                    })
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
                .state("Crear-Sede", {
                        url: "/crear_sede",
                        templateUrl: "view/crear_sede.html",
                        controller: 'crear_sedeCtrl',
                        resolve: { 
                            "check": function($location, $rootScope){
                                if(localStorage.getItem('Usuario')==null){
                                   $location.path('/');
                                }
                            }
                        }
                        
                    })
                .state("Editar-Sede", {
                        url: "/editar_sede",
                        templateUrl: "view/editar_sede.html",
                        controller: 'editar_sedeCtrl',
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
                .state("Crear-Remuneraciones", {
                        url: "/crear_remuneraciones",
                        templateUrl: "view/crear_remuneraciones.html",
                        controller: 'crear_remuneracionesCtrl',
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