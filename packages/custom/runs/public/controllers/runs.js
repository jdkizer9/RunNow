'use strict';

angular.module('mean.runs').controller('RunsController', ['$scope', '$stateParams', '$location', 'Global', 'Runs',
  function($scope, $stateParams, $location, Global, Runs) {
    $scope.global = Global;
    // Complying to
    var vm = this;
    // $scope.package = {
    //   name: 'runs'
    // };

    $scope.hasAuthorization = function(run) {
      if (!run || !run.user) return false;
      return $scope.global.isAdmin || run.user._id === $scope.global.user._id;
    };

    $scope.create = function(isValid) {
      if (isValid) {
        var run = new Runs({
          title: this.title,
          content: this.content
        });
        run.$save(function(response) {
          $location.path('runs/' + response._id);
        });

        this.title = '';
        this.content = '';
      } else {
        $scope.submitted = true;
      }
    };

    $scope.remove = function(run) {
      if (run) {

        console.log(run);
        console.log(run.$remove);
        run.$remove(function(response) {
          for (var i in $scope.runs) {
            if ($scope.runs[i] === run) {
	      $scope.runs.splice(i,1);
	      //vm.articles = $scope.articles;
            }
          }
          $location.path('runs');
        });
      } else {
        $scope.run.$remove(function(response) {
          $location.path('runs');
        });
      }
    };

    $scope.update = function(isValid) {
      if (isValid) {
        var run = $scope.run;//vm.article;
        if(!run.updated) {
          run.updated = [];
	}
        run.updated.push(new Date().getTime());

        run.$update(function() {
          $location.path('runs/' + run._id);
        });
      } else {
        $scope.submitted = true;
      }
    };

    $scope.find = function() {
      //assert(0);
      console.log('Querrying Runs');
      Runs.query(function(runs) {
        //$scope.articles = articles;
        vm.runs = runs;
        console.log(runs);
      });
    };

    $scope.findOne = function() {
      Runs.get({
        runId: $stateParams.runId
      }, function(run) {
        vm.run = run;
      });
    };


  }


]);
