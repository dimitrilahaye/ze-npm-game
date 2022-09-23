class YesButton extends HideableButton {
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

            <button class="button is-primary is-large mr-3 hide" id="yes">
                <i class="fa-regular fa-thumbs-up"></i>&nbsp;&nbsp;YES
            </button>
        `;

        this.attachShadow({ mode: 'open' });

        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
}

window.customElements.define('app-yes', YesButton);