import { Task } from '../model/task'
import { PageType } from '../components/pages/PageType'
import { AuthError } from './service/auth/auth-error'
import { validateTask } from './service/task'
import { addTask } from '../graph-ql/task'

async function onAddTask(
    event: any,
    task: Task,
    setInfoMessage: (message: string) => void,
    setPageType: (pt: PageType) => void,
) {
    event.preventDefault()

    try {
        validateTask(task)
    } catch (e: any) {
        setInfoMessage(e.message)
        return
    }

    try {
        await addTask(task)
    } catch (e: any) {
        if (e instanceof AuthError) {
            setPageType(PageType.Login)
            return
        }

        setInfoMessage(e.message)
    }

    setInfoMessage("Task successfully added")
}

export { onAddTask }

