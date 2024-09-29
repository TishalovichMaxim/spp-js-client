import { useState } from 'react'
import AddTaskPage from './pages/AddTaskPage'
import { PageType } from './pages/PageType'
import Navbar from './pages/components/Navbar'
import { TasksPage } from './pages/TasksPage'
import { TaskPage } from './pages/TaskPage'
import { Task } from './model/task'

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
        content = <AddTaskPage />
    }

    return (
        <>
            <Navbar
                changePageType={setPageType}
            />
            { content }
        </>
    )
}

export default App

