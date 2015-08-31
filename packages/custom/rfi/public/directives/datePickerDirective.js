'use strict';

angular.module('mean.rfi')
.directive('jqdatepicker', function () {
    return {
        require : 'ngModel',
        link : function (scope, element, attrs, ngModelCtrl) {
            $(function(){
                element.datepicker({
                    showOn:'both',
                    changeYear:true,
                    changeMonth:true,
                    dateFormat:'D, M dd yy',
                    minDate: new Date(),
                    maxDate: new Date() + 8,
                    yearRange: '2015:2050',
                    onSelect:function (dateText, inst) {
                        ngModelCtrl.$setViewValue(dateText);
                        scope.$apply();
                    }
                });
            });
        }
    }
});