import React, { useState, useEffect } from "react";
import './EmailViewer.css';
import { useNavigate } from "react-router-dom";

const EmailViewer = () => {
  const navigate = useNavigate();
  const [mails, setMails] = useState([]);
  const [sentMails, setSentMails] = useState([]);
  const [selectedMail, setSelectedMail] = useState(null);
  const [viewSent, setViewSent] = useState(false);

  useEffect(() => {
    const fetchMails = async () => {
      // Call Firebase API to fetch mails
      const response = await fetch('https://mail-box-a25f0-default-rtdb.firebaseio.com/mails');
      const data = await response.json();
      setMails(data);
    };
    fetchMails();
    const intervalId = setInterval(fetchMails, 20000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const fetchSentMails = async () => {
      // Call Firebase API to fetch sent mails
      const response = await fetch('https://mail-box-a25f0-default-rtdb.firebaseio.com/sentMails');
      const data = await response.json();
      setSentMails(data);
    };
    fetchSentMails();
    const intervalId = setInterval(fetchSentMails, 20000);
    return () => clearInterval(intervalId);
  }, []);

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