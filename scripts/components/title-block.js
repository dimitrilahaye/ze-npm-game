class TitleBlock extends HTMLElement {
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
            
            <h1 class="title is-1">Ze NPM GAME</h1>
            <div class="block">
                <p>
                    Un mot au hasard va apparaître sur ton écran.
                    <br />
                    Dis-nous si selon toi, un package NPM existe avec un tel nom.
                </p>
            </div>
        `;

        this.attachShadow({ mode: 'open' });

        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
}


window.customElements.define('app-title', TitleBlock);