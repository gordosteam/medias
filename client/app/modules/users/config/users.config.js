(function () {
  'use strict';
  angular.module('com.module.users')
    .run(function ($rootScope ) {
      $rootScope.addMenu('Users', 'app.users.list', 'fa-user');
    });

})();
