/* 
    Created on : Aug 28, 2018, 9:05:55 PM
    Author     : Zunayed Hassan
*/

"use strict";

(function main() {
    // Initialize Adwaita UI
    let theme = new AdwaitaUI();
    theme.InitializeAdwaitaUI();
    
    // Initialize #bugs Section
    let browserHeight        = document.documentElement.clientHeight;
    let mainHeaderHeight     = document.querySelector("#main-header").getBoundingClientRect().height;
    let bugsSection          = document.querySelector("#bugs");
    let bugSectionHeight     = browserHeight - mainHeaderHeight - 70;
    
    bugsSection.style.height = bugSectionHeight + "px";
    
}) ();
