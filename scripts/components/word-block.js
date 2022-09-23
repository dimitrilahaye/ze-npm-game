class WordBlock extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.attachShadow({ mode: 'open' });

        this.shadowRoot.innerHTML = `
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

            <section class="hero is-link my-6">
                <div class="hero-body">
                    <p class="subtitle">
                        Le mot est...
                    </p>
                    <p class="title">
                        <span class="word"></span>
                        <app-loader id="word"  color="white"></app-loader>
                    </p>
                </div>
            </section>
        `;
    }

    static get observedAttributes() {
        return ['word'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case 'word':
                this.word(newValue);
                break;
        }
    }

    word(word) {
        this.shadowRoot.querySelector('.hero .hero-body .title .word').innerHTML = word;
    }
}

window.customElements.define('app-word', WordBlock);