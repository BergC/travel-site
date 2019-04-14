import $ from 'jquery';

/*
Classes are an ES6 introduction.  
Here I am using the ES6 class capabilitis to create a constructor function.  
The benefit of ES6 classes is improved inheritence when using the "extend" functionality.
*/

class Modal {
    constructor() {
        this.openModalButton = $(".open-modal");
        this.modal = $(".modal");
        this.closeModalButton = $(".modal__close");
        this.events();
    }

    events() {
        // Clicking the open modal button.
        this.openModalButton.click(this.openModal.bind(this));

        // Clicking the X close modal button.
        this.closeModalButton.click(this.closeModal.bind(this));

        // Pushes any key and if escape then close modal.
        $(document).keyup(this.keyPressHandler.bind(this));
    }

    /*
    Because the methods below are being called in the event handler above rather than running directly, the "this" keyword no longer points towards the main class or object.  Instead it points to the new object being clicked.  To counter this, above we use the bind() method and set it to "this", so that each method continues to point towards the modal class.
    */

    openModal() {
        this.modal.addClass("modal--is-visible");
        return false; // Because the Get in Touch button has an a href of #, on click it will scroll to the top of the screen, which we don't want.  We want someone to open the modal wherever they are on the page.  This return false stops that functionality.
    }

    closeModal() {
        this.modal.removeClass("modal--is-visible");
    }

    keyPressHandler(e) {
        if (e.keyCode == 27) { // 27 is they key board code for the escape key.
            this.closeModal();
        }
    }
}

export default Modal;