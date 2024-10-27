import { PageType } from "../components/pages/PageType";
import { logOut } from "../ws/service/auth";

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

