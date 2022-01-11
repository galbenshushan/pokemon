const validateJoi = require('@hapi/joi')

const registerValidation = (data) => {
    const schema = {
        first_name: validateJoi.string().min(3).max(255).required().trim(),
        last_name: validateJoi.string().min(3).max(255).required().trim(),
        email: validateJoi.string().min(6).max(255).required().trim().email(),
        password: validateJoi.string().min(10).max(1500).required().trim(),
        verifyPassword: validateJoi.string().min(10).max(1500).required().trim(),
        country: validateJoi.string().min(6).max(255).required().trim(),
        role: validateJoi.number()
    }
    return validateJoi.validate(data, schema)
}

const loginValidation = (data) => {
    const schema = {
        email: validateJoi.string().min(6).max(255).required().trim().email(),
        password: validateJoi.string().min(10).max(1500).required().trim(),
    }
    return validateJoi.validate(data, schema)
}

module.exports ={ registerValidation, loginValidation}