class NopeButton extends HideableButton {
    constructor() {
        super();

        const template = document.createElement('template');
        template.innerHTML = `
            <style>
                @import url("https://cdnjs.cloudflare.com/ajax/libs/bulma/0.9.4/css/bulma.min.css");
                @import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css");

                .hide {
                    display: none;
                }
                * {
                    text-align: center;
                }
            </style>

            <button class="button is-danger is-large hide" id="nope">
                <i class="fa-regular fa-thumbs-down"></i>&nbsp;&nbsp;NOPE
            </button>
        `;

        this.attachShadow({ mode: 'open' });

        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
}

window.customElements.define('app-nope', NopeButton);