import { useState } from 'react'
import AddTaskPage from './pages/AddTaskPage'
import { PageType } from './pages/PageType'
import { TasksPage } from './pages/TasksPage'
import { TaskPage } from './pages/TaskPage'
import { Task } from './model/task'
import { RegistrationPage } from './pages/RegistrationPage'
import { LoginPage } from './pages/LoginPage'

let chosenTask: Task | undefined = undefined

function App() {
    const [pageType, setPageType] = useState(PageType.Tasks)

    let content
    if (pageType == PageType.Tasks) {
        content = <TasksPage 
            selectTask={(t: Task)=>chosenTask=t}
            setPageType={setPageType}
        />
    } else if (pageType == PageType.Task) {
        content = <TaskPage
            task={chosenTask!}
            setPageType={setPageType}
        />
    } else if (pageType == PageType.AddTask) {
        content = <AddTaskPage setPageType={setPageType} />
    } else if (pageType == PageType.Login) {
        content = <LoginPage setPageType={setPageType} />
    } else {
        content = <RegistrationPage setPageType={setPageType} />
    }

    return (
        <>
            { content }
        </>
    )
}

export default App

