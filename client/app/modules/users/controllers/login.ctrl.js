(function () {
  'use strict';

  angular.module('com.module.users')

  .controller('LoginCtrl', ['$scope', 'LoginService', '$state', function($scope, LoginService, $state) {
    $scope.user = {
      email: 'foo@bar.com',
      password: 'foobar'
    };

    $scope.login = function() {
      LoginService.login($scope.user.email, $scope.user.password).then(function() {
        alert('OK');
        // $state.go('sign-up-success');
      });
    };
  }]);

})();
