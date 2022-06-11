import joi from 'joi';
// Auth Models
export const signUpSquema = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
    confirmPassword: joi.string().required(),
});
export const signInSquema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required(),
});
// Url Models
export const urlSquema = joi.object({
    url: joi.string()
        .regex(/https:\/\//)
        .required(),
});
