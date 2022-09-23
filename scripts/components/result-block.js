class ResultBlock extends HTMLElement {
    winTitle = `<span class="icon is-large"><i class="fas fa-face-kiss-wink-heart fa-lg"></i></span> YOU WIN!`;
    loseTitle = `<span class="icon is-large"><i class="fas fa-heart-crack fa-lg"></i></span> YOU LOSE!`;

    constructor() {
        super();

        const template = document.createElement('template');
        // todo virer le tooltip
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

            <section class="hero my-6">
              <div class="hero-body">
                <p class="title"></p>
                <p class="subtitle"></p>
              </div>
            </section>
        `;

        this.attachShadow({ mode: 'open' });

        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    static get observedAttributes() {
        return ['display', 'subtitle'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case 'display':
                this.display(newValue);
                break;
            case 'subtitle':
                this.subtitle(newValue);
                break;
        }
    }

    display(res) {
        switch (res) {
            case 'win':
            case 'lose':
                this.show(res);
                break;
            default:
                this.hide();
        }
    }

    hide() {
        this.shadowRoot.querySelector('section').className += " hide";
    }

    show(res) {
        switch (res) {
            case 'lose':
                this.lose();
                break;
            case 'win':
                this.win();
                break;
        }
        this.shadowRoot.querySelector('section').classList.remove("hide");
    }

    subtitle(text) {
        this.shadowRoot.querySelector('section div .subtitle').innerHTML = text;
    }

    win() {
        this.shadowRoot.querySelector('section').classList.remove("is-danger");
        this.shadowRoot.querySelector('section').className += " is-success";
        this.shadowRoot.querySelector('section div .title').innerHTML = this.winTitle;
    }

    lose() {
        this.shadowRoot.querySelector('section').classList.remove("is-success");
        this.shadowRoot.querySelector('section').className += " is-danger";
        this.shadowRoot.querySelector('section div .title').innerHTML = this.loseTitle;
    }
}

window.customElements.define('app-result', ResultBlock);