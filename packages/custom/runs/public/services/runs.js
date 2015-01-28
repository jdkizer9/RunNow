'use strict';

angular.module('mean.runs').factory('Runs', ['$resource',
  function($resource) {
    return $resource('runs/:runId', {
      runId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);
