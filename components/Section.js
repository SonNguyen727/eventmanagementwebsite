class Section extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <div style="border: 2px solid blue; padding: 10px;">
                <h2>Đây là phần Section của nhóm 1</h2>
                <p>Hãy chỉnh tôi ở đây</p>
            </div>
        `;
    }
}

customElements.define('my-section', Section);