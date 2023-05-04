const Joi = require('joi');

const validateUser = (userData) => {
    const schema = Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        userName: Joi.string().min(8).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required(),
    });
    return schema.validate(userData);
};

const validateUpdateData = (userData) => {
    const schema = Joi.object({
        firstName: Joi.string(),
        lastName: Joi.string(),
        userName: Joi.string().min(8),
        email: Joi.string().email(),
        password: Joi.string().min(8),
    });
    return schema.validate(userData);
}

const validateLogin = (loginUserData) => {
    const schema = Joi.object({
        userName: Joi.string().required(),
        password: Joi.string().required(),
    });
    return schema.validate(loginUserData);
};

module.exports = {
    validateUser,
    validateLogin,
    validateUpdateData
}
