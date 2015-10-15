(function () {
  'use strict';

  angular.module('com.module.users')

  .factory('LoginService', ['Usuario', '$q', '$rootScope', function(Usuario, $q, $rootScope) {

    function login(email, password) {
      return Usuario.login({
        email: email,
        password: password
      }).$promise.then(function(response) {
        $rootScope.currentUser = {
          id: response.user.id,
          tokenId: response.id,
          email: email
        };
      });
    }

    return {
      login: login
    };

  }]);

})();
