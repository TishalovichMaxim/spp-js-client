import { URL_BASE } from "../../../config/config"

async function logOut() {
    let resp: Response

    try {
        resp = await fetch(
            URL_BASE + "log-out",
            {
                method: "POST",
                credentials: "include",
            }
        )
    } catch (e) {
        throw new Error("Fetch error")
    }

    if (resp.status != 200) {
        throw new Error("Something was wrong")
    }
}

export { logOut }

