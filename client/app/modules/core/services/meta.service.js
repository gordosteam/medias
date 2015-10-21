(function () {
  'use strict';
  angular
    .module('com.module.core')
    .service('MetaService', function ($injector, CoreService, Meta) {

      this.find = function () {
        return Meta.getModels().$promise;
      };

      this.findById = function (modelName) {
        return Meta.getModelById({
          name: modelName
        }).$promise;
      };

      this.getModelInstance = function (modelName) {
        return $injector.get(modelName);
      };

      this.getModelItems = function (modelName) {
        var Model = this.getModelInstance(modelName);
        if (typeof Model.find !== 'function') {
          return false;
        } else {
          return Model.find().$promise;
        }
      };

      this.getModelItem = function (modelName, modelId) {
        var Model = this.getModelInstance(modelName);
        if (typeof Model.find !== 'function') {
          return false;
        } else {
          return Model.findOne({
            filter: {
              where: {
                id: modelId
              }
            }
          }).$promise;
        }
      };

      this.getModelFields = function (model) {
        var result = [];
        angular.forEach(model.properties, function (property, propertyName) {
          if (propertyName !== 'id') {
            result.push(getModelField(propertyName, property));
          }
        });
        return result;
      };

      function getModelField(propertyName, property) {
        return {
          key: propertyName,
          type: getModelFieldType(property),
          templateOptions: {
            label: propertyName,
            required: property.required !== undefined ? property.required : false,
            description: property.description !== undefined ? property.description : false
          }
        };
      }

      function getModelFieldType(property) {
        var result = 'input';
        if (property.meta !== undefined && property.meta.formType !== undefined) {
          result = property.meta.formType;
        }
        return result;
      }

      this.upsert = function (modelName, item) {
        var Model = this.getModelInstance(modelName);
        return Model.upsert(item).$promise
          .then(function () {
            CoreService.toastSuccess(
              'Item salvo',
              'Seu Item está salvo!'
              );
          })
          .catch(function (err) {
            CoreService.toastError(
              'Erro salvando item',
              'Este item não pode ser salvo: ' + err
              );
          }
            );
      };

      this.delete = function (modelName, modelId, successCb, cancelCb) {
        var Model = this.getModelInstance(modelName);

        CoreService.confirm('Tem certeza?',
          'Deletando não terá como reverter',
          function () {
            Model.deleteById({ id: modelId }).$promise.then(function () {
              CoreService.toastSuccess(
                'Item deletado',
                'Seu Item foi deletado!');
              successCb();
            }).catch(function (err) {
              CoreService.toastError(
                'Oops',
                'Erro deletando item: ' + err);
              cancelCb();
            });
          },
          function () {
            cancelCb();
          }
          );
      };

    });

})();
