
class Auth {
    static isAuthenticated() {
        console.log(localStorage.getItem('token'));
        return sessionStorage.getItem('token') !== null;
    }

    static isAdmin() {
        return sessionStorage.getItem('role') === 'admin';
    }

    static authenticate(token, role) {
        console.log('authenticate');
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('role', role);
    }

    static deauthenticate() {
        console.log('deauthenticate');
        sessionStorage.removeItem('token');
    }

    static getRole() {
        return sessionStorage.getItem('role');
    }
}

module.exports = Auth;