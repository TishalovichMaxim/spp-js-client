import { Fragment } from "react/jsx-runtime"
import { Task } from "../../model/task"

function TaskPreview(task: Task, onTaskClick: () => void) {
    return (
        <Fragment key={task.id}>
            <div>
                <div onClick={onTaskClick}>
                    Task
                </div>
                <ul>
                    <li>
                        { task.title }
                    </li>
                    <li>
                        { task.content }
                    </li>
                    <li>
                        { task.statusName }
                    </li>
                    <li>
                        { task.completionDate }
                    </li>
                </ul>
            </div>
        </Fragment>
    )
}

export default TaskPreview

