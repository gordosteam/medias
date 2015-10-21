(function () {
  'use strict';

  angular
    .module('com.module.core')
    .factory('FormHelper', function ($state, CoreService) {

      return function (model) {

        console.log('This is the model', model);

        this.model = model;

        /**
         * @param {string} id: id of the item that is to be deleted.
         *
         * @description
         * Initiates a delete action. Prompts the user form confirmation
         * before actioning the delete.
         */
        this.delete = function (id) {

          CoreService.confirm('Tem certeza?',
            'Deletando não terá como reverter',
            function () {
              this.model.deleteById(id, function () {
                CoreService.toastSuccess(
                  'Item deletado', 
                  'Seu Item foi deletado!');
                $state.reload();
              }, function (err) {
                CoreService.toastError(
                  'Oops', 
                    'Erro deletando item: ' + err);
              });
            },
            function () {
              return false;
            });

        };

        /**
         * @param {string} id: name of state to transition to
         *
         * @description
         * Cancel a form action. Sends the user back to the previous page they
         * were on
         */
        this.cancel = function (defaultState) {
          $state.go(defaultState);
        };

      };

    });

})();
