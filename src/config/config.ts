const URL_BASE = "http://localhost:18080/"

const Config = {
    WsHost: "ws://localhost:28080",

    ReqTimeout: 5_000,

    SignInEvent: "sign-in",
    SignUpEvent: "sign-up",
    LogOutEvent: "log-out",
    GetTasksEvent: "get-tasks",
    AddTaskEvent: "add-task",
    UpdateTaskEvent: "update-task",
    DeleteTaskEvent: "delete-task",
    AttachFileEvent: "attach-file",
    DeleteAttachedFileEvent: "delete-attached-file",
    DownloadFileEvent: "download-file",
}

export { Config, URL_BASE }

