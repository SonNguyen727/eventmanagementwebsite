class Header extends HTMLElement {
    connectedCallback() {
        this.render();

        // Mobile menu toggle functionality
        const toggleBtn = this.querySelector('.mobile-menu-toggle');
        const navLinks = this.querySelector('.nav-links');

        if (toggleBtn && navLinks) {
            toggleBtn.addEventListener('click', () => {
                navLinks.classList.toggle('active');
            });
        }
    }

    render() {
        const user = (typeof DB !== 'undefined') ? DB.getCurrentUser() : null;
        const isAdmin = user && user.role === 'admin';

        const authButtonsHTML = user
            ? `
                <div class="user-greeting">👋 Hi, <strong>${this.escapeHtml(user.name)}</strong></div>
                ${isAdmin ? `<button class="btn-admin" onclick="loadPage('admin')">Admin</button>` : ''}
                <button class="btn-logout" onclick="handleLogout()">Logout</button>
            `
            : `
                <button class="btn-register" onclick="loadPage('register')">Register</button>
                <button class="btn-login" onclick="loadPage('login')">Login</button>
            `;

        this.innerHTML = `
            <header class="header-container">
                <!-- Top Bar: Match Box, Auth -->
                <div class="top-bar">
                    <div class="match-box">
                        <div class="match-label">⚽ Next Match</div>
                        <div class="match-teams">
                            <span class="team home-team">Netherlands</span>
                            <span class="match-vs">VS</span>
                            <span class="team away-team">Argentina</span>
                        </div>
                        <div class="match-time">Sun, Dec 18 · 18:00 CET</div>
                    </div>
                    <div class="auth-buttons" id="header-auth-buttons">
                        ${authButtonsHTML}
                    </div>
                </div>

                <!-- Bottom Navbar -->
                <nav class="bottom-nav">
                    <button class="mobile-menu-toggle" aria-label="Toggle menu">☰</button>
                    <ul class="nav-links">
                        <li><a href="#home" onclick="loadPage('home'); return false;">Home</a></li>
                        <li><a href="#events" onclick="loadPage('events'); return false;">Events</a></li>
                        <li><a href="#teams" onclick="loadPage('teams'); return false;">Teams</a></li>
                        <li><a href="#about" onclick="loadPage('about'); return false;">About</a></li>
                        <li><a href="#contact" onclick="loadPage('contact'); return false;">Contact</a></li>
                    </ul>
                </nav>
            </header>

            <style>
                .header-container {
                    font-family: Arial, sans-serif;
                    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
                }

                /* Top Bar Styles */
                .top-bar {
                    background-color: #fff;
                    color: #6c757d;
                    padding: 10px 20px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .match-box {
                    background: rgba(255,255,255,0.15);
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(255,255,255,0.2);
                    border-radius: 12px;
                    padding: 10px 16px;
                    display: flex;
                    flex-direction: column;
                    gap: 4px;
                    min-width: 220px;
                }

                .match-label {
                    font-size: 0.75em;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    color: #6c757d;
                }

                .match-teams {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    font-weight: 700;
                    font-size: 1em;
                }

                .team {
                    color: #6c757d;
                }

                .match-vs {
                    color: #6c757d;
                    font-size: 0.85em;
                    font-weight: 600;
                }

                .match-time {
                    font-size: 0.8em;
                    color: #6c757d;
                }

                .auth-buttons {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }

                .user-greeting {
                    font-size: 0.95rem;
                    color: #000;
                    margin-right: 6px;
                }

                .btn-register, .btn-login, .btn-logout, .btn-admin {
                    padding: 8px 16px;
                    border: none;
                    border-radius: 20px;
                    cursor: pointer;
                    font-weight: bold;
                    transition: transform 0.2s, background 0.2s;
                    font-size: 0.95rem;
                }

                .btn-register {
                    background-color: transparent;
                    color: #6c757d;
                    border: 2px solid #6c757d;
                }

                .btn-register:hover {
                    transform: scale(1.05);
                }

                .btn-login {
                    background-color: transparent;
                    color: #6c757d;
                    border: 2px solid #6c757d;
                }

                .btn-login:hover {
                    background-color: transparent;
                    transform: scale(1.05);
                }

                .btn-admin {
                    background-color: #1e3a8a;
                    color: white;
                }

                .btn-admin:hover {
                    background-color: #1e40af;
                    transform: scale(1.05);
                }

                .btn-logout {
                    background-color: #ef4444;
                    color: white;
                }

                .btn-logout:hover {
                    background-color: #dc2626;
                    transform: scale(1.05);
                }

                /* Bottom Navbar Styles */
                .bottom-nav {
                    background-color: #000;
                    padding: 0 20px;
                    display: flex;
                    align-items: center;
                    max-width: 100%;
                    min-height: 60px;
                    margin: 0 auto;
                    justify-content: flex-end;
                }

                .nav-links {
                    display: flex;
                    list-style: none;
                    margin: 0 4rem 0 0;
                    padding: 0;
                    gap: 100px;
                    justify-content: flex-start;
                }

                .nav-links a {
                    color: #fff;
                    text-decoration: none;
                    padding: 15px 0;
                    font-weight: 500;
                    position: relative;
                    transition: color 0.3s;
                }

                .nav-links a:hover {
                    color: #fff;
                }

                .nav-links a::after {
                    content: '';
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 0;
                    height: 2px;
                    background-color: #fff;
                    transition: width 0.3s;
                }

                .nav-links a:hover::after {
                    width: 100%;
                }

                /* Mobile Menu Toggle */
                .mobile-menu-toggle {
                    display: none;
                    background: none;
                    border: none;
                    font-size: 1.5em;
                    cursor: pointer;
                    color: #1e40af;
                    padding: 10px;
                }

                /* Mobile Responsive */
                @media (max-width: 768px) {
                    .top-bar {
                        flex-direction: column;
                        gap: 10px;
                        text-align: center;
                    }

                    .auth-buttons {
                        flex-wrap: wrap;
                        justify-content: center;
                    }

                    .bottom-nav {
                        position: relative;
                        max-width: none;
                        margin: 0;
                    }

                    .mobile-menu-toggle {
                        display: block;
                    }

                    .nav-links {
                        display: none;
                        position: absolute;
                        top: 100%;
                        left: 0;
                        right: 0;
                        background-color: #eff6ff;
                        flex-direction: column;
                        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                        max-height: 0;
                        overflow: hidden;
                        transition: max-height 0.3s ease;
                    }

                    .nav-links.active {
                        display: flex;
                        max-height: 300px;
                        padding: 20px;
                        gap: 0;
                    }

                    .nav-links li {
                        width: 100%;
                        border-bottom: 1px solid #bfdbfe;
                    }

                    .nav-links a {
                        display: block;
                        padding: 15px 20px;
                    }
                }
            </style>
        `;

        // Re-attach mobile toggle after re-render
        const toggleBtn = this.querySelector('.mobile-menu-toggle');
        const navLinks = this.querySelector('.nav-links');
        if (toggleBtn && navLinks) {
            toggleBtn.addEventListener('click', () => {
                navLinks.classList.toggle('active');
            });
        }
    }

    updateAuthState() {
        this.render();
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

customElements.define('my-header', Header);

// Global logout handler
window.handleLogout = function() {
    if (typeof DB !== 'undefined') {
        DB.logout();
        updateHeaderAuth();
        loadPage('home');
    }
};

