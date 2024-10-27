import { FileInfo, Task } from "../../model/task"
import { AuthError } from "../../logic/service/auth/auth-error"
import { InvalidDataError } from "../../logic/service/errors"
import { socket } from "../init"
import { Config } from "../../config/config"
import { InMessageType, WsResponseStatus } from "../message-type"

async function deleteTask(id: number) {
    let resp: any

    try {
        resp = await socket
            .timeout(Config.ReqTimeout)
            .emitWithAck(
                Config.DeleteTaskEvent,
                {
                    id: id,
                }
            )
    } catch (e) {
        throw new Error("Request error...")
    }
    
    if (resp.status == WsResponseStatus.AuthenticationError) {
        throw new AuthError()
    }

    if (resp.status != WsResponseStatus.Success) {
        throw new Error("Something was wrong")
    }
}

async function addTask(task: Task) {
    let resp: any

    try {
        resp = await socket
            .timeout(Config.ReqTimeout)
            .emitWithAck(
                Config.AddTaskEvent,
                {
                    task: {
                        title: task.title,
                        content: task.content,
                        status:  task.status,
                        completionDate: task.completionDate
                    },
                }
            )
    } catch (e) {
        throw new Error("Fetching error...")
    }

    if (resp.status == WsResponseStatus.AuthenticationError) {
        throw new AuthError()
    }

    if (resp.status != WsResponseStatus.Success) {
        throw new InvalidDataError(resp.message)
    }
}

async function attachFile(
    fileForAttachment: File,
    taskId: number,
): Promise<FileInfo> {
    let resp: any
    try {
        resp = await socket
            .timeout(Config.ReqTimeout)
            .emitWithAck(
                Config.AttachFileEvent,
                { 
                    taskId: taskId,
                    fileName: fileForAttachment.name,
                },
                fileForAttachment
            )
    } catch(e) {
        throw new Error("Fetching error...")
    }

    if (resp.status != WsResponseStatus.Success) {
        throw new Error("Something was wrong")
    }

    return resp.fileInfo
}

async function deleteAttachedFile(
    taskId: number,
    fileId: string,
): Promise<FileInfo> {
    let resp: any
    try {
        resp = await socket
            .timeout(Config.ReqTimeout)
            .emitWithAck(
                Config.DeleteAttachedFileEvent,
                { 
                    taskId: taskId,
                    fileId: fileId,
                },
            )
    } catch(e) {
        throw new Error("Fetching error...")
    }

    if (resp.status != WsResponseStatus.Success) {
        throw new Error("Something was wrong")
    }

    return resp.fileInfo
}

async function updateTask(task: Task) {
    let resp: any

    try {
        resp = await socket
            .timeout(Config.ReqTimeout)
            .emitWithAck(
                Config.UpdateTaskEvent,
                {
                    type: InMessageType.UpdateTask,
                    task: {
                        id: task.id,
                        title: task.title,
                        content: task.content,
                        status:  task.status,
                        completionDate: task.completionDate
                    },
                }
            )
    } catch (e) {
        throw new Error("Fetching error...")
    }

    if (resp.status == WsResponseStatus.AuthenticationError) {
        throw new AuthError()
    }

    if (resp.status == WsResponseStatus.InvalidDataError) {
        throw new InvalidDataError(resp.message)
    }
}

async function getTasks(): Promise<Task[]> {
    let resp: any
    try {
        resp = await socket
            .timeout(Config.ReqTimeout)
            .emitWithAck(
                Config.GetTasksEvent,
                {
                }
            )
    } catch (e) {
        throw new Error("Fetching error...")
    }

    if (resp.status == WsResponseStatus.AuthenticationError) {
        throw new AuthError()
    }

    return resp.tasks
}

export { getTasks, addTask, updateTask, deleteTask, attachFile, deleteAttachedFile }

