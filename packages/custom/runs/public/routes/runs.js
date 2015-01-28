'use strict';

angular.module('mean.runs').config(['$stateProvider',
  function($stateProvider) {

  	// Check if the user is connected
    var checkLoggedin = function($q, $timeout, $http, $location) {
      // Initialize a new promise
      var deferred = $q.defer();

      // Make an AJAX call to check if the user is logged in
      $http.get('/loggedin').success(function(user) {
        // Authenticated
        if (user !== '0') $timeout(deferred.resolve);

        // Not Authenticated
        else {
          $timeout(deferred.reject);
          $location.url('/login');
        }
      });

      return deferred.promise;
    };
    
    // $stateProvider.state('runs example page', {
    //   url: '/runs/example',
    //   templateUrl: 'runs/views/index.html'
    // });

    // states for my app
    $stateProvider
      .state('all runs', {
        url: '/runs',
        templateUrl: 'runs/views/list.html',
        resolve: {
          //loggedin: checkLoggedin
        }
      })
      .state('create run', {
        url: '/runs/create',
        templateUrl: 'runs/views/create.html',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .state('edit run', {
        url: '/runs/:runId/edit',
        templateUrl: 'runs/views/edit.html',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .state('view run', {
        url: '/runs/:runId',
        templateUrl: 'runs/views/view.html',
        resolve: {
          loggedin: checkLoggedin
        }
      });
  }
]);
