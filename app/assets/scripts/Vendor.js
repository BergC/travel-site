// Lazyloader is used to download images on a webpage ONLY once the user is close to that section, otherwise the images won't load.  This helps to load pages faster.
import 'lazysizes';

/*
One thing to note is that the use of lazyloader can mess up waypoints.  For instance, the waypoints we used in StickyHeader will trigger too early.

The reason this happens is because our waypoints trigger based on the section's distance from the top of the screen.  However, when we use lazyloader, the images haven't loaded yet and the size of the webpage in the eyes of the waypoint is distorted.

To change this, we need to tell waypoints to refresh its measurements each time an image is lazy loaded.

See StickyHeader.js first method beneath the class creation for how this is fixed and additional info.
*/


/* 
Picturefill will ensure that older web browsers can still utilize our responsive images even though they don't support HTML tags such as picture or srcset.  

All you have to do is import it here and you're done.
*/

import 'picturefill';

import "../../temp/scripts/modernizr";