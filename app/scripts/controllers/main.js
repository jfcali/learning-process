'use strict';

/**
 * @ngdoc function
 * @name frontNgApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the frontNgApp
 */
angular.module('frontNgApp')
  .controller('MainCtrl', Main);

Main.$inject = ['$scope', '$rootScope', '$http', '$q', '$interval'];

function Main($scope, $rootScope, $http, $q, $interval) {
	var vm = this;
  // ...
  $scope.init = function() {
  	console.log('init');
  	$scope.getIterations();
  	$scope.currentIteration = 0;
  	$scope.play = 'Play';
  	$scope.isPlaying = false;
  };

  $scope.getIterations = function() {
  	
  	$http.get('../../data/curet_02.json').then(function(res) {
  		$scope.iterations = res.data;
  		console.log($scope.iterations);
  	});
  };

  $scope.handleIterationChange = function() {
  	if($scope.currentIteration > $scope.iterations.length) {
  		$scope.currentIteration = $scope.iterations.length;
  	}
  };

  $scope.prevIteration = function() {
  	$scope.currentIteration--;
  	if($scope.currentIteration < 0) {
  		$scope.currentIteration = 0;
  	}
  };

  $scope.nextIteration = function() {
  	$scope.currentIteration++;
  	if($scope.currentIteration > $scope.iterations.length) {
  		$scope.currentIteration = $scope.iterations.length;
  	}
  };

  $scope.playIteration = function() {
  	$scope.isPlaying = !$scope.isPlaying;
  	if(!$scope.isPlaying) {
  		$scope.play = 'Play';
	    $scope.stopFight();
  	} else {
  		$scope.play = 'Pause';

		$scope.stop = $interval(function() {
			if ($scope.currentIteration < $scope.iterations.length) {
				$scope.nextIteration();
			} else {
			    $scope.stopFight();
			}
		}, 1000);
  	};


    $scope.stopFight = function() {
        $interval.cancel($scope.stop);
    };
  };
}


