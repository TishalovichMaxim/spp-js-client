function validateSignInCredentials(login: string, password: string): boolean {
    return 4 <= login.length
        && login.length <= 30
        && 4 <= password.length
        && password.length <= 30
}

function validateSignUpCredentials(login: string, password: string, repeatedPassword: string): boolean {
    return validateSignInCredentials(login, password)
        && password == repeatedPassword
}

export { validateSignInCredentials, validateSignUpCredentials }

