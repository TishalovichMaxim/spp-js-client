import { useState } from "react"
import { Task, FileInfo } from "../model/task"
import { PageType } from "./PageType"
import { AttachedFile } from "./components/AttachedFile"
import { onAttachFile, onDeleteTask, onDeleteAttachedFile, onUpdateTask } from "../logic/task-page"
import Navbar from "./components/Navbar"

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
    const [attachMessage, setAttachMessage] = useState("")

    //const onTaskUpdate = (e: any) => {
    //    e.preventDefault()

    //    if (
    //        title.length == 0
    //        && content.length == 0
    //        && date === ""
    //    ) {
    //        setUpdateMessage("Invalid input...")
    //        return
    //    }

    //    fetch(
    //        URL_BASE + "tasks/" + task.id,
    //        {
    //            method: "PUT",
    //            headers: {
    //                "Content-Type": "application/json",
    //            },
    //            body: JSON.stringify({
    //                title: title,
    //                content: content,
    //                status:  status,
    //                completionDate: date
    //            }),
    //        }
    //    )
    //    .then(
    //        async (res) => {
    //            if (res.status == 200) {
    //                setUpdateMessage("Task successfully updated")
    //            } else {
    //                const errorInfo = await res.json()
    //                setUpdateMessage(errorInfo.message)
    //            }
    //        },
    //        () => {
    //            setUpdateMessage("An error occured...")
    //        }
    //    )
    //}

    const updatedTask = new Task(task.id, "", status, title, content, date, [])
    
    const attachedFilesContent = attachedFiles.map(
        (fileInfo: FileInfo, i: number) =>
            AttachedFile({
                taskId: task.id,
                fileInfo: fileInfo,
                deleteAttachedFile: () => onDeleteAttachedFile(
                    task.id,
                    i,
                    attachedFiles,
                    setAttachedFiles,
                    props.setPageType,
                )
            })
    )

    return (
        <>
            <Navbar setPageType={props.setPageType}/>
            <form onSubmit={(event) => {
                    onUpdateTask(event, updatedTask, setUpdateMessage, props.setPageType)
                }
            }>
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
                    />
                </div>
            </form>
            <div>
                <h3>
                    Delete task:
                </h3>
                <button
                    onClick={() => onDeleteTask(task.id, props.setPageType)}
                >
                    Delete
                </button>
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
                <button
                    onClick={
                        () => onAttachFile(
                            fileForAttachment,
                            task.id,
                            attachedFiles,
                            setAttachMessage,
                            setAttachedFiles,
                            props.setPageType
                        )
                    }
                >
                    Attach
                </button>
            </div>
            <div>
                <h3>Attached files:</h3>
                { attachedFilesContent }
            </div>
        </>
    )
}

export { TaskPage }

