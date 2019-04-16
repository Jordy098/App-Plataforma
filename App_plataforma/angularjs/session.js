angular.module('AduanasApp')
        .service('session', ['localStorage', function (localStorage) {
                // Instantiate data when service
                // is loaded
                this._user = JSON.parse(localStorage.getItem('session.user'));
                //////console.log(this._user, "USER IS ADMIN?");
                this.getUser = function () {
                    return this._user;
                };

                this.setUser = function (user) {
                    this._user = user;
                    localStorage.setItem('session.user', JSON.stringify(user));
                    return this;
                };

                /**
                 * Destroy session
                 */
                this.destroy = function destroy() {
                    this.setUser(null);
                };

                this.isSysAdmin = function () {
                    var user = this.getUser();
                    if (user) {
                        ////console.log(user, "USER IS ADMIN?");
                        for (var i = 0; i < user.roles.length; i++) {
                            if (user.roles[i].codigo === 'admin') {
                                //console.log("Es administrador");
                                return true;
                            }

                        }
                    }
                    return false;
                };


                this.isConsultor = function () {
                    var user = this.getUser();
                    if (user) {
                        ////console.log(user, "USER IS ADMIN?");
                        for (var i = 0; i < user.roles.length; i++) {
                            if (user.roles[i].codigo === 'consultor') {
                                //console.log("Es consultor");
                                return true;
                            }

                        }
                    }
                    return false;
                };
                this.isPreFacturador = function () {
                    var user = this.getUser();
                    if (user) {
                        ////console.log(user, "USER IS ADMIN?");
                        for (var i = 0; i < user.roles.length; i++) {
                            if (user.roles[i].codigo === 'prefacturador') {
                                //console.log("Es prefacturador");
                                return true;
                            }
                        }
                    }
                    return false;
                };
                this.isFacturador = function () {
                    var user = this.getUser();
                    if (user) {
                        ////console.log(user, "USER IS ADMIN?");
                        for (var i = 0; i < user.roles.length; i++) {
                            if (user.roles[i].codigo === 'facturador') {
                                //console.log("Es facturador");
                                return true;
                            }
                        }
                    }
                    return false;
                };

                this.isGestorNacional = function () {
                    var user = this.getUser();
                    if (user) {
                        ////console.log(user, "USER IS ADMIN?");
                        for (var i = 0; i < user.roles.length; i++) {
                            if (user.roles[i].codigo === 'gestor_nacional') {
                                //console.log("es GN");
                                return true;
                            }
                        }
                    }
                    return false;
                };
                this.isAdminPrefactura = function () {
                    var user = this.getUser();
                    if (user) {
                        ////console.log(user, "USER IS ADMIN?");
                        for (var i = 0; i < user.roles.length; i++) {
                            if (user.roles[i].codigo === 'admin_prefactura') {
                                //console.log("es admin pf");
                                return true;

                            }
                        }
                    }
                    return false;
                };
                this.isAdminFactura = function () {
                    var user = this.getUser();
                    if (user) {
                        ////console.log(user, "USER IS ADMIN?");
                        for (var i = 0; i < user.roles.length; i++) {
                            if (user.roles[i].codigo === 'admin_factura') {
                                //console.log("es admin facutra");
                                return true;
                            }
                        }
                    }
                    return false;
                };

                this.hasPermission = function (permissionName) {
                    var user = this.getUser();
                    for (var i = 0; i < user.roles.length; i++) {
                        for (var j = 0; j < user.roles[i].permissions.length; j++) {
                            if (user.roles[i].permissions[j].name === permissionName)
                                return true;
                        }
                    }
                    return false;
                };

                this.navDocumentos = function () {
                    //console.log(this.isFacturador() || this.isConsultor() || this.isSysAdmin(), "nav doc")
                    return this.isFacturador() || this.isGestorNacional() || this.isConsultor() || this.isSysAdmin() || this.isAdminFactura() || this.isAdminPrefactura() || this.isPreFacturador();
                };

                this.navPreDocumentos = function () {
                    //console.log(this.isPreFacturador() || this.isConsultor() || this.isFacturador() || this.isSysAdmin(), "predocs")
                    return this.isPreFacturador() || this.isGestorNacional() || this.isConsultor() || this.isFacturador() || this.isSysAdmin() || this.isAdminPrefactura() || this.isAdminFactura();
                };


                this.navCrearPreDocumentos = function () {
                    //console.log(this.isPreFacturador() || this.isSysAdmin(), "crearpd");
                    return this.isPreFacturador() || this.isSysAdmin();
                };

                this.navSubastas = function () {
                    //console.log(this.isGestorNacional() || this.isFacturador() || this.isSysAdmin() || this.isPreFacturador() || this.isConsultor(), "sybasas");
                    return this.isGestorNacional() || this.isFacturador() || this.isSysAdmin() || this.isPreFacturador() || this.isConsultor() || this.isAdminPrefactura();

                };
                this.navCrearSubasta = function () {
                    //console.log(this.isFacturador() || this.isSysAdmin() || this.isConsultor(), "Crearsub");
                    //return this.isFacturador() || this.isGestorNacional() || this.isSysAdmin() || this.isConsultor();
                    return  this.isGestorNacional() || this.isSysAdmin();
                };
                this.navComprobantes = function () {
                    //console.log(this.isFacturador() || this.isSysAdmin() || this.isConsultor(), "compro");
                    return this.isFacturador() || this.isSysAdmin() || this.isConsultor();

                };
                this.navAdministracion = function () {
                    //console.log(this.isGestorNacional() || this.isSysAdmin() || this.isAdminPrefactura() || this.isAdminFactura(), "admin");
                    return this.isGestorNacional() || this.isSysAdmin() || this.isAdminPrefactura() || this.isAdminFactura();

                };

                this.navUsuarios = function () {

                    return this.isGestorNacional() || this.isSysAdmin() || this.isAdminPrefactura() || this.isAdminFactura();
                };

                this.navProductos = function () {

                    //return this.isSysAdmin() || this.isAdminPrefactura() || this.isAdminFactura();
                    return this.isSysAdmin() || this.isAdminPrefactura();
                };

                this.navAdjudicatarios = function () {

                    //return this.isSysAdmin() || this.isGestorNacional();
                    return this.isSysAdmin();
                };
                this.navAlmacenes = function () {

                    //return this.isAdminPrefactura() || this.isSysAdmin() || this.isAdminFactura();
                    return this.isAdminPrefactura() || this.isSysAdmin();
                };
                this.navRoles = function () {


                    return this.isSysAdmin();
                };

                this.navParametros = function () {


                    return this.isSysAdmin();
                };

                this.navCostos = function () {

                    return this.isGestorNacional() || this.isSysAdmin() || this.isPreFacturador() || this.isConsultor() || this.isAdminPrefactura();

                };

            }]);