// utils/identityServer.js
class AuthService {
    constructor() {
        this.role = localStorage.getItem('role_name') 
        this.isAuthenticated = !!localStorage.getItem('serviceToken'); // Check if token exists
    }

    isAuthenticated() {
        return this.isAuthenticated;
    }

    getRole() {
        return this.role;
    }

    login(role) {
        this.isAuthenticated = true;
        this.role = role;
        localStorage.setItem('role_name', role); // Store role in localStorage
    }

    logout() {
        this.isAuthenticated = false;
        this.role = 'user'; // Default role after logout
        localStorage.removeItem('role_name'); // Remove role from localStorage
    }
}

export default AuthService;
