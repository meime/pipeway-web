'use strict';
angular.module('app').service('api', ['$http', api]);

var WWW_FORM_HEADER = {
    'Content-Type': 'application/x-www-form-urlencoded'
};

function api($http) {

    return {
        signIn: function(url, data) {
            return httpPost(url, data);
        },
        appCreate: function(data) {
            return httpPost('/pipeway/v1/app/create', data);
        },
        getServerList: function(data){

            return httpGet('/pipeway/v1/app/list/' + data.type + '?page=' + data.page + '&pageSize=' + data.pageSize);

        },
        createApi: function(data){
            return httpPost('/pipeway/v1/api/create', data);
        },
        getApiList: function(data){
            return httpGet('/pipeway/v1/api/list/' + data.appKey + '?page=' + data.page + '&pageSize=' + data.pageSize);
        },
        apiDetail: function(data){
            return httpGet('/pipeway/v1/api/' + data.id);
        },
        createHost: function(data){
            return httpPost('/pipeway/v1/host/create', data);
        },
        getHostList: function(data){
            return httpGet('/pipeway/v1/host/list/' + data.appKey + '?page=' + data.page + '&pageSize=' + data.pageSize);
        },
        hostDetail: function(data){
            return httpGet('/pipeway/v1/host/' + data.id);
        }
    };

    function httpGet(url) {
        return $http.get(url).then(function(r) {
            return r;
        });
    }
    function httpPost(url, data) {
        return $http.post(url, param(data), {
            headers: WWW_FORM_HEADER
        }).then(function(r) {
            return r.data;
        });
    }
}

function param(obj) {
    var str = [];
    for (var p in obj) {
        if (obj.hasOwnProperty(p)) {
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        }
    }
    return str.join("&");
}
