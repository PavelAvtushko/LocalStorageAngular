export default class LocalStorageWidgetController {
    constructor($scope) {
        this.emitEvents($scope);
    }

    emitEvents($scope) {
        $scope.clearForm = function () {
            $scope.$emit('clearFormRequest');
        };

        $scope.hideForm = function () {
            $scope.$emit('hideFormRequest');
        };

        $scope.removeItem = function (key, value) {
            $scope.$emit('removeItemRequest', {key, value});
        };

        $scope.hightlightItem = function (value) {
            $scope.$emit('hightlightRequest', value);
        };
    }
}