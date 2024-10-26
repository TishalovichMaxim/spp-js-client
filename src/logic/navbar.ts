import { PageType } from "../pages/PageType";
import { logOut } from "./service/auth/log-out";

async function onLogOut(setPageType: (pt: PageType) => void) {
    try {
        await logOut()
    } catch (e: any) {
        console.log("Logout error")
        return
    }

    setPageType(PageType.Login)
}

export { onLogOut }

