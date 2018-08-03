import Mark from 'mark.js';

export default function linkMarkManagerService() {
    let containerselector;

    this.$get = function () {

        return new Mark(containerselector);
    };

    this.configuration = (selector) => {
        containerselector = selector;
    };
}