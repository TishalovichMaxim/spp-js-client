import axios, { AxiosResponse } from "axios"
import { URL_BASE } from "../../config/config"
import { FileInfo, Task } from "../../model/task"
import { AuthError } from "./auth/auth-error"
import { InvalidDataError } from "./errors"

function validateTask(task: Task) {
    if (task.title.length <= 4
        || task.content.length <= 4
        || task.completionDate === ""
    ) {
        throw new Error("Invalid input...")
    }
}

async function deleteTask(id: number) {
    let resp: Response

    try {
        resp = await fetch(
            URL_BASE + "tasks/" + id,
            {
                credentials: "include",
                method: "DELETE",
            }
        )
    } catch (e) {
        throw new Error("Fetching error...")
    }
    
    if (resp.status == 401) {
        throw new AuthError()
    }

    if (resp.status != 204) {
        throw new Error("Something was wrong")
    }
}

async function addTask(task: Task) {
    let resp: Response

    try {
        resp = await fetch(
            URL_BASE + "tasks",
            {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: task.title,
                    content: task.content,
                    status:  task.status,
                    completionDate: task.completionDate
                }),
            }
        )

    } catch (e) {
        throw new Error("Fetching error...")
    }

    if (resp.status == 401) {
        throw new AuthError()
    }

    if (resp.status == 400) {
        throw new InvalidDataError(await resp.json())
    }
}

async function updateTask(task: Task) {
    let resp: Response

    try {
        resp = await fetch(
            URL_BASE + "tasks/" + task.id,
            {
                method: "PUT",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: task.title,
                    content: task.content,
                    status:  task.status,
                    completionDate: task.completionDate
                }),
            }
        )

    } catch (e) {
        throw new Error("Fetching error...")
    }

    if (resp.status == 401) {
        throw new AuthError()
    }

    if (resp.status == 400) {
        throw new InvalidDataError(await resp.json())
    }
}

async function getTasks(): Promise<Task[]> {
    let resp: Response
    try {
        resp = await fetch(
            URL_BASE + "tasks",
            {
                credentials: "include",
                method: 'get',
            }
        )
    } catch (e) {
        throw new Error("Fetching error...")
    }

    if (resp.status == 401) {
        throw new AuthError()
    }

    return await resp.json()
}

async function attachFile(
    fileForAttachment: File,
    taskId: number,
): Promise<FileInfo> {
    const formData = new FormData()
    
    formData.append("file", fileForAttachment)

    let resp: AxiosResponse
    try {
        resp = await axios.post(
            URL_BASE + "tasks/" + taskId + "/files",
            formData,
            {
                withCredentials: true
            }
        )
    } catch(e) {
        throw new Error("Fetching error...")
    }

    if (resp.status == 401) {
        throw new AuthError()
    }

    if (resp.status != 201) {
        throw new Error("Something was wrong")
    }

    return resp.data
}

async function deleteAttachedFile(
    taskId: number,
    fileId: string,
) {
    const url = URL_BASE + "tasks/" + taskId + "/files/" + fileId
    const resp = await fetch(
        url,
        {
            method: "DELETE",
            credentials: "include",
        }
    )

    if (resp.status == 401) {
        throw new AuthError()
    }

    if (resp.status != 204) {
        throw new Error("Something was wrong")
    }
}

export { attachFile, getTasks, addTask, updateTask, deleteTask, deleteAttachedFile, validateTask }

