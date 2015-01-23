var myApp = angular.module('myApp', []);

myApp.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            console.log(angular.element(element));
            console.log(element);
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;
            //console.log(model.assign);
            element.bind('change', function () {
                scope.$apply(function () {
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);

myApp.service('fileUpload', ['$http', function ($http) {
    this.uploadFileToUrl = function (file, uploadUrl) {
        var fd = new FormData();
        fd.append('file', file);
        $http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
            .success(function () {
            })
            .error(function () {
            });
    }
}]);

myApp.controller('myCtrl', ['$scope', 'fileUpload', function ($scope, fileUpload) {

    $scope.uploadFile = function () {
        console.log($scope.myFile);
        var file = $scope.myFile;
        console.log('file is ' + JSON.stringify(file));
        var uploadUrl = "/fileUpload";
        fileUpload.uploadFileToUrl(file, uploadUrl);
    };

}]);
