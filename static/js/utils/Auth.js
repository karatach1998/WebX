
class Auth {
    static isAuthenticated() {
        return sessionStorage.getItem('sid') !== null;
    }

    static authenticate(sid) {
        sessionStorage.setItem('sid', sid);
    }

    static deauthenticate() {
        sessionStorage.removeItem('sid');
    }

    static getSid() {
        return sessionStorage.getItem('sid');
    }
}

module.exports = Auth;