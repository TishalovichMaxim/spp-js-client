import { useEffect, useState } from "react"
import { urlBase } from "../config/config"
import { Task, TaskStatus } from "../model/task"
import TaskPreview from "./components/TaskPreview"
import { PageType } from "./PageType"

type TaskPageProps = {
    selectTask: (task: Task) => void,
    setPageType: (pageType: PageType) => void
}

enum TasksLoadingState {
    LOADING,
    ERROR_OCCURED,
    SUCCESSFULLY_LOADED,
}

function TasksPage(props: TaskPageProps) {
    const [state, setState] = useState(TasksLoadingState.LOADING)
    const [tasks, setTasks] = useState([])
    const [tasksStartedLoading, setTasksStartedLoading] = useState(false)
    const [filter, setFilter] = useState<TaskStatus | undefined>(undefined)

    const selectTask = props.selectTask
    const setPageType = props.setPageType

    if (!tasksStartedLoading) {
        setTasksStartedLoading(true)
        fetch(
            urlBase + "tasks",
            { method: 'get' }
        )
        .then(
            (resp) => {
                console.log(resp)
                return resp.json()
            },
        )
        .then(
            (tasks) => {
                console.log(tasks)
                setTasks(tasks)
                setState(TasksLoadingState.SUCCESSFULLY_LOADED)
            },
        )
        .catch(() => {
            if (state == TasksLoadingState.LOADING) {
                setState(TasksLoadingState.ERROR_OCCURED)
            }
            console.log("Error during loading")
        })

    }

    const onFilterChange = (newFilterStr: string) => {
        if (newFilterStr == "undefined") {
            setFilter(undefined)
        } else {
            setFilter(Number.parseInt(newFilterStr))
        }
    }

    let content
    
    if (state == TasksLoadingState.LOADING) {
        content = "Loading tasks..."
    } else if (state == TasksLoadingState.SUCCESSFULLY_LOADED) {
        const filteredTasks = tasks.filter(
            (t: Task) => filter === undefined || t.status == filter
        )

        content = filteredTasks
            .map((t: Task) =>
                TaskPreview(t, ()=>{
                    selectTask(t)
                    setPageType(PageType.Task)
                }
            )) 
    } else {
        content = "An error occured..."
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
            <div>
                { content }
            </div>
        </>
    )
}

export { TasksPage }

