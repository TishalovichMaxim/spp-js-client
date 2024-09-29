import { useState } from "react"
import { Task, FileInfo } from "../model/task"
import { urlBase } from "../config/config"
import { PageType } from "./PageType"
import { AttachedFile } from "./components/AttachedFile"
import axios from "axios"

type TaskPageParams = {
    task: Task,
    setPageType: (pageType: PageType) => void
}

function TaskPage(props: TaskPageParams) {
    const task = props.task

    const [title, setTitle] = useState(task.title)
    const [content, setContent] = useState(task.content)
    const [status, setStatus] = useState(task.status)
    const [date, setDate] = useState(task.completionDate)

    const [attachedFiles, setAttachedFiles] = useState(task.attachedFiles)

    const [fileForAttachment, setFileForAttachment] = useState<File | undefined>(undefined)

    const [updateMessage, setUpdateMessage] = useState("")
    const [deleteMessage, setDeleteMessage] = useState("")
    const [attachMessage, setAttachMessage] = useState("")

    const updateTask = async function() {
        fetch(
            urlBase + "tasks/" + task.id,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: title,
                    content: content,
                    status:  status,
                    completionDate: date
                }),
            }
        )
        .then(
            async (res) => {
                if (res.status == 200) {
                    setUpdateMessage("Task successfully updated")
                } else {
                    const errorInfo = await res.json()
                    setUpdateMessage(errorInfo.message)
                }
            },
            (err) => {
                setUpdateMessage("An error occured...")
            }
        )
    }

    const deleteTask = async function() {
        fetch(
            urlBase + "tasks/" + task.id,
            {
                method: "DELETE",
            }
        )
        .then(
            async (res) => {
                if (res.status == 204) {
                    props.setPageType(PageType.Tasks)
                } else {
                    const errorInfo = await res.json()
                    setDeleteMessage(errorInfo.message)
                }
            },
            (err) => {
            }
        )
    }

    const attachFile = async function() {
        if (!fileForAttachment) {
            setAttachMessage("Choose file before attachment...")
            return
        }

        const formData = new FormData()
        
        formData.append("file", fileForAttachment)

        try {
            const res = await axios.post(urlBase + "tasks/" + task.id + "/files", formData)

            if (res.status == 201) {
                const fileInfo: FileInfo = res.data
                setAttachedFiles([...attachedFiles, fileInfo])
                setAttachMessage("File attached successfully")
            } else {
                setAttachMessage("Error in attachment...")
            }
        } catch(e) {
            setAttachMessage("Error in attachment... (server)")
        }
    }

    const deleteAttachedFile = async (index: number) => {
        const fileInfo = attachedFiles[index]

        const url = urlBase + "tasks/" + task.id + "/files/" + fileInfo.id
        const res = await fetch(url, {method: "DELETE"})

        if (res.status == 204) {
            const newAttachedFiles = [
                ...attachedFiles.slice(0, index),
                ...attachedFiles.slice(index + 1, attachedFiles.length)
            ]
            setAttachedFiles(newAttachedFiles)
        }
    }

    return (
        <>
            <div>
                <div>
                    Update task info:
                </div>
                <div>
                    <label htmlFor="title">Title: </label>
                    <input
                        type="text"
                        name="title"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="content">Content: </label>
                    <input
                        type="text"
                        name="content"
                        value={content}
                        onChange={e => setContent(e.target.value)}
                        required 
                    />
                </div>
                <div>
                    <label htmlFor="status-select">Task status:</label>
                    <select
                        name="status-select"
                        value={status}
                        onChange={e => setStatus(Number.parseInt(e.target.value))}
                    >
                        <option value="0">TODO</option>
                        <option value="1">In progress</option>
                        <option value="2">Done</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="completion-date">Completion date: </label>
                    <input
                        type="date"
                        name="completion-date"
                        value={date}
                        onChange={e => setDate(e.target.value)}
                        required
                    />
                </div>
                <div>
                    {updateMessage}
                </div>
                <div>
                    <input
                        type="submit"
                        value="Update"
                        onClick={updateTask}
                    />
                </div>
            </div>
            <div>
                <h3>
                    Delete task:
                </h3>
                <div>
                    {deleteMessage}
                </div>
                <button onClick={deleteTask}>Delete</button>
            </div>
            <div>
                <h3>
                    Attach file:
                </h3>
                <div>
                    <label htmlFor="file" style={{display: "block"}}>Choose file to upload:</label>
                    <input
                        type="file"
                        name="file"
                        onChange={e => setFileForAttachment(e.target.files![0])}
                    />
                </div>
                <div>
                    {attachMessage}
                </div>
                <button onClick={attachFile}>Attach</button>
            </div>
            <div>
                <h3>Attached files:</h3>
                {
                    attachedFiles.map(
                        (fileInfo: FileInfo, i: number) =>
                            AttachedFile({
                                taskId: task.id,
                                fileInfo: fileInfo,
                                deleteAttachedFile: () => deleteAttachedFile(i)
                            })
                    )
                }
            </div>
        </>
    )
}

export { TaskPage }

