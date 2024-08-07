import React, { useState } from "react";
import './EmailViewer.css';
import { useNavigate } from "react-router-dom";

const EmailViewer = () => {
  const navigate = useNavigate();
  const [mails, setMails] = useState([
    {
      id: 1,
      sender: "kapse",
      subject: "spliteWise",
      time: "8:00AM",
      Unread: true,
      body: "This is the body of the email",
    },
    {
      id: 2,
      sender: "Ronny",
      subject: "Ecommerce",
      time: "8:00AM",
      Unread: true,
      body: "This is the body of the email",
    },
    {
      id: 3,
      sender: "Sam",
      subject: "splie",
      time: "6:00AM",
      Unread: false,
      body: "This is the body of the email",
    },
    {
      id: 4,
      sender: "Ram",
      subject: "Aplie",
      time: "6:50PM",
      Unread: true,
      body: "This is the body of the email",
    },
  ]);

  const [sentMails, setSentMails] = useState([
    { id: 5,sender: "You",   subject: "Meeting Agenda", time: "9:00AM", Unread: false, body: "This is the body of the sent email", },
    { id: 6, sender: "You",  subject: "Project Update", time: "10:30AM", Unread: false, body: "This is the body of the sent email", },
    { id: 7, sender: "You",  subject: "Project ", time: "1:30AM", Unread: false, body: "This is the body of the sent email", },

  ]);

  const [selectedMail, setSelectedMail] = useState(null);
  const [viewSent, setViewSent] = useState(false);

  const handleMailClick = (mail) => {
    setSelectedMail(mail);
    const updatedMails = mails.map((m) => {
      if (m.id === mail.id) {
        return { ...m, Unread: false };
      }
      return m;
    });
    setMails(updatedMails);
  };

  const deleteMailHandler = (mail, e) => {
    e.stopPropagation();
    if (viewSent) {
      setSentMails(sentMails.filter((m) => m.id !== mail.id));
    } else {
      setMails(mails.filter((m) => m.id !== mail.id));
    }
  };

  const MailItem = ({ mail }) => (
    <div
      className={`mail-item ${mail.Unread ? "unread" : ""}`}
      onClick={() => handleMailClick(mail)}
    >
      {mail.Unread && <span className="blue-dot"></span>}
      <div className="mail-sender">{mail.sender}</div>
      <div className="mail-subject">{mail.subject}</div>
      <div className="mail-time">{mail.time}</div>
      {selectedMail === mail && (
        <div className="mail-body">{mail.body}</div>
      )}
      <button onClick={(e) => deleteMailHandler(mail, e)}>Delete</button>
    </div>
  );

  return (
    <>
      <div className="container">
        <header className="header">
          <h1>Yahoo! Mail</h1>
          <input
            type="text"
            placeholder="Find messages, documents, photos or people"
          />
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
          </svg>
        </header>
      </div>

      <button type="button" onClick={() => navigate('/compose')}>Compose</button>
      <button onClick={() => setViewSent(false)}>Inbox ({mails.length})</button>
      <button>Unread ({mails.filter((mail) => mail.Unread).length})</button>
      <button onClick={() => setViewSent(true)}>Sent ({sentMails.length})</button>
      <div className="mail-list">
        {viewSent
          ? sentMails.map((mail) => <MailItem key={mail.id} mail={mail} />)
          : mails.map((mail) => <MailItem key={mail.id} mail={mail} />)}
      </div>
    </>
  );
};

export default EmailViewer;
