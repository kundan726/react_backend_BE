const Joi = require('joi');

const signUpValidationSchema = Joi.object({
    email: Joi.string().email().required(),
    mobile: Joi.string().required(),
    password: Joi.string().required(),
    username: Joi.string().required(),
    role: Joi.string().valid("admin", "user", "seller").required(),

})

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

const resetPasswordSchema = Joi.object({
    email: Joi.string().email().required(),
});

const forgotPasswordSchema = Joi.object({
    email: Joi.string().email().required(),
    otp: Joi.string().required(),
    password: Joi.string().required()
});

const otpSchema = Joi.object({
    otp: Joi.string().required(),
    email: Joi.string().required()
});

const authValidationFunction = (schema)=> (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false, allowUnknown: false });

    if (error) {
        const formattedErrors = {};
        
        error.details.forEach((err) => {
            const field = err.path.join('.');
            formattedErrors[field] = err.message.replace(/['"]/g, '');        });

        return res.status(400).json({
            status: "error",
            message: "Validation failed",
            errors: formattedErrors
        });
    }

    next();
};
module.exports = {
    authValidationFunction,
    signUpValidationSchema,
    loginSchema,
    resetPasswordSchema,
    otpSchema,
    forgotPasswordSchema
}