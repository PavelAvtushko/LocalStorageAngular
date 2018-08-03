import angular from 'angular';
import localStorageManagerService from 'Products/WestlawNext/productViews/plcuk/js/Document/Widget/LocalStoragePanel/services/localStorageManager.service.js';
import linkMarkManagerService from 'Products/WestlawNext/productViews/plcuk/js/Document/Widget/LocalStoragePanel/services/linkMarkManager.service.js';
import widget_module_name from 'Products/WestlawNext/productViews/plcuk/js/Document/Widget/LocalStoragePanel/widget.window/widget.module.js';


export default function root_module_name() {
    return 'localStorageWidgetPanel';
}

angular.module(root_module_name(), [widget_module_name()])
    .provider('localStorageManagerService', localStorageManagerService)
    .provider('linkMarkManagerService', linkMarkManagerService)
    .directive('localStoragePanel', ['localStorageManagerService', 'linkMarkManagerService', '$compile',
        function (localStorageManagerService, linkMarkManagerService, $compile) {
            return {
                priority: 100,
                terminal: true,
                restrict: 'A',
                compile: function (templateElement) {
                    const links = Array.from(templateElement.find('a'));

                    links.forEach(el => {
                        angular.element(el).attr('ng-click', 'addToLocalStorage($event)');
                    });

                    //add new DOM elements with 'app' and 'widget' directives 
                    templateElement.prepend(`<div window-view-checker></div><widget-window ng-if="showWidget"></widget-window>`);

                    const compiled = $compile(templateElement, null, 100);

                    return function (scope) {
                        //let highLightElementText;
                        const eventListeners = [];

                        compiled(scope);

                        scope.showWidget = false;
                        scope.check = false;
                        scope.data = localStorageManagerService.data;

                        scope.listLength = function () {
                            return Object.keys(scope.data).length;
                        };

                        eventListeners.push(scope.$on('showOrHideWindowRequest', () => {
                            scope.check = !scope.check;
                            scope.showWidget = (scope.check) ? true : false;
                            if (!scope.check) {
                                linkMarkManagerService.unmark();
                            }
                        }));

                        eventListeners.push(scope.$on('hideFormRequest', () => {
                            scope.showWidget = false;
                            scope.check = false;
                            linkMarkManagerService.unmark();
                        }));

                        eventListeners.push(scope.$on('removeItemRequest', (e, data) => {
                            localStorageManagerService.removeItemByKey(data.key);
                            linkMarkManagerService.unmark();
                            // if (data.value === highLightElementText) {
                            //     linkMarkManagerService.unmark();
                            //     highLightElementText = '';
                            // }
                        }));

                        eventListeners.push(scope.$on('clearFormRequest', () => {
                            localStorageManagerService.clearAll();
                            linkMarkManagerService.unmark();
                        }));

                        eventListeners.push(scope.$on('hightlightRequest', (e, value) => {
                            linkMarkManagerService.unmark();
                            //highLightElementText = value;
                            const expression = new RegExp(`^${value}$`);
                            linkMarkManagerService.markRegExp(expression);

                        }));

                        scope.addToLocalStorage = function (e) {
                            if (!scope.showWidget) {
                                scope.showWidget = true;
                            }

                            const name = e.target.innerText;
                            const ID = e.target.hash.substring(1);

                            localStorageManagerService.setData(ID, name)
                                .then(() => {
                                    if (!scope.check && scope.showWidget) {
                                        scope.showWidget = false;
                                    }
                                });
                        };

                        // Unsubscribe
                        scope.$on('$destroy', function () {
                            eventListeners.map(el => el());
                        });
                    };
                }
            };
        }
    ]);