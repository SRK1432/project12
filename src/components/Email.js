import React, { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import './email.css';
import { EditorState } from 'draft-js';

const Email = () => {
    const [email, setEmail] = useState('');
    const [cc, updateCc] = useState('');
    const [subject, setSubject] = useState('');
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [emailuser, setEmailuser] = useState([]);

    const submitHandler = (e) => {
        e.preventDefault();
        let emailData = { email, cc, subject, body: editorState.getCurrentContent().getPlainText() };
        fetch(`https://mail-box-a25f0-default-rtdb.firebaseio.com/Inbox.json`,
            {
                method: 'POST',
                body: JSON.stringify(emailData),
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            .then((response) => response.json())
            .then((data) => {
                setEmailuser((prevEmailuser) => [...prevEmailuser, emailData])
                console.log(emailData);
                setEmail('');
                updateCc('');
                setSubject('');
                setEditorState(EditorState.createEmpty());
            })
            .catch((error) => {
                console.log(error);
            })
    }
    return (
        <form className="email-box" onSubmit={submitHandler}>
            <label>To:</label>
            <input className="to" type="email" value={email} onChange={(e) => { setEmail(e.target.value) }} />

            <hr />

            <label>CC:</label>
            <input className="cc" type="text" value={cc} onChange={(e) => { updateCc(e.target.value) }} />

            <hr />

            <label>Subject:</label>
            <input className="subject" type="text" value={subject} onChange={(e) => { setSubject(e.target.value) }} />

            <hr />

            <div className="body-container">
                <Editor
                    editorState={editorState}
                    onEditorStateChange={setEditorState}
                    toolbarClassName="toolbarClassName"
                    wrapperClassName="wrapperClassName"
                    editorClassName="editorClassName"
                />
            </div>

            <hr />

            <button className="button" type="submit">Send</button>
        </form>
    );
};

export default Email;