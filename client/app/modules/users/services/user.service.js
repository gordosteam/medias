(function () {
  'use strict';
  angular
    .module('com.module.users')
    .service('UserService', function ($state, CoreService, Usuario) {

      this.find = function () {
        return Usuario.find().$promise;
      };

      this.findById = function (id) {
        return Usuario.findById({
          id: id
        }).$promise;
      };

      this.upsert = function (user) {
        return Usuario.upsert(user).$promise
          .then(function () {
            CoreService.toastSuccess(
              'Usuário Salvo',
              'Usuário Salvo!'
            );
          })
          .catch(function (err) {
            CoreService.toastError(
              'Erro Salvando usuário',
              'Este usuário não pode ser salvo: ' + err
            );
          }
        );
      };

      this.delete = function (id, successCb, cancelCb) {
        CoreService.confirm(
          'Tem certeza?',
          'Não podera ser desfeito',
          function () {
            Usuario.deleteById({id: id}, function () {
              CoreService.toastSuccess(
                'Usuário deletado',
                'Seu usuário foi deletado!');
              successCb();
            }, function (err) {
              CoreService.toastError(
                'Erro deletando usuário',
                'Seu usuário não foi deletado! ' + err);
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
