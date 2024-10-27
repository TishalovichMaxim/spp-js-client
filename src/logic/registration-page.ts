import { PageType } from "../components/pages/PageType";
import { signUp } from '../ws/service/auth'
import { validateSignUpCredentials } from "./service/auth/validation";

function onHaveAnAccountClick(setPageType: (pt: PageType) => void) {
    setPageType(PageType.Login)
}

async function onSignUpClick(
    event: any,
    login: string,
    password: string,
    repeatedPassword: string,
    setPageType: (pt: PageType) => void,
    setMessage: (message: string) => void,
) {
    event.preventDefault()

    if (!validateSignUpCredentials(login, password, repeatedPassword)) {
        setMessage("Unvalid credetnials...")
        return
    }

    try {
        await signUp(login, password)
    } catch (e) {
        setMessage("Invalid credentials...")
        return
    }

    setPageType(PageType.Tasks)
}

export { onHaveAnAccountClick, onSignUpClick }

