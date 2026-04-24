// Event Management Website - LocalStorage Database
// Provides user registration, authentication, and admin user management

const DB_KEY = 'event_management_db';

function initDB() {
    const existing = localStorage.getItem(DB_KEY);
    if (!existing) {
        const defaultDB = {
            users: [
                {
                    id: 'admin-1',
                    name: 'Administrator',
                    email: 'admin@admin.com',
                    password: 'admin123',
                    phone: '',
                    role: 'admin',
                    createdAt: new Date().toISOString()
                }
            ],
            events: []
        };
        localStorage.setItem(DB_KEY, JSON.stringify(defaultDB));
    }
    return getDB();
}

function getDB() {
    const raw = localStorage.getItem(DB_KEY);
    return raw ? JSON.parse(raw) : initDB();
}

function saveDB(db) {
    localStorage.setItem(DB_KEY, JSON.stringify(db));
}

// --- User Operations ---

function registerUser(name, email, password, phone) {
    const db = getDB();
    const existing = db.users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
        return { success: false, message: 'Email already registered. Please use a different email or login.' };
    }
    const newUser = {
        id: 'user-' + Date.now(),
        name,
        email: email.toLowerCase(),
        password,
        phone: phone || '',
        role: 'user',
        createdAt: new Date().toISOString()
    };
    db.users.push(newUser);
    saveDB(db);
    return { success: true, message: 'Registration successful!', user: { id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role } };
}

function loginUser(email, password, rememberMe) {
    const db = getDB();
    const user = db.users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
    if (!user) {
        return { success: false, message: 'Invalid email or password.' };
    }
    const sessionUser = { id: user.id, name: user.name, email: user.email, role: user.role };
    const storage = rememberMe ? localStorage : sessionStorage;
    storage.setItem('currentUser', JSON.stringify(sessionUser));
    return { success: true, message: 'Login successful!', user: sessionUser };
}

function logoutUser() {
    localStorage.removeItem('currentUser');
    sessionStorage.removeItem('currentUser');
    return { success: true, message: 'Logged out successfully.' };
}

function getCurrentUser() {
    const raw = sessionStorage.getItem('currentUser') || localStorage.getItem('currentUser');
    return raw ? JSON.parse(raw) : null;
}

function isLoggedIn() {
    return !!getCurrentUser();
}

function isAdmin() {
    const user = getCurrentUser();
    return user && user.role === 'admin';
}

// --- Admin Operations ---

function getAllUsers() {
    const db = getDB();
    return db.users.map(u => ({
        id: u.id,
        name: u.name,
        email: u.email,
        phone: u.phone,
        role: u.role,
        createdAt: u.createdAt
    }));
}

function deleteUser(userId) {
    const db = getDB();
    const currentUser = getCurrentUser();
    if (!currentUser || currentUser.role !== 'admin') {
        return { success: false, message: 'Access denied. Admin only.' };
    }
    if (userId === currentUser.id) {
        return { success: false, message: 'Cannot delete your own admin account.' };
    }
    const idx = db.users.findIndex(u => u.id === userId);
    if (idx === -1) {
        return { success: false, message: 'User not found.' };
    }
    db.users.splice(idx, 1);
    saveDB(db);
    return { success: true, message: 'User deleted successfully.' };
}

function updateUserRole(userId, newRole) {
    const db = getDB();
    const currentUser = getCurrentUser();
    if (!currentUser || currentUser.role !== 'admin') {
        return { success: false, message: 'Access denied. Admin only.' };
    }
    const user = db.users.find(u => u.id === userId);
    if (!user) {
        return { success: false, message: 'User not found.' };
    }
    user.role = newRole;
    saveDB(db);
    return { success: true, message: 'User role updated successfully.' };
}

// Expose to window for inline event handlers
window.DB = {
    init: initDB,
    register: registerUser,
    login: loginUser,
    logout: logoutUser,
    getCurrentUser,
    isLoggedIn,
    isAdmin,
    getAllUsers,
    deleteUser,
    updateUserRole
};

