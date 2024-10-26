import { URL_BASE } from '../../../config/config'

async function signIn(login: string, password: string) {
    let resp: Response

    try {
        resp = await fetch(
            URL_BASE + "sign-in",
            {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    login: login,
                    password: password
                }),
            }
        )
    } catch (e) {
        throw new Error("Fetch error")
    }

    if (resp.status != 200) {
        throw new Error("Bad credentials")
    }
}

export { signIn, }

