(function () {
  'use strict';
  angular
    .module('com.module.users')
    .service('UserService', function ($state, CoreService, User) {

      this.find = function () {
        return User.find().$promise;
      };

      this.findById = function (id) {
        return User.findById({
          id: id
        }).$promise;
      };

      this.upsert = function (user) {
        return User.upsert(user).$promise
          .then(function () {
            CoreService.toastSuccess(
              'User saved',
              'Your user is safe with us!'
            );
          })
          .catch(function (err) {
            CoreService.toastError(
              'Error saving user ',
              'This user could no be saved: ' + err
            );
          }
        );
      };

      this.delete = function (id, successCb, cancelCb) {
        CoreService.confirm(
          'Are you sure?',
          'Deleting this cannot be undone',
          function () {
            User.deleteById({id: id}, function () {
              CoreService.toastSuccess(
                'User deleted',
                'Your user is deleted!');
              successCb();
            }, function (err) {
              CoreService.toastError(
                'Error deleting user',
                'Your user is not deleted! ' + err);
              cancelCb();
            });
          },
          function () {
            cancelCb();
          }
        );
      };


      this.getFormFields = function (formType) {
        var form = [
          {
            key: 'username',
            type: 'input',
            templateOptions: {
              label: 'Username',
              required: true
            }
          },
          {
            key: 'email',
            type: 'input',
            templateOptions: {
              label: 'Email',
              required: true
            }
          },
          {
            key: 'firstName',
            type: 'input',
            templateOptions: {
              label: 'Last name',
              required: true
            }
          },
          {
            key: 'lastName',
            type: 'input',
            templateOptions: {
              label: 'Last name',
              required: true
            }
          }
        ];
        if (formType === 'add') {
          form.push({
            key: 'password',
            type: 'input',
            templateOptions: {
              label: 'Password',
              required: true
            }
          });
        }
        return form;
      };

    });

})();
