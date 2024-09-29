import { PageType } from "../PageType"

type PageTypeChanger = (pt: PageType) => void

type NavbarParams = { changePageType: PageTypeChanger }

function Navbar(params: NavbarParams) {
    return (
        <>
            <nav>
                <ul>
                    <li onClick={() => params.changePageType(PageType.Tasks)}>
                        Tasks
                    </li>
                    <li onClick={() => params.changePageType(PageType.AddTask)}>
                        Add task
                    </li>
                </ul>
            </nav>
        </>
    )
}

export default Navbar

