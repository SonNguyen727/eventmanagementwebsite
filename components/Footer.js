class Footer extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <div style="border: 2px solid blue; padding: 10px;">
                <h2>Đây là phần Footer của nhóm 1</h2>
                <p>Hãy chỉnh tôi ở đây</p>
            </div>
        `;
    }
}

customElements.define('my-footer', Footer);