import { defaultUser } from "../data/defaultUser";

let attempts = 0;
let isLocked = false;

const UserService = {
    handleInvalidLogin: function (msg, useCustomMessage = false) {
        const message = useCustomMessage ? msg : 'Oops! A ' + msg + ' is needed to login.';
        window.alert(message);

        if (attempts >= 2) {
            isLocked = true;
            // todo lock form with setTimeout
        } else {
            attempts += 1;
            isLocked = false;
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


        if (defaultUser.username !== username && pass !== defaultUser.password) {
            this.handleInvalidLogin('Uh no! Looks like the username & password do not match. Please re-enter and try again.', true);
        }

        window.alert('Successfully logged in. Welcome!');

    }
}

export default UserService;