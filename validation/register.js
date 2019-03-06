const Validator = require('validator');

module.exports = function validateRegisterInput(data) {
    let errors = {};

    if(!Validator.isLength(data.name, { min: 1, max: 30})){
        errors.name = "Name must be between t and 30 characters";
    }

    return {
        errors,
        isValid: errors
    }
}