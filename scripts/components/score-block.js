class ScoreBlock extends HTMLElement {
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
            
            <div class="is-flex is-justify-content-center is-align-items-center">
                <span class="subtitle mr-1 mb-0">Ton score : </span>
                <span class="score title mt-0"></span>
            </div>
        `;

        this.attachShadow({ mode: 'open' });

        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        this.score(this.getAttribute('score'));
    }

    static get observedAttributes() {
        return ['score'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case 'score':
                this.score(newValue);
                break;
        }
    }

    score(score) {
        this.shadowRoot.querySelector('div span.score').innerHTML = score;
    }
}

window.customElements.define('app-score', ScoreBlock);