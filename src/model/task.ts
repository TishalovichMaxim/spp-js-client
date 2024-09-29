enum TaskStatus {
    TODO,
    IN_PROGRESS,
    DONE,
}

class FileInfo {

    constructor(
        public id: string,
        public name: string,
    ) {
    }

}

class Task {

    constructor(
        public id: number,
        public statusName: string,
        public status: TaskStatus,
        public title: string,
        public content: string,
        public completionDate: string,
        public attachedFiles: FileInfo[]
    ) {
    }

}

export { Task, TaskStatus, FileInfo }

