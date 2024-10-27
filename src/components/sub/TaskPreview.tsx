import { Fragment } from "react/jsx-runtime"
import { Task } from "../../model/task"

function TaskPreview(task: Task, onTaskClick: () => void) {
    return (
        <Fragment key={task.id}>
            <div style={ {marginTop: 20} }>
                <div onClick={onTaskClick}>
                    Task
                </div>
                <ul style={ { marginTop: 0 } }>
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

