const ERROR_CODE = {
    EMAIL_NOT_FOUND: 'User with this email was not found',
    INVALID_PASSWORD: 'Wrong password',
    auth: 'Please log in first'
};

export function error(code) {
    return ERROR_CODE[code] ? ERROR_CODE[code] : 'Unknown error';
}