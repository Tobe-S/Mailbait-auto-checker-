// ==UserScript==
// @name         Mailbait.info Auto Check All Checkboxes
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Automatically checks all checkboxes on mailbait.info/run
// @author       Tobe-S
// @match        https://mailbait.info/run
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.checked = true;
    });
})();

