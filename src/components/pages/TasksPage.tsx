import { useEffect, useState } from "react"
import { Task, TaskStatus } from "../../model/task"
import TaskPreview from "../sub/TaskPreview"
import { PageType } from "./PageType"
import { getTasks } from "../../logic/tasks-page"
import Navbar from "../sub/Navbar"

type TaskPageProps = {
    selectTask: (task: Task) => void,
    setPageType: (pageType: PageType) => void
}

async function setResponseTasks(setTasks: any, setPageType: (pt: PageType) => void) {
    const tasks = await getTasks(setPageType)
    setTasks(tasks)
}

function TasksPage(props: TaskPageProps) {
    const [tasks, setTasks] = useState<Task[]>([])
    const [filter, setFilter] = useState<TaskStatus | undefined>(undefined)

    useEffect(
        () => { setResponseTasks(setTasks, props.setPageType) },
        []
    )

    const onFilterChange = (newFilterStr: string) => {
        if (newFilterStr == "undefined") {
            setFilter(undefined)
        } else {
            setFilter(Number.parseInt(newFilterStr))
        }
    }

    let content = tasks
        .filter(
            (t: Task) => filter === undefined || t.status == filter)
        .map((t: Task) =>
            TaskPreview(t, ()=>{
                props.selectTask(t)
                props.setPageType(PageType.Task)
            }
        )) 

    return (
        <>
            <Navbar setPageType={props.setPageType} />
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

