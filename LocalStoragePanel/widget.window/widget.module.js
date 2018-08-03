import angular from 'angular';
import localStorageWidgetDirective from 'Products/WestlawNext/productViews/plcuk/js/Document/Widget/LocalStoragePanel/widget.window/widget.directive.js';
import LocalStorageWidgetController from 'Products/WestlawNext/productViews/plcuk/js/Document/Widget/LocalStoragePanel/widget.window/widget.controller.js';
import windowViewCheckerDirective from 'Products/WestlawNext/productViews/plcuk/js/Document/Widget/LocalStoragePanel/windowViewChecker/windowViewChecker.directive.js';

export default function widget_module_name() {
    return 'modalWidget';
}

angular.module(widget_module_name(), [])
    .directive('widgetWindow', localStorageWidgetDirective)
    .controller('localStorageWidgetController', ['$scope', LocalStorageWidgetController])
    .directive('windowViewChecker', windowViewCheckerDirective);