import { URL_BASE } from "../../../config/config"

async function signUp(login: string, password: string) {
    const resp = await fetch(
        URL_BASE + "sign-up",
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

    if (resp.status == 400) {
        throw new Error("Bad credentials...")
    }

    if (resp.status != 201) {
        throw new Error("Sorry, an error occured...")
    }
}

export { signUp, }

