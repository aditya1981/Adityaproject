
angular.module('CommonModule').controller('DatabaseStorageController',['$scope', '$routeParams','DatabaseStorageService',
 function($scope, $routeParams,DatabaseStorageService){
    $scope.httpMethod = "";
    $scope.url = "";
    
    $scope.callStorageMethod = function(){
    	 DatabaseStorageService.callStorageMethod($scope.url,$scope.httpMethod,$scope.inputParam).then(function success(response) {
	    	$scope.response = response.data;
	    	console.log($scope.response);
        	$scope.responseText = $scope.response;
	    });
    }
}]);
angular.module('CommonModule').directive('jsonText', function() {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, element, attr, ngModel) {            
          function into(input) {
            console.log(JSON.parse(input));
            return JSON.parse(input);
          }
          function out(data) {
            return JSON.stringify(data);
          }
          ngModel.$parsers.push(into);
          ngModel.$formatters.push(out);
        }
    };
});
angular.module('CommonModule').factory('DatabaseStorageService',['$http','appconfig',function($http,appconfig){   
	 function callStorageMethod(url,methodType,inputParam) {
		
	 		/*console.log(url);
	 		console.log(inputParam);
	 		var obj = angular.toJson(inputParam);
	 		console.log(obj);*/
	 		console.log("Input JSON:- ");
	 		/*var obj1 = JSON.parse(inputParam);
	 		console.log(obj1);*/
			if(methodType=='get'){
				return $http.get(url, inputParam).then(handleSuccess, handleError('get error'));    
			}		
			if(methodType=='post'){
				var id = {"userid":"92097"};
				var obj = angular.toJson(inputParam);
				return $http.post(url,inputParam).then(handleSuccess, handleError('post error'));    
			}
			if(methodType=='put'){
				return $http.put(url, inputParam).then(handleSuccess, handleError('put error'));    
			}
			if(methodType=='delete'){
				return $http.delete(url, inputParam).then(handleSuccess, handleError('delete error'));    
			}
	 }
	 
	 function handleSuccess(data) {
	 	console.log("output JSON: ");
	 	console.log(data);
	     return data;
	 }

	 function handleError(error) {
	     return function () {
	         return { success: false, message: error };
	     };
	 }
	 var service = {};

	 service.callStorageMethod = callStorageMethod;
	 
	 return service;
	}]);

  