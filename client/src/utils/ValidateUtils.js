export default class ValidateUtils {
    static validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    static validateUsername(username) {
        return username.length >= 1 && username.length <= 20;
    }

    static validatePassword(password) {
        const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$.!%*#?&])[A-Za-z\d@$!%*#?&.:\\]{8,}$/;
        return passwordRegex.test(password);
    }
}
