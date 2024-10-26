import { onLogOut } from "../../logic/navbar"
import { PageType } from "../PageType"

type PageTypeChanger = (pt: PageType) => void

type NavbarProps = { setPageType: PageTypeChanger }

function Navbar(props: NavbarProps) {
    return (
        <>
            <nav>
                <ul>
                    <li onClick={() => props.setPageType(PageType.Tasks)}>
                        Tasks
                    </li>
                    <li onClick={() => props.setPageType(PageType.AddTask)}>
                        Add task
                    </li>
                    <li onClick={() => onLogOut(props.setPageType)}>
                        Log out
                    </li>
                </ul>
            </nav>
        </>
    )
}

export default Navbar

