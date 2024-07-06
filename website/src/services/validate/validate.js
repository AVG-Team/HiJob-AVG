import {provinces, jobPositionsList} from "../../mocks/data";
export const validateEmail = (email) => {
    if (email.trim().length === 0) {
        return "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
        return "Email is invalid";
    } else {
        return "";
    }
}

export const validatePassword = (password) => {
    if (!password.trim()) {
        return "password is required";
    } else if (password.length < 8) {
        return "Password must be at least 8 characters long";
    } else {
        return "";
    }
}

export const validateFullName = (fullName) => {
    if (!fullName.trim()) {
        return "Full name is required";
    } else if (/\d/.test(fullName)) {
        return "Full name should not contain numbers";
    } else {
        return "";
    }
}

export const validatePhone = (phone) => {
    if (!phone.trim()) {
        return "Phone number is required";
    } else if (!/^\d{10}$/.test(phone)) {
        return "Phone number must be 10 digits";
    } else {
        return "";
    }
}

// Hàm validate address
export const validateAddress = (address) => {
    if (!address.trim()) {
        return "Address is required";
    } else {
        return "";
    }
}

// Hàm validate province
export const validateProvince = (province) => {
    const found = provinces.some(item => item.name === province);
    return found ? "" : "Invalid province";
}

// Hàm validate job position
export const validateJobPosition = (jobPosition) => {
    if (!jobPositionsList.includes(jobPosition)) {
        return "Job position is invalid";
    } else {
        return "";
    }
}

// Hàm validate number
export const validateNumber = (number) => {
    const numberString = String(number).trim();
    if (!numberString.trim()) {
        return "Number is required";
    } else if (isNaN(number)) {
        return "Number must be a number";
    } else {
        return "";
    }
}

// Hàm validate skills
export const validateSkills = (skills, skillsList) => {
    const skillArray = skills.split(",").map(skill => skill.trim());
    for (let skill of skillArray) {
        if (!skillsList.includes(skill)) {
            return "Skill '" + skill + "' is invalid";
        }
    }
    return "";
}

// Hàm validate link GitHub và LinkedIn
export const validateLink = (link) => {
    if (!link.trim()) {
        return "Link is required";
    } else if (!/^https?:\/\/(?:www\.)?github\.com\/\S*$/.test(link) && !/^https?:\/\/(?:www\.)?linkedin\.com\/\S*$/.test(link)) {
        return "Invalid link format";
    } else {
        return "";
    }
}

export const validateFile = (file) => {
    if (!file) {
        return "File is required";
    } else if (file.size > 10 * 1024 * 1024) {
        return "File size must be smaller than 10MB";
    } else {
        return "";
    }
}