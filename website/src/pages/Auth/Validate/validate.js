export const validateEmail = (email) => {
    if (email.trim().length === 0) {
        return "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
        return "Email is invalid";
    } else {
        return ""; // Trả về chuỗi rỗng nếu không có lỗi
    }
}

export const validatePassword = (password) => {
    if (!password.trim()) {
        return "password is required";
    } else if (password.length < 8) {
        return "Password must be at least 8 characters long";
    } else {
        return ""; // Trả về chuỗi rỗng nếu không có lỗi
    }
}