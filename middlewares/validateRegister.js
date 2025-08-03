import Joi from 'joi';
import passwordComplexity from 'joi-password-complexity';
import { checkCustomPasswordRules, complexityOptions } from '../utils/passwordRules.js';

const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: passwordComplexity(complexityOptions).required(),
});

export const validateRegister = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details[0].message
        });
    }

    const customRuleError = checkCustomPasswordRules(req.body.password);
    if (customRuleError) {
        return res.status(400).json({
            success: false,
            message: customRuleError
        });
    }

    next();
};