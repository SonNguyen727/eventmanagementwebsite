class Header extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <header class="header-container">
                <!-- Top Bar: Latest Event, Register, Login -->
                <div class="top-bar">
                    <div class="latest-event">
                        <a href="#events" class="latest-btn">🎉 Latest Event</a>
                    </div>
                    <div class="auth-buttons">
                        <button class="btn-register" onclick="loadPage('register')">Register</button>
                        <button class="btn-login" onclick="loadPage('login')">Login</button>
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
                    background-color: #1e3a8a;
                    color: white;
                    padding: 10px 20px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .latest-event {
                    font-size: 1.1em;
                }

                .latest-btn {
                    color: white;
                    text-decoration: none;
                    padding: 8px 16px;
                    border: 2px solid #60a5fa;
                    border-radius: 25px;
                    transition: background 0.3s;
                }

                .latest-btn:hover {
                    background-color: #60a5fa;
                }

                .auth-buttons {
                    display: flex;
                    gap: 10px;
                }

                .btn-register, .btn-login {
                    padding: 8px 16px;
                    border: none;
                    border-radius: 20px;
                    cursor: pointer;
                    font-weight: bold;
                    transition: transform 0.2s;
                }

                .btn-register {
                    background-color: #10b981;
                    color: white;
                }

                .btn-register:hover {
                    transform: scale(1.05);
                }

                .btn-login {
                    background-color: transparent;
                    color: white;
                    border: 2px solid white;
                }

                .btn-login:hover {
                    background-color: white;
                    color: #1e3a8a;
                }

                /* Bottom Navbar Styles */
                .bottom-nav {
                    background-color: #eff6ff;
                    padding: 0 20px;
                    display: flex;
                    align-items: center;
                }

                .nav-links {
                    display: flex;
                    list-style: none;
                    margin: 0;
                    padding: 0;
                    gap: 30px;
                }

                .nav-links a {
                    color: #1e40af;
                    text-decoration: none;
                    padding: 15px 0;
                    font-weight: 500;
                    position: relative;
                    transition: color 0.3s;
                }

                .nav-links a:hover {
                    color: #1e3a8a;
                }

                .nav-links a::after {
                    content: '';
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 0;
                    height: 2px;
                    background-color: #1e3a8a;
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

                    .bottom-nav {
                        position: relative;
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

        // Mobile menu toggle functionality
        const toggleBtn = this.querySelector('.mobile-menu-toggle');
        const navLinks = this.querySelector('.nav-links');

        if (toggleBtn && navLinks) {
            toggleBtn.addEventListener('click', () => {
                navLinks.classList.toggle('active');
            });
        }
    }
}

customElements.define('my-header', Header);

