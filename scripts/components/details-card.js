class DetailsCard extends HTMLElement {
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
            
            <div id="details" class="hide box mx-6"></div>
        `;

        this.attachShadow({ mode: 'open' });

        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    static get observedAttributes() {
        return ['display', 'content'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case 'display':
                newValue === 'true' ? this.display() : this.hide();
                break;
            case 'content':
                this.content(JSON.parse(newValue));
                break;
        }
    }

    display() {
        this.shadowRoot.querySelector('.box').classList.remove("hide");
    }

    hide() {
        this.shadowRoot.querySelector('.box').className += " hide";
    }

    content({ name, description, link }) {
        this.shadowRoot.querySelector('.box').innerHTML = '';
        const a = document.createElement("a");
        a.href = link;
        a.target = '_blank';
        a.innerHTML = `<i class="fa-solid fa-link"></i>&nbsp;&nbsp;${name}`;
        a.className = 'details-link';
        this.shadowRoot.querySelector('.box').appendChild(a);
        const bold = document.createElement("span");
        bold.className += ' has-text-weight-bold';
        const t = document.createTextNode('Description : ');
        bold.appendChild(t);
        const p = document.createElement("p");
        document.body.appendChild(p);
        p.appendChild(bold);
        const desc = document.createTextNode(description);
        p.appendChild(desc);
        p.className = 'details-description';
        this.shadowRoot.querySelector('.box').appendChild(p);
        this.shadowRoot.querySelector('.box').classList.remove("hide");
    }
}


window.customElements.define('app-details', DetailsCard);