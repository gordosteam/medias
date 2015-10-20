(function () {
  'use strict';
  angular.module('com.module.users')
    .run(function ($rootScope ) {
      $rootScope.addMenu('Usuarios', 'app.users.list', 'fa-user');
    });

})();
