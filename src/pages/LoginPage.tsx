import { useState } from "react"
import { PageType } from "./PageType"
import { onDontHaveAnAccountClick, onLoginClick } from "../logic/login-page"

type LoginPageProps = {
    setPageType: (pageType: PageType) => void
}

function LoginPage(props: LoginPageProps) {
    const [login, setLogin] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState("")

    return <>
        <form onSubmit={(e) => onLoginClick(
            e,
            login,
            password,
            props.setPageType,
            setMessage
        )}>
            <div>
                Sign In:
            </div>
            <div>
                <label htmlFor="login">Login:</label>
                <input
                    type="text"
                    name="login"
                    value={login}
                    onChange={e => setLogin(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                />
            </div>
            <div>
                <button>
                    Sign in
                </button>
            </div>
        </form>
        <div>
            <div>
                {message}
            </div>
            <strong onClick={() => onDontHaveAnAccountClick(props.setPageType)}>
                Have no account?
            </strong>
        </div>
    </>
}

export { LoginPage }

