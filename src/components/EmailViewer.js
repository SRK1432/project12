import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./EmailViewer.css";

const EmailViewer = () => {
  const [emails, setEmails] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://react-http-a0270-default-rtdb.firebaseio.com/Inbox.json")
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          const loadedEmails = [];
          for (const key in data) {
            loadedEmails.push({
              id: key,
              email: data[key].email,
              cc: data[key].cc,
              subject: data[key].subject,
              content: data[key].content,
            });
          }
          setEmails(loadedEmails);
        }
      })
      .catch((error) => {
        console.error("Error fetching emails:", error);
      });
  }, []);

  return (
    <div className="email-viewer">
      <h1>Inbox</h1>
      <button className="compose-button" onClick={() => navigate("/compose")}>
        Compose
      </button>
      <div className="email-list">
        {emails.length > 0 ? (
          emails.map((email) => (
            <div key={email.id} className="email-item">
              <h3>{email.subject}</h3>
              <p>
                <strong>From:</strong> {email.email}
              </p>
              <p>
                <strong>CC:</strong> {email.cc}
              </p>
            </div>
          ))
        ) : (
          <p>No emails found.</p>
        )}
      </div>
    </div>
  );
};

export default EmailViewer;
