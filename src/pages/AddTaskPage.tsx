import { useState } from "react"
import { TaskStatus } from "../model/task"
import { urlBase } from "../config/config"

function AddTaskPage() {
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [status, setStatus] = useState(TaskStatus.TODO)
    const [date, setDate] = useState("")
    const [infoMessage, setInfoMessage] = useState("")

    const addTask = async function() {
        try {
            const resp = await fetch(
                urlBase + "tasks",
                {
                    method: "POST",
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

            if (resp.status == 201) {
                setInfoMessage("Task successfully added")
            } else if (resp.status == 400) {
                const errorMessage = await resp.json()
                setInfoMessage(errorMessage.message)
            }
        } catch (e) {
            setInfoMessage("An error occured...")
        }
    }

    return (
        <>
            <div>
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
                    <button onClick={addTask}>
                        Add task
                    </button>
                </div>
            </div>
        </>
    )
}

export default AddTaskPage

