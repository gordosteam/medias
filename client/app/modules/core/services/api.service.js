(function () {
  'use strict';
  angular
    .module('com.module.core')
    .service('ApiService', function ($q, $http, ENV) {

      this.checkConnection = function () {
        return $q(function (resolve, reject) {
          $http.get(ENV.apiUrl + '/cidades')
            .success(resolve)
            .error(reject);
        });
      };

    });

})();
