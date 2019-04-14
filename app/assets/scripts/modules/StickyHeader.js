import $ from 'jquery';
import waypoints from '../../../../node_modules/waypoints/lib/noframework.waypoints';
import smoothScroll from 'jquery-smooth-scroll';

class StickyHeader {
    constructor() {
        this.siteHeader = $(".site-header");
        this.headerTriggerElement = $(".large-hero__title");
        this.createHeaderWaypoint(); //We call the createHeaderWaypoint in our constructor so that it's created as soon as the page loads.
        this.pageSections = $(".page-section");
        this.headerLinks = $(".primary-nav a");
        this.createPageSectionWaypoints();
        this.addSmoothScrolling();
    }

    addSmoothScrolling() {
        this.headerLinks.smoothScroll();
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

    createPageSectionWaypoints() {
        let that = this;

        this.pageSections.each(function() {
            //Within the each() method, jQuery sets the JS "this" keyword to point towards the DOM element from our collection that's currently been looped to.

            let currentPageSection = this;

            new Waypoint({
                element: currentPageSection,
                handler: function(direction) {
                    if (direction == "down") {
                        //Below we're using the getAttribute method to point to the data-matching-link element we created in HTML associated with each DIV that we're looping through, all of which have the .page-section class selector.
                        let matchingHeaderLink = currentPageSection.getAttribute("data-matching-link");

                        //This ensures that at the beginning of each DIV section that we're targeting, if it contains the is-current-link it is removed so that we don't have more than one nav link that's actively styled.
                        that.headerLinks.removeClass("is-current-link")

                        $(matchingHeaderLink).addClass("is-current-link");
                    }                
                },
                offset: "18%"
            });

            //The new Waypoint is to handle what happens when we scroll back up.  That way, it doesn't take until the top of the div is 18% from the top to change which section link is highlighted.
            new Waypoint({
                element: currentPageSection,
                handler: function(direction) {
                    if (direction == "up") {
                        let matchingHeaderLink = currentPageSection.getAttribute("data-matching-link");
                        that.headerLinks.removeClass("is-current-link")
                        $(matchingHeaderLink).addClass("is-current-link");
                    }                
                },
                offset: "-40%"
            });
        });
    }

}

export default StickyHeader;