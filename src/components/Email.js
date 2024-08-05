import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import './email.css'
const Email=()=>{
    return(
        <>
        <label>To:</label>
        <input className="to">

        </input>
        <hr></hr>
        <label>CC:</label>
        <input className="cc"></input>
        <hr></hr>
        <label>Subject:</label>
        <div className="Body">
        <Editor         toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
        >
            <p className="body"></p>
        </Editor>
        </div>
        <hr></hr>
        <input className="body"></input>
        <hr></hr>
        <button>Send</button>
        </>
    )
}
export default Email