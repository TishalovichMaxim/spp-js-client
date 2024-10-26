import { Task } from '../model/task'
import { PageType } from '../pages/PageType'
import { AuthError } from './service/auth/auth-error'
import { addTask, validateTask } from './service/task'

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

