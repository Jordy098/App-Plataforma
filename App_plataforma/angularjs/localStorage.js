angular
.module('App')
.factory('localStorage', ['$window', function ($window) {
    if($window.localStorage){
      return $window.localStorage;
    }
    throw new Error('Local storage support is needed');
}]);
