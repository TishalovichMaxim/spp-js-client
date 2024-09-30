import { useState } from "react"
import { urlBase } from "../config/config"
import { Task, TaskStatus } from "../model/task"
import TaskPreview from "./components/TaskPreview"
import { PageType } from "./PageType"

type TaskPageProps = {
    selectTask: (task: Task) => void,
    setPageType: (pageType: PageType) => void
}

enum StatusFilter {
    NONE,
    DONE,
    IN_PROGRESS,
    TDDO,
}

function TasksPage(props: TaskPageProps) {
    const [tasks, setTasks] = useState([])
    const [filter, setFilter] = useState<TaskStatus | undefined>(undefined)

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

    const filteredTasks = tasks.filter(
        (t: Task) => filter === undefined || t.status == filter
    )

    const onFilterChange = (newFilterStr: string) => {
        if (newFilterStr == "undefined") {
            setFilter(undefined)
        } else {
            setFilter(Number.parseInt(newFilterStr))
        }
    }

    return (
        <>
            <h1>
                Tasks
            </h1>
            <div>
                <h2>
                    Filter:
                </h2>
                <select
                    value={filter}
                    onChange={e => onFilterChange(e.target.value)}
                >
                    <option value="undefined">None</option>
                    <option value="0">TODO</option>
                    <option value="1">In progress</option>
                    <option value="2">Done</option>
                </select>
            </div>
            {
                filteredTasks
                    .map((t: Task) =>
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

