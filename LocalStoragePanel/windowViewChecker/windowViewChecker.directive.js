import windowViewCheckerTemplate from 'Products/WestlawNext/productViews/plcuk/js/Document/Widget/LocalStoragePanel/windowViewChecker/windowViewChecker.template.html!text';

export default function windowViewCheckerDirective() {
    return {
        restrict: 'A',
        template: windowViewCheckerTemplate,
        link: function ($scope) {
            $scope.showForm = function () {
                $scope.$emit('showOrHideWindowRequest');
            };
        }
    };
}