angular
  .module('app')
  .factory('AuthService', ['Usuario', '$q', '$rootScope', function(Usuario, $q,
      $rootScope) {
    function login(email, password) {
      return Usuario
        .login({email: email, password: password})
        .$promise
        .then(function(response) {
          $rootScope.currentUser = {
            id: response.user.id,
            tokenId: response.id,
            email: email
          };
        });
    }

    function logout() {
      return Usuario
       .logout()
       .$promise
       .then(function() {
         $rootScope.currentUser = null;
       });
    }

    function register(firstName, email, password) {
      return Usuario
        .create({
         firstName: firstName,  
         email: email,
         password: password
       })
       .$promise;
    }

    return {
      login: login,
      logout: logout,
      register: register
    };
  }]);
