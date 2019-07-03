angular.module('App').controller('matriculasCtrl', ['$scope', '$rootScope','MyService','$location','$http', function ($scope, $rootScope,MyService,$location,$http) {
    $('html, body').animate({scrollTop:0}, 'slow');
    var usu=JSON.parse(localStorage.getItem("Usuario"));
    $scope.valor_cuota=0;
    $scope.id_usuario=MyService.data.id_Usuario;
    console.log(JSON.stringify(MyService.data.matriculas));
    $rootScope.Nombre_usu=usu.Nombre;
    $scope.nombre_alumno=MyService.data.nombre;
    $scope.rut_alumno=MyService.data.rut;
    $scope.direccion_alumno=MyService.data.direccion;
    $scope.n_cuotas=MyService.data.n_cuotas;
    $scope.valor_curso=MyService.data.valor_curso;
    $scope.curso=MyService.data.curso;
    $scope.valor_cuota=MyService.data.valor_cuota;
    $scope.telefono=MyService.data.telefono;
    $scope.correo=MyService.data.correo;
    
    console.log(MyService.data);
    
$scope.fecha_latino=function(hoy){
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
    
      return fecha;
}

    if($scope.n_cuotas!=0){
          var fecha = new Date();
          var dias = 30; // Número de días a agregar
          var lista=[];
          //var n=2;
          var a=0;
          while(a<$scope.n_cuotas){
                //fecha.setDate(fecha.getDate() + dias);
                $scope.certificacion=fecha.setDate(fecha.getDate() + dias);
                var cuota=a+1;
                var l={fecha:$scope.fecha_latino(fecha),
                       valor_cuota:$scope.valor_cuota,
                       n_cuota:"Cuota "+cuota
                };
                lista.push(l);
                console.log("fecha ..."+$scope.fecha_latino(fecha));
                a++;
          }
          $scope.lista_fechas=lista;
          var largo=lista.length-1;
          var cer=new Date($scope.certificacion);
          cer.setDate(cer.getDate() + dias);
          $scope.certificacion=$scope.fecha_latino(cer);
          $scope.fecha_inicio=lista[0].fecha;
          $scope.fecha_final=lista[largo].fecha;
          console.log("c"+$scope.certificacion);
          console.log("h"+JSON.stringify(lista));
    }
    /*
    MyService.data.nombre=$scope.usuario.nombre;
    MyService.data.rut=$scope.usuario.rut;
    MyService.data.direccion=$scope.usuario.direccion;
    MyService.data.n_cuotas=$scope.boleta.planes;
    MyService.data.valor_curso=$scope.boleta.monto;
    MyService.data.curso=$scope.matricula.curso;
    MyService.data.valor_cuota=$scope.boleta.valor_cuota;
    MyService.data.telefono=$scope.usuario.telefono;
    MyService.data.correo=$scope.usuario.correo;
    */
    
    var url=location.href;
    var split = url.split('#');
    console.log(split[0]);
    $scope.ruta_actual=split[0];
//    var dd = hoy.getDate();
//    var mm = hoy.getMonth()+1;
//    var yyyy = hoy.getFullYear();
//    
//    console.log(dd+"/"+mm+"/"+yyyy);

    var hoy = new Date();
    $scope.fecha=$scope.fecha_latino(hoy);
    console.log($scope.fecha_latino(hoy));
      
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
                        estado:"Matricula",
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
    
    $scope.valor_cuota_letras=NumeroALetras($scope.valor_cuota);
}]);


document.getElementById("numero").addEventListener("keyup",function(e){
    document.getElementById("texto_en_palabras").innerHTML=NumeroALetras(this.value);
});
 
 
function Unidades(num){
 
  switch(num)
  {
    case 1: return "UN";
    case 2: return "DOS";
    case 3: return "TRES";
    case 4: return "CUATRO";
    case 5: return "CINCO";
    case 6: return "SEIS";
    case 7: return "SIETE";
    case 8: return "OCHO";
    case 9: return "NUEVE";
  }
 
  return "";
}
 
function Decenas(num){
 
  decena = Math.floor(num/10);
  unidad = num - (decena * 10);
 
  switch(decena)
  {
    case 1:
      switch(unidad)
      {
        case 0: return "DIEZ";
        case 1: return "ONCE";
        case 2: return "DOCE";
        case 3: return "TRECE";
        case 4: return "CATORCE";
        case 5: return "QUINCE";
        default: return "DIECI" + Unidades(unidad);
      }
    case 2:
      switch(unidad)
      {
        case 0: return "VEINTE";
        default: return "VEINTI" + Unidades(unidad);
      }
    case 3: return DecenasY("TREINTA", unidad);
    case 4: return DecenasY("CUARENTA", unidad);
    case 5: return DecenasY("CINCUENTA", unidad);
    case 6: return DecenasY("SESENTA", unidad);
    case 7: return DecenasY("SETENTA", unidad);
    case 8: return DecenasY("OCHENTA", unidad);
    case 9: return DecenasY("NOVENTA", unidad);
    case 0: return Unidades(unidad);
  }
}//Unidades()
 
function DecenasY(strSin, numUnidades){
  if (numUnidades > 0)
    return strSin + " Y " + Unidades(numUnidades)
 
  return strSin;
}//DecenasY()
 
function Centenas(num){
 
  centenas = Math.floor(num / 100);
  decenas = num - (centenas * 100);
 
  switch(centenas)
  {
    case 1:
      if (decenas > 0)
        return "CIENTO " + Decenas(decenas);
      return "CIEN";
    case 2: return "DOSCIENTOS " + Decenas(decenas);
    case 3: return "TRESCIENTOS " + Decenas(decenas);
    case 4: return "CUATROCIENTOS " + Decenas(decenas);
    case 5: return "QUINIENTOS " + Decenas(decenas);
    case 6: return "SEISCIENTOS " + Decenas(decenas);
    case 7: return "SETECIENTOS " + Decenas(decenas);
    case 8: return "OCHOCIENTOS " + Decenas(decenas);
    case 9: return "NOVECIENTOS " + Decenas(decenas);
  }
 
  return Decenas(decenas);
}//Centenas()
 
function Seccion(num, divisor, strSingular, strPlural){
  cientos = Math.floor(num / divisor)
  resto = num - (cientos * divisor)
 
  letras = "";
 
  if (cientos > 0)
    if (cientos > 1)
      letras = Centenas(cientos) + " " + strPlural;
    else
      letras = strSingular;
 
  if (resto > 0)
    letras += "";
 
  return letras;
}//Seccion()
 
function Miles(num){
  divisor = 1000;
  cientos = Math.floor(num / divisor)
  resto = num - (cientos * divisor)
 
  strMiles = Seccion(num, divisor, "MIL", "MIL");
  strCentenas = Centenas(resto);
 
  if(strMiles == "")
    return strCentenas;
 
  return strMiles + " " + strCentenas;
 
  //return Seccion(num, divisor, "UN MIL", "MIL") + " " + Centenas(resto);
}//Miles()
 
function Millones(num){
  divisor = 1000000;
  cientos = Math.floor(num / divisor)
  resto = num - (cientos * divisor)
 
  strMillones = Seccion(num, divisor, "UN MILLON", "MILLONES");
  strMiles = Miles(resto);
 
  if(strMillones == "")
    return strMiles;
 
  return strMillones + " " + strMiles;
 
  //return Seccion(num, divisor, "UN MILLON", "MILLONES") + " " + Miles(resto);
}//Millones()
 
function NumeroALetras(num,centavos){
  var data = {
    numero: num,
    enteros: Math.floor(num),
    centavos: (((Math.round(num * 100)) - (Math.floor(num) * 100))),
    letrasCentavos: "",
  };
  if(centavos == undefined || centavos==false) {
    data.letrasMonedaPlural="PESOS";
    data.letrasMonedaSingular="PESO";
  }else{
    data.letrasMonedaPlural="CENTIMOS";
    data.letrasMonedaSingular="CENTIMO";
  }
 
  if (data.centavos > 0)
    data.letrasCentavos = "CON " + NumeroALetras(data.centavos,true);
 
  if(data.enteros == 0)
    return "CERO " + data.letrasMonedaPlural + " " + data.letrasCentavos;
  if (data.enteros == 1)
    return Millones(data.enteros) + " " + data.letrasMonedaSingular + " " + data.letrasCentavos;
  else
    return Millones(data.enteros) + " " + data.letrasMonedaPlural + " " + data.letrasCentavos;
}//NumeroALetras()