//This is the ES6 way of importing JS objects from other JS files.
import MobileMenu from './modules/MobileMenu';
import RevealOnScroll from './modules/RevealOnScroll';
import $ from 'jquery'; //Because we're not using jQuery in the two instances of our RevealOnScroll class, we should import it.
import StickyHeader from './modules/StickyHeader';
import Modal from './modules/Modal';

let mobileMenu = new MobileMenu();
new RevealOnScroll($(".feature-item"), "85%");
new RevealOnScroll($(".testimonial"), "60%");
let stickyHeader = new StickyHeader();
let modal = new Modal();
