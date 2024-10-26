import { URL_BASE } from "../../config/config";
import { FileInfo } from "../../model/task";

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
        const resp = await fetch(URL_BASE + "tasks/" + taskId + "/files/" + fileInfo.id)

        const blob = await resp.blob()

        let url = window.URL.createObjectURL(blob);
        let a = document.createElement('a');
        a.href = url;
        a.download = fileInfo.name;
        a.click();
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

