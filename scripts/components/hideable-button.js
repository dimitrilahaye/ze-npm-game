class HideableButton extends HTMLElement {
    constructor() {
        super();
    }

    static get observedAttributes() {
        return ['display'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case 'display':
                newValue === 'true' ? this.display() : this.hide();
                break;
        }
    }

    display() {
        this.shadowRoot.querySelector('button').classList.remove("hide");
    }

    hide() {
        this.shadowRoot.querySelector('button').className += " hide";
    }
}