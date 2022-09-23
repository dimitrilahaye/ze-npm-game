class DifficultyRadios extends HTMLElement {
    constructor() {
        super();

        const template = document.createElement('template');
        template.innerHTML = `
            <style>
                @import url("https://cdnjs.cloudflare.com/ajax/libs/bulma/0.9.4/css/bulma.min.css");
                @import url("https://cdn.jsdelivr.net/npm/bulma-tooltip@3.0.2/dist/css/bulma-tooltip.min.css");

                .hide {
                    display: none;
                }
                * {
                    text-align: center;
                }
            </style>
            
            <div>
                <input type="radio" value="very-soft" name="difficulty" id="very-soft">
                <label for="very-soft" data-tooltip="Le nom du package, sa description ou ses mots clés DOIVENT CONTENIR le mot">Very soft</label>
            </div>
            <div>
                <input type="radio" value="soft" name="difficulty" id="soft">
                <label for="soft" data-tooltip="Le nom du package DOIT CONTENIR le mot">Soft</label>
            </div>
            <div>
                <input type="radio" value="hard" name="difficulty" id="hard">
                <label for="hard" data-tooltip="Le nom du package DOIT ÊTRE IDENTIQUE au mot">Hard</label>
            </div>
        `;

        this.attachShadow({ mode: 'open' });

        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        this.shadowRoot.querySelectorAll('input[type="radio"]').forEach((input) => input.addEventListener('click', this.setDifficulty.bind(this)));
        const val = this.getAttribute('difficulty');
        if (val) {
            this.shadowRoot.querySelector(`input#${val}`).setAttribute('checked', true);
        }
    }

    static get observedAttributes() {
        return ['difficulty'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case 'difficulty':
                if (oldValue !== newValue) {
                    this.setDifficulty();
                }
                break;
        }
    }

    setDifficulty() {
        const val = this.getDifficulty();
        if (val) {
            this.setAttribute('difficulty', val);
        }
    }

    getDifficulty() {
        return this.shadowRoot.querySelector('input[type="radio"]:checked')?.value;
    }
}


window.customElements.define('app-difficulty', DifficultyRadios);