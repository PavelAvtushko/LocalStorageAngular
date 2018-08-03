import $ from 'jquery';
import angular from 'angular';
import root_module_name from 'Products/WestlawNext/productViews/plcuk/js/Document/Widget/LocalStoragePanel/localStoragePanel.module.js';

export default function localStorageFormInitialization(containerSelector) {
    const documentId = location.pathname.split('/')[2];
    $(containerSelector).attr('local-storage-panel', '');

    angular.module(root_module_name())
        .config(function (linkMarkManagerServiceProvider) {
            linkMarkManagerServiceProvider.configuration(containerSelector);
        })
        .config(function (localStorageManagerServiceProvider) {
            localStorageManagerServiceProvider.configuration(documentId);
        });

    angular.bootstrap($(containerSelector), [root_module_name()]);
}