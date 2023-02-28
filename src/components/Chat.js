import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  serverTimestamp,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { auth, db } from "../firebase-config";
import "../styles/Chat.css";

export const Chat = (props) => {
  const { room } = props;

  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const messagesRef = collection(db, " messages");

  useEffect(() => {
    const querymessages = query(
      messagesRef,
      where("room", "==", room),
    
    );
    const unsucribe = onSnapshot(querymessages, (snapshot) => {
      let messages = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
        
        

      setMessages(messages);
    });
     

    return () => unsucribe();
  }, [messagesRef, room]);

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    if (newMessage === "") return;

    await addDoc(messagesRef, {
      text: newMessage,
      createAt: serverTimestamp(),
      user: auth.currentUser.displayName,
      room,
    });

    setNewMessage("");
  };

  return (
    <div className="chat-app">
      <div className="header">
        <h1>Welcome To:{room.toUpperCase()}</h1>
      </div>

      <div className="messages">
        {messages.map((message) => (
          <div className="message" key={message.id}>
            <span className="user">{message.user} </span>
            {message.text}*{}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmitForm} className="new-message-form">
        <input
          className="new-message-input"
          placeholder="Type your message here"
          onChange={(e) => setNewMessage(e.target.value)}
          value={newMessage}
        />

        <button type="submit" className="send-button">
          Send
        </button>
      </form>
    </div>
  );
};
