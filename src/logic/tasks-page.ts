import { Task } from "../model/task"
import { PageType } from "../pages/PageType"
import { AuthError } from "./service/auth/auth-error"
import { getTasks as _getTasks } from "./service/task"

async function getTasks(
    setPageType: (pt: PageType) => void,
): Promise<Task[]> {
    try {
        return await _getTasks()
    } catch (e) {
        if (e instanceof AuthError) {
            setPageType(PageType.Login)
            return []
        }

        return []
    }
}

export { getTasks }

