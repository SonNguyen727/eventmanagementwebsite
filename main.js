async function loadPage(page) {
    const contentDiv = document.getElementById('main-content');
    
    try {
        // 1. Fetch nội dung từ file html tương ứng
        const response = await fetch(`pages/${page}.html`);
        
        if (!response.ok) throw new Error("Không tìm thấy trang");

        const html = await response.text();

        // 2. Parse HTML to extract scripts (innerHTML does NOT execute scripts)
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const scripts = Array.from(doc.querySelectorAll('script'));

        // 3. Insert HTML content without scripts
        // Clone body content as string without scripts
        const bodyClone = doc.body.cloneNode(true);
        // Remove scripts from clone
        bodyClone.querySelectorAll('script').forEach(s => s.remove());
        contentDiv.innerHTML = bodyClone.innerHTML;

        // 4. Execute extracted scripts in order
        scripts.forEach(oldScript => {
            const newScript = document.createElement('script');
            if (oldScript.src) {
                newScript.src = oldScript.src;
                newScript.async = false;
            } else {
                newScript.textContent = oldScript.textContent;
            }
            document.body.appendChild(newScript);
            // Clean up after execution to avoid clutter
            if (!oldScript.src) {
                document.body.removeChild(newScript);
            }
        });

        // 5. Cập nhật thanh địa chỉ URL mà không load lại trang
        window.history.pushState({ page }, '', `#${page}`);
        
        // 6. Cập nhật header auth state sau khi load trang
        updateHeaderAuth();
        
    } catch (error) {
        contentDiv.innerHTML = "<h2>404</h2><p>Trang bạn tìm không tồn tại.</p>";
    }
}

// Cập nhật trạng thái đăng nhập trên header
function updateHeaderAuth() {
    const header = document.querySelector('my-header');
    if (header && header.updateAuthState) {
        header.updateAuthState();
    }
}

// Hashchange listener for navbar links
window.addEventListener('hashchange', () => {
    const page = location.hash.slice(1) || 'home';
    loadPage(page);
});

// Xử lý khi ngườii dùng nhấn nút Back/Forward của trình duyệt
window.onpopstate = (event) => {
    if (event.state && event.state.page) {
        loadPage(event.state.page);
    }
};

