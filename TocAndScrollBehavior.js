/**
 * @file TocAndScrollBehavior module
 * @formerly Products/WestlawNext/productViews/plcuk/js/v1/Website/Views/Document/TocAndScrollBehavior.PLCUK.js
 */

import $ from 'jquery';
import TocAndScrollBehavior from '~/Platform/js/PLCCore/ProductView/Website/Views/Document/TocAndScrollBehavior.js';
import MiniTopHeader from 'Products/WestlawNext/productViews/plcuk/js/Document/MiniTopHeader.js';
import LocalStorageManager from './LocalStorageManager.js';

// Disabling responsive check, to unify the display for all screen sizes
TocAndScrollBehavior.prototype.passFirstResponsiveThreshold = function () {
    if (MiniTopHeader.isEnabled) {
        return false;
    }
    return this.passMaxWidthMediaQuery(this.firstResponsiveThreshold);
};
TocAndScrollBehavior.prototype.passSecondResponsiveThreshold = function () {
    if (MiniTopHeader.isEnabled) {
        return false;
    }
    return this.passMaxWidthMediaQuery(this.secondResponsiveThreshold);
};

//implement additional functional using localStorage   
const platformRetrieveTocLinkClickFunction = TocAndScrollBehavior.prototype.RetrieveTocLinkClickFunction;

function createLoadingNotation() {
    let notation = document.createElement('div');
    notation.classList.add('alert-message');
    notation.innerHTML = 'Loading...';
    document.body.appendChild(notation);
    return notation;
}

function removeLoadingNotation(notation) {
    notation.parentNode.removeChild(notation);
}

TocAndScrollBehavior.prototype.RetrieveTocLinkClickFunction = function (...arg) {
    const parentFunction = platformRetrieveTocLinkClickFunction.apply(this, arg);
    const documentId = location.pathname.split('/')[2];
    const LS_Manager = new LocalStorageManager(documentId);

    function addToLocalStorage() {
        const targetId = $(this).attr("href").substring(1);
        const targetTextData = $(this.lastChild).text() || $(this).text();
        LS_Manager.setData(targetId, targetTextData);
        console.log(targetTextData);
    }

    return function (...params) {
        const notationElement = createLoadingNotation();
        setTimeout(() => {
            addToLocalStorage.apply(this, params);
            removeLoadingNotation(notationElement);
        }, 1000);
        return parentFunction.apply(this, params);
    };
};

export default TocAndScrollBehavior;