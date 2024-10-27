import { useState } from "react"
import { Task, TaskStatus } from "../../model/task"
import { onAddTask } from "../../logic/add-task-page"
import { PageType } from "./PageType"
import Navbar from "../sub/Navbar"

type AddTaskPageProps = {
    setPageType: (pt: PageType) => void
}

function AddTaskPage(props: AddTaskPageProps) {
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [status, setStatus] = useState(TaskStatus.TODO)
    const [date, setDate] = useState("")
    const [infoMessage, setInfoMessage] = useState("")

    const task = new Task(-1, "", status, title, content, date, [])
    return (
        <>
            <Navbar setPageType={props.setPageType} />
            <form 
                onSubmit={(e) => onAddTask(
                    e,
                    task,
                    setInfoMessage,
                    props.setPageType
                )
            }>
                <div>
                    <div>
                        Title:
                    </div>
                    <input
                        type="text"
                        name="title"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <div>
                        Content: 
                    </div>
                    <input
                        type="text"
                        name="content"
                        value={content}
                        onChange={e => setContent(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <div>
                        Task status: 
                    </div>

                    <select
                        value={status}
                        onChange={e => setStatus(Number.parseInt(e.target.value))}
                    >
                        <option value="0">TODO</option>
                        <option value="1">In progress</option>
                        <option value="2">Done</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="completionDate">Completion date:</label>
                    <input
                        value={date}
                        type="date"
                        name="completionDate"
                        onChange={e => setDate(e.target.value)}
                        required
                    />
                </div>
                <div>
                    { infoMessage }
                </div>
                <div>
                    <button>
                        Add task
                    </button>
                </div>
            </form>
        </>
    )
}

export default AddTaskPage

