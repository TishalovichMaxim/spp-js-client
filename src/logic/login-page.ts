import { PageType } from "../components/pages/PageType"
import { signIn } from '../ws/service/auth'

function onDontHaveAnAccountClick(setPageType: (pt: PageType) => void) {
    setPageType(PageType.Registration)
}

async function onLoginClick(
    event: any,
    login: string,
    password: string,
    setPageType: (pt: PageType) => void,
    setMessage: (message: string) => void,
) {
    event.preventDefault()

    try {
        await signIn(login, password)
    } catch (e) {
        console.log(e)
        setMessage("Invalid credentials...")
        return
    }

    setPageType(PageType.Tasks)
}

export { onDontHaveAnAccountClick, onLoginClick }

