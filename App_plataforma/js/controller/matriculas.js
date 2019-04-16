angular.module('App').controller('matriculasCtrl', ['$scope', '$rootScope','MyService','$location', function ($scope, $rootScope,MyService,$location) {
    var usu=JSON.parse(localStorage.getItem("Usuario"));
    $rootScope.Nombre_usu=usu.Nombre;
    $scope.nombre_alumno=MyService.data.name;
    $scope.rut_alumno=MyService.data.rut;
    
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
     $scope.pdf=function(){
         var pdf = new jsPDF('p', 'pt', 'letter');
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

        pdf.fromHTML(
            source, 
            margins.left, // x coord
            margins.top, { // y coord
                'width': margins.width, 
                'elementHandlers': specialElementHandlers
            },

            function (dispose) {
                pdf.save('Prueba.pdf');
            }, margins
        );
     }
}]);