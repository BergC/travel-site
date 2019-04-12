
import $ from 'jquery';

/*
Classes are an ES6 introduction.  
Here I am using the ES6 class capabilitis to create a constructor function.  
The benefit of ES6 classes is improved inheritence when using the "extend" functionality.
*/
class MobileMenu {
    constructor() {
        this.siteHeader = $(".site-header");
        this.menuIcon = $(".site-header__menu-icon");
        this.menuContent = $(".site-header__menu-content");
        this.events();
    }

    //ES6 allows methods to be created without "this." and "function()".
    events() {
        this.menuIcon.click(this.toggleTheMenu.bind(this));
        console.log(this);
    }

    //Rather than stringing the jQuery selection of the site header menu icon with the .click event handler and the action, it's cleaner to keep them separate and independnet of eachother.
    toggleTheMenu() {
        this.menuContent.toggleClass("site-header__menu-content--is-visible");
        this.siteHeader.toggleClass("site-header--is-expanded");
    }
}

//This is the ES6 way of exporting JS objects (classes).
export default MobileMenu