angular.module('app', [
  'ui.router',
  'ui.bootstrap',
  'lbServices',
  'oitozero.ngSweetAlert',
  'com.module.users'
])
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('forbidden', {
      url: '/forbidden',
      templateUrl: 'views/forbidden.html',
    })
    .state('login', {
      url: '/login',
      templateUrl: 'modules/users/views/login.html',
      controller: 'LoginCtrl'
    })
    /*.state('login', {
      url: '/login',
      templateUrl: 'views/login.html',
      controller: 'AuthLoginController'
    })*/
    .state('logout', {
      url: '/logout',
      controller: 'AuthLogoutController'
    })
    .state('sign-up', {
      url: '/sign-up',
      templateUrl: 'views/sign-up-form.html',
      controller: 'SignUpController',
    })
    .state('sign-up-success', {
      url: '/sign-up/success',
      templateUrl: 'views/sign-up-success.html'
    });

    $urlRouterProvider.otherwise('login');
}])
.run(['$rootScope', '$state', function($rootScope, $state) {

  $rootScope.$on('$stateChangeStart', function(event, next) {

    // redirect to login page if not logged in
    if (next.authenticate && !$rootScope.currentUser) {
      event.preventDefault(); //prevent current page from loading
      $state.go('forbidden');
    }
  });

}]);
