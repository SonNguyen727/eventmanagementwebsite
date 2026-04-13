async function loadPage(page) {
    const contentDiv = document.getElementById('main-content');
    
    try {
        // 1. Fetch nội dung từ file html tương ứng
        const response = await fetch(`pages/${page}.html`);
        
        if (!response.ok) throw new Error("Không tìm thấy trang");

        const html = await response.text();

        // 2. Chèn nội dung vào vùng hiển thị
        contentDiv.innerHTML = html;

        // 3. Cập nhật thanh địa chỉ URL mà không load lại trang
        window.history.pushState({ page }, '', `#${page}`);
        
    } catch (error) {
        contentDiv.innerHTML = "<h2>404</h2><p>Trang bạn tìm không tồn tại.</p>";
    }
}

// Hashchange listener for navbar links
window.addEventListener('hashchange', () => {
    const page = location.hash.slice(1) || 'home';
    loadPage(page);
});

// Xử lý khi người dùng nhấn nút Back/Forward của trình duyệt
window.onpopstate = (event) => {
    if (event.state && event.state.page) {
        loadPage(event.state.page);
    }
};
