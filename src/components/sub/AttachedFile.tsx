import { Config } from "../../config/config"
import { FileInfo } from "../../model/task"
import { socket } from "../../ws/init"

type AttachedFileProps = {
    taskId: number
    fileInfo: FileInfo,
    deleteAttachedFile: () => void
}

function AttachedFile(props: AttachedFileProps) {
    const taskId = props.taskId
    const fileInfo = props.fileInfo

    const fileNameStyle = {
        display: "inline"
    }

    const btnStyle = {
        display: "inline",
    }
        
    const downloadFile = async () => {
        try {
            const resp = await socket
                .timeout(Config.ReqTimeout)
                .emitWithAck(
                    Config.DownloadFileEvent,
                    {
                        taskId: taskId,
                        fileId: fileInfo.id,
                    }
                )

            let url = window.URL.createObjectURL(new Blob([resp]));
            let a = document.createElement('a');
            a.href = url;
            a.download = fileInfo.name;
            a.click();
        } catch (e: any) {
            console.log(e.message)
        }
    }

    return <div key={props.fileInfo.id}>
        <div style={fileNameStyle} onClick={downloadFile}>
            { props.fileInfo.name }
        </div>
        <button style={btnStyle} onClick={props.deleteAttachedFile}>
            x
        </button>
    </div>
}

export { AttachedFile }

