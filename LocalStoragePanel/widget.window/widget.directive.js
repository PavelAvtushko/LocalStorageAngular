import LocalStorageWidgetController from 'Products/WestlawNext/productViews/plcuk/js/Document/Widget/LocalStoragePanel/widget.window/widget.controller.js';
import localStorageWidgetTemplate from 'Products/WestlawNext/productViews/plcuk/js/Document/Widget/LocalStoragePanel/widget.window/widget.template.html';

export default function localStorageWidgetDirective() {
    return {
        template: localStorageWidgetTemplate,
        controller: LocalStorageWidgetController,
        restrict: 'E'
    };
}