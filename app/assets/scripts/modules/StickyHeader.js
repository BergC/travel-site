import $ from 'jquery';
import waypoints from '../../../../node_modules/waypoints/lib/noframework.waypoints';

class StickyHeader {
    constructor() {
        this.siteHeader = $(".site-header");
        this.headerTriggerElement = $(".large-hero__title");
        this.createHeaderWaypoint(); //We call the createHeaderWaypoint in our constructor so that it's created as soon as the page loads.
    }

    createHeaderWaypoint() {
        let that = this; //In this instance, the this keyword is now pointing to the instance of our class.
        new Waypoint({
            element: this.headerTriggerElement[0], //Waypoing is expected a JS native DOM element.  Without the [0], you're just passing it a jQuery object.  You can access the native DOM element within a jQuery element by adding [0].  This is because the first item in a jQuery array-like object is a pointer to the native DOM element.
            handler: function(direction) { //Handler's function can take an argument "direction" so that if we scroll back up to the top, our change to the header color will revert.
                if (direction == "down") {
                    that.siteHeader.addClass("site-header--dark"); //Given we're writing a function insided Waypoint, we can't use this, as it won't point to our class.  So we use the that variable, which is pointing to the class.
                } else {
                    that.siteHeader.removeClass("site-header--dark");
                }
            }
        });
    }

}

export default StickyHeader;