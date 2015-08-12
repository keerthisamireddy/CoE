(function(undefined) {
    // Get angular app
    var app = angular.module("excelApp");

    app.factory("XLSXReaderService", ['$q', '$rootScope',
        function($q, $rootScope) {
            var service = function(data) {
                angular.extend(this, data);
            };

            service.readFile = function(file, showPreview) {
                var deferred = $q.defer();

                XLSX.readFile(file, showPreview, function(data){
                    $rootScope.$apply(function() {
                        deferred.resolve(data);
                    });
                });
                //XLSX.readFile(filename, read_opts)

                return deferred.promise;
            };

            return service;
        }
    ]);
}).call(this);
