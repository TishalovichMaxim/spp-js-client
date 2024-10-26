import { FileInfo, Task } from "../model/task"
import { PageType } from "../pages/PageType"
import { AuthError } from "./service/auth/auth-error"
import { InvalidDataError } from "./service/errors"
import { deleteAttachedFile, deleteTask, attachFile, updateTask, validateTask } from "./service/task"

async function onUpdateTask(
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
        await updateTask(task)
    } catch (e: any) {
        if (e instanceof AuthError) {
            setPageType(PageType.Login)
            return
        }

        if (e instanceof InvalidDataError) {
            setInfoMessage(e.message)
            return
        }

        setInfoMessage("Something was wrong")
        return
    }

    setInfoMessage("Task sucessfully updated")
}

async function onDeleteAttachedFile(
    taskId: number,
    index: number,
    attachedFiles: FileInfo[],
    setAttachedFiles: (attachedFiles: FileInfo[]) => void,
    setPageType: (pt: PageType) => void,
) {
    try {
        await deleteAttachedFile(taskId, attachedFiles[index].id)
    } catch (e: any) {
        if (e instanceof AuthError) {
            setPageType(PageType.Login)
            return
        }

        return
    }

    const newAttachedFiles = [
        ...attachedFiles.slice(0, index),
        ...attachedFiles.slice(index + 1, attachedFiles.length)
    ]
    setAttachedFiles(newAttachedFiles)
}

async function onDeleteTask(
    taskId: number,
    setPageType: (pt: PageType) => void,
) {
    try {
        await deleteTask(taskId)
    } catch (e: any) {
        if (e instanceof AuthError) {
            setPageType(PageType.Login)
            return
        }

        return
    }

    setPageType(PageType.Tasks)
}

async function onAttachFile(
    fileForAttachment: File | undefined,
    taskId: number,
    attachedFiles: FileInfo[],
    setAttachMessage: (message: string) => void,
    setAttachedFiles: (attachedFiles: FileInfo[]) => void,
    setPageType: (pt: PageType) => void,
) {
    let fileInfo: FileInfo
    try {
        fileInfo = await attachFile(fileForAttachment!, taskId)
    } catch (e: any) {
        if (e instanceof AuthError) {
            setPageType(PageType.Login)
            return
        }

        setAttachMessage("Error in attachment...")
        return
    }

    setAttachedFiles([...attachedFiles, fileInfo])
    setAttachMessage("File attached successfully")
}

export { onDeleteAttachedFile, onDeleteTask, onAttachFile, onUpdateTask }

