angular
        .module('App')
        .service('auth', ['$http', 'session', 'portalUtil', function ($http, session, portalUtil) {
                /**
                 * Check whether the user is logged in
                 * @returns boolean
                 */

                //localStorage.removeItem("session.user");
                if (session.getUser() == null)
                {
                    localStorage.removeItem("session.user");
                }

                this.isLoggedIn = function isLoggedIn() {
                    return session.getUser() !== null;
                };
                /**
                 * Log in
                 *
                 * @param credentials
                 * @returns {*|Promise}
                 */
                this.logIn = function (credentials) {
                    var api = portalUtil.getLoginApi();
                    return api.all('auth').all('login').post(credentials).then(function (response) {
                        var data = response.data;
                        var user = {
                            "id": data.usuarioId,
                            "nombre": data.nombre,
                            "username": data.username,
                            "apellido": data.apellido,
                            "email": data.correoElectronico,
                            "token": data.token,
                            "permisos": data.permisos, //??
                            "roles": data.roles,
                            "avatar": data.avatar,
                            "empresas": data.empresas,
                            "endSession" : data.tokenExpira
                        };
                        session.setUser(user);
                        return response;
                    }, function (error) {
                        return error;
                    });
                };
                /**
                 * Log out
                 *
                 * @returns {*|Promise}
                 */
                this.logOut = function () {
                    session.destroy();
                };
            }]);
