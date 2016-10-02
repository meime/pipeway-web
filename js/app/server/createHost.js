app.controller('createHostCtrl', ['$scope', '$http', '$state', '$location', '$modal', 'isLogin', 'user', '$cookies', 'api',
    function ($scope, $http, $state, $location, $modal, isLogin, user, $cookies, api) {
        var url = $location.url();
        var path = url.split('/');
        console.log(url);
        var appKey = path[3];
        console.log(appKey);
        $scope.appKey = appKey;
        $scope.params = {
            parentAppkey: appKey
        }
        $scope.createHost = function (params){
          console.log(params);
            api.createHost(params).then(function (res){
              console.log(res);
              $scope.items = res;
              if (res.success) {
                  addSuccess()
                  // $location.path('/server/server/appList/'+appKey);
              }
            })
        };
        function addSuccess(size) {
            var modalInstance = $modal.open({
                templateUrl: 'myModalContentSuccess.html',
                controller: 'ModalInstanceCtrl',
                size: size,
                resolve: {
                    items: function () {
                        return $scope.items;
                    }
                }
            });
            modalInstance.result.then(function (selectedItem) {
                $scope.selected = selectedItem;
                $location.path('/server/createApi/' + $scope.appKey);
            }, function () {
                $location.path('/server/appList/'+appKey);
            });
        }
}]);
