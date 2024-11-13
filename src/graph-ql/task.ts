import { Task } from "../model/task"
import { Config } from "../config/config"
import { AuthError } from "../logic/service/auth/auth-error"

const getTasksQuery = () => `
{
    tasks {
        id
        statusName
        status
        title
        content
        completionDate
        attachedFiles {
            id
            name
        }
    }
}
`

async function getTasks(): Promise<Task[]> {
    let resp: Response

    resp = await fetch(
        Config.GraphQlUrl,
        {
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                query: getTasksQuery()
            }),
            credentials: "include",
            method: "POST",
            
        }
    )

    if (resp.status == 401) {
        throw new AuthError()
    }

    const respJson = await resp.json()

    if (respJson.errors !== undefined) {
        throw new Error()
    }

    return respJson.data.tasks
}

const getDeleteTaskQuery = (id: number) => `
mutation {
    deleteTask(id: ${id}) {
        id
    }
}
`

async function deleteTask(id: number) {
    let resp: Response

    resp = await fetch(
        Config.GraphQlUrl,
        {
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                query: getDeleteTaskQuery(id)
            }),
            credentials: "include",
            method: "POST",
            
        }
    )
    
    if (resp.status == 401) {
        throw new AuthError()
    }

    const respJson = await resp.json()

    if (respJson.errors !== undefined) {
        throw new Error()
    }
}

const getAddTaskQuery = (task: Task) => `
mutation {
    addTask(
        input: {
            title: "${task.title}",
            content: "${task.content}",
            status: ${task.status},
            completionDate: "${task.completionDate}"
        }
    ) {
        id
        statusName
        status
        title
        content
        completionDate
        attachedFiles {
            id
            name
        }
    }
}
`

async function addTask(task: Task) {
    let resp: Response

    resp = await fetch(
        Config.GraphQlUrl,
        {
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                query: getAddTaskQuery(task)
            }),
            credentials: "include",
            method: "POST",
        }
    )

    if (resp.status == 401) {
        throw new AuthError()
    }

    const respJson = await resp.json()

    if (respJson.errors !== undefined) {
        throw new Error()
    }
}

const getUpdateTaskQuery = (task: Task) => `
mutation {
    updateTask(
        id: ${task.id},
        input: {
            title: "${task.title}",
            content: "${task.content}",
            status: ${task.status},
            completionDate: "${task.completionDate}"
        }
    ) {
        id
        statusName
        status
        title
        content
        completionDate
        attachedFiles {
            id
            name
        }
    }
}
`

async function updateTask(task: Task) {
    let resp = await fetch(
        Config.GraphQlUrl,
        {
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                query: getUpdateTaskQuery(task)
            }),
            credentials: "include",
            method: "POST",
        }
    )

    if (resp.status == 401) {
        throw new AuthError()
    }

    const respJson = await resp.json()

    if (respJson.errors !== undefined) {
        throw new Error()
    }
}

const getDeleteAttachedFileQuery = (taskId: number, fileId: string) => `
mutation {
    deleteFile(
        taskId: ${taskId},
        fileId: "${fileId}"
    ) {
        id
    }
}
`
async function deleteAttachedFile(
    taskId: number,
    fileId: string,
) {
    const resp = await fetch(
        Config.GraphQlUrl,
        {
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                query: getDeleteAttachedFileQuery(taskId, fileId)
            }),
            credentials: "include",
            method: "POST",
        }
    )

    if (resp.status == 401) {
        throw new AuthError()
    }

    const respJson = await resp.json()

    if (respJson.errors !== undefined) {
        throw new Error()
    }
}

export { getTasks, deleteTask, addTask, updateTask, deleteAttachedFile }

