import { useState } from "react"
import { PageType } from "./PageType"
import { onSignUpClick, onHaveAnAccountClick } from "../logic/registration-page"

type RegistrationPageProps = {
    setPageType: (pageType: PageType) => void
}

function RegistrationPage(props: RegistrationPageProps) {
    const [login, setLogin] = useState("")
    const [password, setPassword] = useState("")
    const [repeatedPassword, setRepeatedPassword] = useState("")
    const [message, setMessage] = useState("")

    return <>
        <form onSubmit={(e) => onSignUpClick(e, login, password, repeatedPassword, props.setPageType, setMessage)}>
            <div>
                Registraion:
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
                <label htmlFor="retryPassword">Retry passsword:</label>
                <input
                    type="password"
                    name="retryPassword"
                    value={repeatedPassword}
                    onChange={e => setRepeatedPassword(e.target.value)}
                    required
                />
            </div>
            <div>
                <div>
                    {message}
                </div>
                <button>
                    Sign up
                </button>
            </div>
        </form>
        <div>
            <strong onClick={() => onHaveAnAccountClick(props.setPageType)}>
                Already have an account?
            </strong>
        </div>
    </>
}

export { RegistrationPage }

