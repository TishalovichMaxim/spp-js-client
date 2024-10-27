import { Config } from "../../config/config"
import { socket } from "../init"
import { WsResponseStatus } from "../message-type"

async function signIn(login: string, password: string) {
    let resp: any

    try {
        resp = await socket
            .timeout(Config.ReqTimeout)
            .emitWithAck(
                Config.SignInEvent,
                {
                    login: login,
                    password: password,
                }
            )
    } catch (e) {
        throw new Error("Fetch error")
    }

    if (resp.status != WsResponseStatus.Success) {
        throw new Error("Bad credentials")
    }
}

async function signUp(login: string, password: string) {
    let resp: any

    try {
        resp = await socket
            .timeout(Config.ReqTimeout)
            .emitWithAck(
                Config.SignUpEvent,
                {
                    login: login,
                    password: password,
                }
            )
    } catch (e) {
        throw new Error("Fetch error")
    }

    if (resp.status != WsResponseStatus.Success) {
        throw new Error("Bad credentials")
    }
}

async function logOut() {
    let resp: any

    try {
        resp = await socket
            .timeout(Config.ReqTimeout)
            .emitWithAck(
                Config.LogOutEvent,
                { },
            )
    } catch (e) {
        throw new Error("Fetch error")
    }

    if (resp.status != WsResponseStatus.Success) {
        throw new Error("Something was wrong...")
    }
}

export { signIn, signUp, logOut }

