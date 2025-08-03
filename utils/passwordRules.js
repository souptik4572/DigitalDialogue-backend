import owasp from 'owasp-password-strength-test';

owasp.config({
  minLength: 0,
  maxLength: 128,
  allowPassphrases: true,
  minOptionalTestsToPass: 0,
});

export const complexityOptions = {
    min: parseInt(process.env.PASSWORD_MIN_LENGTH || '8'),
    max: parseInt(process.env.PASSWORD_MAX_LENGTH || '128'),
    lowerCase: parseInt(process.env.PASSWORD_MIN_LOWERCASE || '1'),
    upperCase: parseInt(process.env.PASSWORD_MIN_UPPERCASE || '1'),
    numeric: parseInt(process.env.PASSWORD_MIN_NUMBERS || '1'),
    symbol: parseInt(process.env.PASSWORD_MIN_SYMBOLS || '1'),
    requirementCount: parseInt(process.env.PASSWORD_REQUIREMENT_COUNT || '3')
};

export const checkCustomPasswordRules = (password) => {
    const { errors } = owasp.test(password);

    if (process.env.PASSWORD_BLOCK_COMMON === 'true') {
        if (errors.some(e => e.toLowerCase().includes('common'))) {
            return 'Password is too common. Please choose a stronger one.';
        }
    }

    if (process.env.PASSWORD_BLOCK_SEQUENTIAL === 'true') {
        if (errors.some(e => e.toLowerCase().includes('sequential'))) {
            return 'Password contains sequential characters.';
        }
    }

    if (process.env.PASSWORD_BLOCK_REPEATED === 'true') {
        if (errors.some(e => e.toLowerCase().includes('repeated') || e.toLowerCase().includes('character'))) {
            return 'Password contains repeated characters or patterns.';
        }
    }
    
    return null;
};