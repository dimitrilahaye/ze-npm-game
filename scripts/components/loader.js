class Loader extends HTMLElement {
    constructor() {
        super();

        const template = document.createElement('template');
        template.innerHTML = `
            <style>
                .hide {
                    display: none;
                }
                * {
                    text-align: center;
                }

                .lds-ellipsis {
                  display: inline-block;
                  position: relative;
                  width: 80px;
                  height: 80px;
                }
                .lds-ellipsis div {
                  position: absolute;
                  top: 33px;
                  width: 13px;
                  height: 13px;
                  border-radius: 50%;
                  background: #fff;
                  animation-timing-function: cubic-bezier(0, 1, 1, 0);
                }
                .lds-ellipsis.white div {
                  background: #fff;
                }
                .lds-ellipsis.black div {
                  background: #485fc7;
                }
                .lds-ellipsis div:nth-child(1) {
                  left: 8px;
                  animation: lds-ellipsis1 0.6s infinite;
                }
                .lds-ellipsis div:nth-child(2) {
                  left: 8px;
                  animation: lds-ellipsis2 0.6s infinite;
                }
                .lds-ellipsis div:nth-child(3) {
                  left: 32px;
                  animation: lds-ellipsis2 0.6s infinite;
                }
                .lds-ellipsis div:nth-child(4) {
                  left: 56px;
                  animation: lds-ellipsis3 0.6s infinite;
                }
                @keyframes lds-ellipsis1 {
                  0% {
                    transform: scale(0);
                  }
                  100% {
                    transform: scale(1);
                  }
                }
                @keyframes lds-ellipsis3 {
                  0% {
                    transform: scale(1);
                  }
                  100% {
                    transform: scale(0);
                  }
                }
                @keyframes lds-ellipsis2 {
                  0% {
                    transform: translate(0, 0);
                  }
                  100% {
                    transform: translate(24px, 0);
                  }
                }
            </style>

            <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
        `;

        this.attachShadow({ mode: 'open' });

        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        this.setAttribute('display', false);
        this.color(this.getAttribute('color'));
    }

    static get observedAttributes() {
        return ['display', 'color'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case 'display':
                newValue === 'true' ? this.display() : this.hide();
                break;
            case 'color':
                this.color(newValue);
                break;
        }
    }

    display() {
        this.shadowRoot.querySelector('.lds-ellipsis').style.display = 'inline-block';
    }

    hide() {
        this.shadowRoot.querySelector('.lds-ellipsis').style.display = 'none';
    }

    color(color) {
        this.shadowRoot.querySelector('.lds-ellipsis').classList.remove(color);
        this.shadowRoot.querySelector('.lds-ellipsis').className += ` ${color}`;
    }
}

window.customElements.define('app-loader', Loader);