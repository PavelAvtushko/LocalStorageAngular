import LocalStorageManager from 'Products/WestlawNext/productViews/plcuk/js/Document/Widget/LocalStoragePanel/helpers/LocalStorageManager.js';

export default function localStorageManagerService() {
    let documentID;

    this.$get = ['$q', function ($q) {

        const setData = LocalStorageManager.prototype.setData;

        LocalStorageManager.prototype.setData = function (key, value) {
            const deferred = $q.defer();
            setData.call(this, key, value).then((data) => {
                deferred.resolve(data);
            });
            return deferred.promise;
        };

        return new LocalStorageManager(documentID);
    }];

    this.configuration = (ID) => {
        documentID = ID;
    };
}