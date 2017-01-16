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
  // ...
  $scope.init = function() {
  	console.log('init');
  	$scope.iterations;
    $scope.getIterations();
  	$scope.currentIteration = 0;
  	$scope.play = 'Play';
  	$scope.isPlaying = false;
    $scope.speed = 2;
    $scope.editMode = false;
  };

  $scope.getIterations = function() {  	
  	$http.get('../../data/curet_02.json').then(function(res) {
  		$scope.iterations = res.data;
  		console.log($scope.iterations.length);
  	});
  };

  $scope.handleIterationChange = function() {
  	if($scope.currentIteration > $scope.iterations.length-1 || !$scope.currentIteration) {
  		$scope.currentIteration = $scope.iterations.length-1;
  	}
    //TODO: SHOW A MESSAGE WHEN LIMIT IS EXCEEDED I.E: THERE ARE ONLY 99 ITERATIONS!
    $scope.editMode = !$scope.editMode;
  };

  $scope.prevIteration = function() {
  	$scope.currentIteration--;
  	if($scope.currentIteration < 0) {
  		$scope.currentIteration = 0;
  	}
  };

  $scope.nextIteration = function() {
  	$scope.currentIteration++;
  	if($scope.currentIteration > $scope.iterations.length-1) {
  		$scope.currentIteration = $scope.iterations.length-1;
  	}
  };

  $scope.mapValueBetween = function(value, minRange1, maxRange1, minRange2, maxRange2) {
    return minRange2 + (maxRange2 - minRange2) * (value - minRange1) / (maxRange1 - minRange1);
  }

  $scope.dirtyMap = function(value) {
    if(value === 1) {
      return 2000;
    } 
    if(value === 2) {
      return 1000;
    } 
    if(value === 3) {
      return 500;
    } 
    if(value === 4) {
      return 250;
    } 
  }

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
  		}, $scope.dirtyMap($scope.speed));
      console.log($scope.dirtyMap($scope.speed));
  	};


    $scope.stopFight = function() {
        $interval.cancel($scope.stop);
    };

    $scope.updateSpeed = function() {
      //$scope.playIteration();
      if($scope.isPlaying) {
        $interval.cancel($scope.stop);
        $scope.stop = $interval(function() {
          if ($scope.currentIteration < $scope.iterations.length) {
            $scope.nextIteration();
          } else {
              $scope.stopFight();
          }
        }, $scope.dirtyMap($scope.speed));
        console.log($scope.dirtyMap($scope.speed));
      }

    }
  };
}


