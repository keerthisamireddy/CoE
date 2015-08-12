'use strict';

angular.module('excelApp')
    .controller('AllCtrl', function ($scope, $http) {
        $('.multiple-items').slick({
            infinite: true,
            slidesToShow: 3,
            slidesToScroll: 3
        });
        $http.get('/api/things').success(function (data) {
            var qaArray = [],mobileArray = [],webArray = [],uiuxArray = [],cloudArray = [],unknownArray = [];
            function uniqueBy(arr, fn) {
                var unique = {};
                var distinct = [];
                arr.forEach(function (x) {
                    var key = fn(x);
                    if (!unique[key]) {
                        distinct.push(key);
                        unique[key] = true;
                    }
                });
                return distinct;
            }
            $scope.Components = [];
            $scope.ComponentsByType = [];
            data.forEach(function (item) {
                switch (item.componenttype) {
                    case "QA":
                        qaArray.push(item);
                        break;
                    case "Mobile":
                        mobileArray.push(item);
                        break;
                    case "Web":
                        webArray.push(item);
                        $scope.ComponentsByType.push({"name": item.name, "type": "Web", "list": webArray });
                        //Web(item);
                        break;
                    case "Cloud":
                        cloudArray.push(item);
                        break;
                    case "UI/UX":
                        uiuxArray.push(item);
                        break;
                    default:
                        unknownArray.push(item);
                        break;
                }
            });

            $scope.sheet = {};

            $scope.sheet.types = uniqueBy(data, function (x) {
                return x.componenttype;
            });
            var types = $scope.sheet.types;
            types.forEach(function(type){
                switch (type) {
                    case "QA":
                        $scope.Components.push({"list": qaArray, "name": "QA"});
                        break;
                    case "Mobile":
                        $scope.Components.push({"list": mobileArray, "name": "Mobile"});
                        break;
                    case "Web":
                        $scope.Components.push({"list": webArray, "name": "Web"});
                        break;
                    case "Cloud":
                        $scope.Components.push({"list": cloudArray, "name": "Cloud"});
                        break;
                    case "UI/UX":
                        $scope.Components.push({"list": uiuxArray, "name": "UI/UX"});
                        break;
                    default:
                        $scope.Components.push({"list": unknownArray, "name": "Unknown"});
                        break;
                }
            });
            $scope.getComponents = function(type){
                switch (type) {
                    case "QA":
                        return qaArray;
                        break;
                    case "Mobile":
                        return  mobileArray;
                        break;
                    case "Web":
                        return  webArray;
                        break;
                    case "Cloud":
                        return cloudArray;
                        break;
                    case "UI/UX":
                        return  uiuxArray;
                        break;
                    default:
                        return  unknownArray;
                        break;
                }
            }
            console.log($scope.Components);
        }).error(function (data, status) {
                console.log("Error : " + status);
            });
        $scope.isExists = function (type) {
            if (type != '') {
                return true;
            }
            else {
                return false;
            }
        }
    });
angular.module('excelApp').filter('nameFilter', function () {
    return function (input, searchText) {
        var filteredData = [];
        input.forEach(function (item, index) {

            var str = item.name;
            var serachString = searchText;
            var result = str.match(new RegExp(serachString, "i"));
            if (result) {
                filteredData.push(item);
            }
        });
        console.log(filteredData)
        return filteredData.length != 0 ? filteredData : input;
    };
});



//'use strict';
//
//angular.module('excelApp')
//    .controller('MainCtrl', function ($scope, $http) {
//        $http.get('/api/things').success(function (data) {
//            var qaArray = [],mobileArray = [],webArray = [],uiuxArray = [],cloudArray = [],unknownArray = [];
//            function uniqueBy(arr, fn) {
//                var unique = {};
//                var distinct = [];
//                arr.forEach(function (x) {
//                    var key = fn(x);
//                    if (!unique[key]) {
//                        distinct.push(key);
//                        //console.log(key)
//                        unique[key] = true;
//                    }
//                });
//                //console.log(distinct)
//                return distinct;
//            }
//            $scope.getComponents = function(type){
//                switch (type) {
//                    case "QA":
//                        return qaArray;
//                        break;
//                    case "Mobile":
//                        return mobileArray;
//                        break;
//                    case "Web":
//                        return webArray;
//                        break;
//                    case "Cloud":
//                        return cloudArray;
//                        break;
//                    case "UI/UX":
//                        return uiuxArray;
//                        break;
//                    default:
//                        return unknownArray;
//                        break;
//                }
//            }
//            $scope.Components = [];
//            $scope.ComponentsByType = [];
//            data.forEach(function (item) {
//                switch (item.componenttype) {
//                    case "QA":
//                        qaArray.push(item);
//                        $scope.ComponentsByType.push({"name": item.name, "type": "QA", "list": qaArray });
//                        //QA(item);
//                        break;
//                    case "Mobile":
//                        mobileArray.push(item);
//                        $scope.ComponentsByType.push({"name": item.name, "type": "Mobile", "list": mobileArray });
//                        //Mobile(item);
//                        break;
//                    case "Web":
//                        webArray.push(item);
//                        $scope.ComponentsByType.push({"name": item.name, "type": "Web", "list": webArray });
//                        //Web(item);
//                        break;
//                    case "Cloud":
//                        cloudArray.push(item);
//                        $scope.ComponentsByType.push({"name": item.name, "type": "Cloud", "list": cloudArray });
//                        //Cloud(item);
//                        break;
//                    case "UI/UX":
//                        uiuxArray.push(item);
//                        $scope.ComponentsByType.push({"name": item.name, "type": "UI/UX", "list": uiuxArray });
//                        //UIUX(item);
//                        break;
//                    default:
//                        unknownArray.push(item);
//                        $scope.ComponentsByType.push({"name": item.name, "type": "", "list": unknownArray });
//                        //unknown(item);
//                        break;
//                }
//            })
//            $scope.sheet = {};
//
//            $scope.sheet.types = uniqueBy(data, function (x) {
//                return x.componenttype;
//            });
//            var types = $scope.sheet.types;
//            types.forEach(function(type){
//                switch (type) {
//                    case "QA":
//                        $scope.Components.push({"QA": qaArray});
//                        break;
//                    case "Mobile":
//                        $scope.Components.push({"Mobile": qaArray});
//                        break;
//                    case "Web":
//                        return webArray;
//                        break;
//                    case "Cloud":
//                        return cloudArray;
//                        break;
//                    case "UI/UX":
//                        return uiuxArray;
//                        break;
//                    default:
//                        return unknownArray;
//                        break;
//                }
//            });
//            function QA(QAcomponent){
//                qaArray.push(QAcomponent);
//            }
//            function Mobile(Mobilecomponent){
//                mobileArray.push(Mobilecomponent);
//            }
//            function Web(Webcomponent){
//                webArray.push(Webcomponent);
//            }
//            function Cloud(Cloudcomponent){
//                cloudArray.push(Cloudcomponent);
//            }
//            function UIUX(UIUXcomponent){
//                uiuxArray.push(UIUXcomponent);
//            }
//            function unknown(unknowncomponent){
//                unknownArray.push(unknowncomponent);
//            }
//            console.log($scope.ComponentsByType)
//        }).error(function (data, status) {
//                console.log("Error : " + status);
//            });
//        $scope.isExists = function (type) {
//            if (type != '') {
//                return true;
//            }
//            else {
//                return false;
//            }
//        }
//    });
//angular.module('excelApp')
//    .config(function ($stateProvider) {
//        $stateProvider
//            .state('main', {
//                url: '/main',
//                templateUrl: 'app/main/main.html',
//                controller: 'MainCtrl as vm'
//            });
//    });
//angular.module('excelApp').filter('nameFilter', function () {
//    return function (input, searchText) {
//        var filteredData = [];
//        input.forEach(function (item, index) {
//
//            var str = item.name;
//            var serachString = searchText;
//            var result = str.match(new RegExp(serachString, "i"));
//            if (result) {
//                filteredData.push(item);
//            }
//        });
//        console.log(filteredData)
//        return filteredData.length != 0 ? filteredData : input;
//    };
//});











