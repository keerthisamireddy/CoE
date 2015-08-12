

angular.module('excelApp')
    .controller('ModalInstanceCtrl', function ($scope, $modalInstance,comp) {
       $scope.compName = comp.name;
       $scope.compAssignedTo = comp.assignedto;
       $scope.url = comp.url;
       $scope.gitsvnurl = comp.gitsvnurl;
       $scope.submitdate = comp.submitdate;
       $scope.status = comp.active;
       $scope.hourssaved = comp.hourssaved;
       $scope.hourstointegrate = comp.hourstointegrate;
       $scope.type = comp.componenttype;
       $scope.ok =  function () {
            $modalInstance.close('ok');
        };

//        $scope.cancel = function () {
//            $modalInstance.dismiss('cancel');
//        };
    })
    .controller('MainCtrl', function ($scope, $http ,$modal) {
        $http.get('/api/things').success(function (data) {
            var qaArray = [],mobileArray = [],webArray = [],uiuxArray = [],cloudArray = [],unknownArray = [], all=[];
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
            $scope.getDetails = function(comp)
            {
                console.log(comp);
                var modalInstance = $modal.open({

                    templateUrl: 'myModalContent.html',
                    controller: 'ModalInstanceCtrl',
                    size: 'md',
                    resolve: {
                        comp: function () {
                            return comp;
                        }
                    }
                });

                modalInstance.result.then(function (comp) {
                    $scope.comp1 = comp;
                    console.log(comp);
                }, function () {
                    console.log('Modal dismissed at: ' + new Date());
                });
            }
            $scope.Components = [];
            $scope.activeArray = [];
            $scope.ComponentsByType = [];
            data.forEach(function (item) {
                switch (item.componenttype) {
                    case "QA":
                        item.image = "assets/images/qa5.jpg";
                        qaArray.push(item);
                        $scope.ComponentsByType.push({"name": item.name, "type": "QA", "list": qaArray, "image": "assets/images/QA_cropped.jpg" });
                        break;
                    case "Mobile":
                        item.image = "assets/images/mobile3.jpg";
                        mobileArray.push(item);
                        $scope.ComponentsByType.push({"name": item.name, "type": "Mobile", "list": mobileArray, "image": "assets/images/mobile3.jpg" });
                        break;
                    case "Web":
                        item.image = "assets/images/web3.jpg";
                        webArray.push(item);
                        $scope.ComponentsByType.push({"name": item.name, "type": "Web", "list": webArray, "image": "assets/images/web3.jpg" });
                        break;
                    case "Cloud":
                        item.image = "assets/images/cloud3.jpg";
                        cloudArray.push(item);
                        $scope.ComponentsByType.push({"name": item.name, "type": "Cloud", "list": cloudArray, "image": "assets/images/cloud3.png" });
                        break;
                    case "UI/UX":
                        item.image = "assets/images/uiux.png";
                        uiuxArray.push(item);
                        $scope.ComponentsByType.push({"name": item.name, "type": "Ui/Ux", "list": uiuxArray, "image": "assets/images/uiux.png" });
                    default:
                        item.image = "assets/images/others.jpg";
                        unknownArray.push(item);
                        $scope.ComponentsByType.push({"name": item.name, "type": "Unknown", "list": unknownArray, "image": "assets/images/others.jpg" });
                        break;
                }
            });

            $scope.sheet = {};
            $scope.transform = "translate3d(0px, 0px, 0px)";
            $scope.sheet.types = uniqueBy(data, function (x) {
                return x.componenttype;
            });
            var types = $scope.sheet.types;
            types.push('All');
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
                        $scope.Components.push({"list": uiuxArray, "name": "Ui/Ux"});
                        break;
                    case "All":
                        $scope.Components.push({"list": data, "name": "All"});
                        break;
                    default:
                        $scope.Components.push({"list": unknownArray, "name": "Unknown"});
                        break;
                }
            });
//            var $container = $('#lightbox');
//            $container.isotope({
//                animationOptions: {
//                    duration: 750,
//                    easing: 'linear',
//                    queue: false
//                }
//            });
//            $('.cat a').click(function() {
//                $('.cat .active').removeClass('active');
//                $(this).addClass('active');
//                var selector = $(this).attr('data-filter');
//                $container.isotope({
//                    filter: selector,
//                    animationOptions: {
//                        duration: 750,
//                        easing: 'linear',
//                        queue: false
//                    }
//                });
//                return false;
//            });

            $scope.compoLimit = 10;
            $scope.activeArray = data;
            $scope.getComponents = function(type){
                $scope.cActive = type;
//                $(this).addClass('active');
                switch (type) {
                    case "QA":
                        $scope.typeIcon = 'fa-search';
                        $scope.activeArray = qaArray;
                        return qaArray;
                        break;
                    case "Mobile":
                        $scope.typeIcon = 'fa-mobile';
                        $scope.activeArray = mobileArray;
                        return  mobileArray;
                        break;
                    case "Web":
                        $scope.typeIcon = 'fa-television';
                        $scope.activeArray = webArray;
                        return  webArray;
                        break;
                    case "Cloud":
                        $scope.typeIcon = 'fa-cloud';
                        $scope.activeArray = cloudArray;
                        return cloudArray;
                        break;
                    case "Ui/Ux":
                        $scope.typeIcon = 'fa-search';
                        $scope.activeArray = uiuxArray;
                        return  uiuxArray;
                        break;
                    case "All":
                        $scope.typeIcon = 'fa-mobile';
                        $scope.activeArray = data;
                        return data;
                    default:
                        $scope.activeArray = unknownArray;
                        return  unknownArray;
                        break;
                }
            }
            all = $scope.ComponentsByType;
            $scope.cActive = "All";
        }).error(function (data, status) {
                console.log("Error : " + status);
            });
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
angular.module('excelApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('main', {
                url: '/main',
                templateUrl: 'app/main/main.html',
                controller: 'MainCtrl as vm',
                resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load(['app/main/jquery.isotope.js']);
                    }]
                }
            });
    });
