let attempts = 0;
let isLocked = false;

const UserService = {
    handleInvalidLogin: function (message) {
        window.alert('Oops! A ' + message + ' is needed to login.');

        if (attempts >= 2) {
            isLocked = true;
            // todo lock form with settimeout
        } else {
            attempts += 1;
        }
    },
    login: function (username, pass) {
        if (!username && !pass) {
            this.handleInvalidLogin('username and password');
            return;
        }

        if (!username) {
            this.handleInvalidLogin('username');
            return;
        }

        if (!pass) {
            this.handleInvalidLogin('password');
            return;
        }

        window.alert('Successfully logged in. Welcome!');

    }
}

export default UserService;