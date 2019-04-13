import $ from 'jquery';
import waypoints from '../../../../node_modules/waypoints/lib/noframework.waypoints'; //This allows us to easily have scroll events rather than having to code exactly when the features section should reveal.

class RevealOnScroll { //The ordering below matters.  For instance, the this.offsetPercentage needs be above the createWaypoints method so that we can access it before running createWaypoints.
    constructor(els, offset) {
        this.itemsToReveal = els;
        this.offsetPercentage = offset;
        this.hideInitially();
        this.createWaypoints();
    }

    //This is used to hide the selected items initially so that they can be revealed on scroll.
    hideInitially() { 
        this.itemsToReveal.addClass("reveal-item");
    }

/*
The .each() method is a jQuery ability that will run some code for each DOM element in our selection.
In this case our selection is the itemsToReveal, which is selecting the HTML/CSS class .feature-item, which is applied to the four features.  So it will run 4 times.
*/

    createWaypoints() {
        let that = this; //Because we want to use the offset variable included in the constructor function, we need to assign a variable to the this keyword.  We do this because if we try to access offsetPercentage below in the offset (e.g. this.offsetPercentage), the this keyword points to the Waypoint, not the constructor.
        this.itemsToReveal.each(function() {
            let currentItem = this; //Outside of the new element below, the this keyword still points to the DOM element.  So we set some variable to the this keyword, then access that variable inside the Waypoint.
            new Waypoint({ //Waypoint is already included in the waypoints npm package that was installed.
                element: currentItem, //This is the DOM element we want to watch for as we scroll.
                handler: function() { 
                    $(currentItem).addClass("reveal-item--is-visible");
                }, //The handler is what we want to happen once we reach that element.
                offset: that.offsetPercentage //By default a waypoint handler occurs when the top of the DOM element reaches the top of the screen.  It has a default position of 0%.  So, if you want an item to reveal as it enters view (e.g. at the bottom) you can use offset, where 100% is the bottom of the page.
            });
        });
    }
}

export default RevealOnScroll;