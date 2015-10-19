(function () {
  'use strict';
  /**
   * @ngdoc function
   * @name com.module.users.controller:RegisterCtrl
   * @description Login Controller
   * @requires $scope
   * @requires $routeParams
   * @requires $location
   * Controller for Register Page
   **/
  angular
    .module('com.module.users')
    .controller('RegisterCtrl', function ($scope, $routeParams, $location, $filter, CoreService, User, AppAuth) {

      $scope.registration = {
        firstName: '',
        lastName: '',
        email: '',
        password: ''
      };

      $scope.schema = [{
        label: '',
        property: 'firstName',
        placeholder: 'First Name',
        type: 'text',
        attr: {
          ngMinlength: 4,
          required: true
        },
        msgs: {
          minlength: 
            'Needs to have at least 4 characters'
        }
      }, {
        label: '',
        property: 'lastName',
        placeholder: 'Last Name',
        type: 'text',
        attr: {
          ngMinlength: 4,
          required: true
        },
        msgs: {
          minlength: 
            'Needs to have at least 4 characters'
        }
      }, {
        label: '',
        property: 'email',
        placeholder: 'Email',
        type: 'email',
        help: 
          'Don\'t worry we won\'t spam your inbox',
        attr: {
          required: true,
          ngMinlength: 4
        },
        msgs: {
          required: 'You need an email address',
          email: 'Email address needs to be valid',
          valid: 'Nice email address!'
        }
      }, {
        type: 'multiple',
        fields: [{
          label: '',
          property: 'password',
          placeholder: 'Password',
          type: 'password',
          attr: {
            required: true,
            ngMinlength: 6
          }
        }, {
          label: '',
          property: 'confirmPassword',
          placeholder: 'Confirm Password',
          type: 'password',
          attr: {
            confirmPassword: 'user.password',
            required: true,
            ngMinlength: 6
          },
          msgs: {
            match: 
              'Your passwords need to match'
          }
        }],
        columns: 6
      }];

      $scope.options = {
        validation: {
          enabled: true,
          showMessages: false
        },
        layout: {
          type: 'basic',
          labelSize: 3,
          inputSize: 9
        }
      };

      $scope.confirmPassword = '';

      $scope.register = function () {

        $scope.registration.username = $scope.registration.email;
        delete $scope.registration.confirmPassword;
        $scope.user = User.save($scope.registration,
          function () {

            $scope.loginResult = User.login({
                include: 'user',
                rememberMe: true
              }, $scope.registration,
              function () {
                AppAuth.currentUser = $scope.loginResult.user;
                CoreService.toastSuccess('Registered', 
                  'You are registered!');
                $location.path('/');
              },
              function (res) {
                CoreService.toastWarning(
                  'Error signin in after registration!', res.data.error
                  .message);
                $scope.loginError = res.data.error;
              }
            );

          },
          function (res) {
            CoreService.toastError(
              'Error registering!', res.data.error.message);
            $scope.registerError = res.data.error;
          }
        );
      };
    })
    .directive('confirmPassword',
    function () {
      return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, element, attrs, ngModel) {
          var validate = function (viewValue) {
            var password = scope.$eval(attrs.confirmPassword);
            ngModel.$setValidity('match', ngModel.$isEmpty(viewValue) ||
              viewValue === password);
            return viewValue;
          };
          ngModel.$parsers.push(validate);
          scope.$watch(attrs.confirmPassword, function () {
            validate(ngModel.$viewValue);
          });
        }
      };
    }
  );

})();
