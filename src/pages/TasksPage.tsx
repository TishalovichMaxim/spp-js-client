import { useState } from "react"
import { urlBase } from "../config/config"
import { Task } from "../model/task"
import TaskPreview from "./components/TaskPreview"
import { PageType } from "./PageType"

type TaskPageProps = {
    selectTask: (task: Task) => void,
    setPageType: (pageType: PageType) => void
}

function TasksPage(props: TaskPageProps) {
    const [tasks, setTasks] = useState([])

    const selectTask = props.selectTask
    const setPageType = props.setPageType

    if (tasks.length == 0) {
        fetch(
            urlBase + "tasks",
            { method: 'get' }
        )
        .then(
            (resp) => {
                console.log(resp)
                return resp.json()
            }
        )
        .then(
            (tasks) => {
                console.log(tasks)
                return setTasks(tasks)
            }
        )
    }

    return (
        <>
            <h1>
                Tasks
            </h1>
            {
                tasks.map((t: Task) =>
                    TaskPreview(t, ()=>{
                        selectTask(t)
                        setPageType(PageType.Task)
                    }
                )) 
            }
        </>
    )
}

export { TasksPage }

