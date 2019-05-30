angular.module('App').controller('matriculasCtrl', ['$scope', '$rootScope','MyService','$location','$http', function ($scope, $rootScope,MyService,$location,$http) {
    $('html, body').animate({scrollTop:0}, 'slow');
    var usu=JSON.parse(localStorage.getItem("Usuario"));
    console.log(JSON.stringify(MyService.data.matriculas));
    $rootScope.Nombre_usu=usu.Nombre;
    $scope.nombre_alumno=MyService.data.name;
    $scope.rut_alumno=MyService.data.rut;
    $scope.id_usuario=MyService.data.matriculas.usuario_id;
    var url=location.href;
    var split = url.split('#');
    console.log(split[0]);
    $scope.ruta_actual=split[0];
    var hoy = new Date();
//    var dd = hoy.getDate();
//    var mm = hoy.getMonth()+1;
//    var yyyy = hoy.getFullYear();
//    
//    console.log(dd+"/"+mm+"/"+yyyy);

      let options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      };
      var fecha=hoy.toLocaleDateString('es-MX', options);
      fecha=fecha.replace("enero","Enero");
      fecha=fecha.replace("febero","Febrero");
      fecha=fecha.replace("marzo","Marzo");
      fecha=fecha.replace("abril","Abril");
      fecha=fecha.replace("mayo","Mayo");
      fecha=fecha.replace("junio","Junio");
      fecha=fecha.replace("julio","Julio");
      fecha=fecha.replace("agosto","agosto");
      fecha=fecha.replace("septiembre","Septiembre");
      fecha=fecha.replace("octubre","Octubre");
      fecha=fecha.replace("noviembre","Noviembre");
      fecha=fecha.replace("diciembre","Diciembre");
    
      $scope.fecha=fecha;
      console.log(fecha);
    var pdf = new jsPDF('p', 'pt', 'letter');
        source = $('#imprimir2')[0];

        specialElementHandlers = {
            '#bypassme': function (element, renderer) {
                return true
            }
        };
        margins = {
            top: 30,
            bottom: 60,
            left: 40,
            width: 522
        };

        pdf.fromHTML(
            source, 
            margins.left, // x coord
            margins.top, { // y coord
                'width': margins.width, 
                'elementHandlers': specialElementHandlers
            },

            function (dispose) {
                pdf.save('Compromiso_de_Pago.pdf');
            }, margins
        );
    
    var pdf2 = new jsPDF('p', 'pt', 'letter');
        source = $('#imprimir')[0];

        specialElementHandlers = {
            '#bypassme': function (element, renderer) {
                return true
            }
        };
        margins = {
            top: 30,
            bottom: 60,
            left: 40,
            width: 522
        };

        pdf2.fromHTML(
            source, 
            margins.left, // x coord
            margins.top, { // y coord
                'width': margins.width, 
                'elementHandlers': specialElementHandlers
            },

            function (dispose) {
                pdf2.text(35, 730, '                        _________________________        _________________________').setFontSize(9)
                pdf2.text(35, 749, '                                                     FIRMA/HUELLA                                          FIRMA COORDINADOR    ')
                pdf2.save('Matricula.pdf');
            }, margins
        );
    
//    $scope.form1 = function() {
//
//      if($scope.form1.$valid) {
//        console.log('Formulario Correcto'+$scope.form1.$valid);
//      }
//
//    };
    
    $scope.registrar=function(){
           var filename = $('#archivo').val();
            var filename2 = $('#archivo2').val();
        if(filename!="" && filename2!=""){
            var file=(filename.substring(filename.lastIndexOf("\\"))).toLowerCase();
            var file2=(filename2.substring(filename2.lastIndexOf("\\"))).toLowerCase();
            var split=file.split("\\");
            var split2=file2.split("\\");

            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = today.getFullYear();

            today = yyyy + '/' + mm + '/' + dd;
            //console.log("Genial "+fecha_hoy;
            var extencion=(split[1].substring(split[1].lastIndexOf("."))).toLowerCase();
            var extencion2=(split2[1].substring(split2[1].lastIndexOf("."))).toLowerCase();
            if(extencion==".pdf" || extencion==".PDF"){
                
               //{"curso":"Enf","semestres":"4","usuario_id":"44"} MyService.data.matriculas
                var x={ accion:"Crear_Matricula",
                        url:split[1],
                        url_compromiso:split2[1],
                        especialidad:MyService.data.matriculas.curso,
                        fecha:today,
                        semestre:MyService.data.matriculas.semestres,
                        estado:"Pre-Matricula",
                        usuario_id:MyService.data.matriculas.usuario_id};
                $http({
                    method : "GET",
                      url : "http://localhost/web_service_plataforma/Controllers/Matriculas/Registro.php?x="+JSON.stringify(x)
                      }).then(function mySuccess(response) {
                        if(response.data.Resultado!='ERROR'){//No Existe el RUT
                            //UIkit.notification(response.data.Resultado, {status:'success'})
                            //$location.url("/alumnos_matricula");
                             //document.form1.submit();
                        }

                      }, function myError(response) {
                        //$scope.planes=response.statusText;
                      });
            }else{
                Swal.fire({
                  type: 'warning',
                  title: 'Uups...',
                  text: 'El o los archivos seleccionados no cumplen con el formato (.PDF)'
                })
            }
        }else{
             Swal.fire({
              type: 'warning',
              title: 'Uups...',
              text: 'Debe seleccionar una matricula y un compromiso de pago!'
            })
        }
            
    }
    
//    $scope.data=  [{"agence":"CTM","secteur":"Safi","statutImp":"operationnel"}];
//     
//     $scope.export = function(){
//        html2canvas(document.getElementById('exportthis'), {
//            onrendered: function (canvas) {
//                var data = canvas.toDataURL();
//                var docDefinition = {
//                    content: [{
//                        image: data,
//                        width: 500,
//                    }]
//                };
//                pdfMake.createPdf(docDefinition).download("test.pdf");
//            }
//        });
//     }
}]);