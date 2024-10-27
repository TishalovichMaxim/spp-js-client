import { io } from "socket.io-client";
import { Config } from "../config/config";

const socket = io(Config.WsHost, {
    reconnectionDelayMax: 10_000,
});

export { socket }

