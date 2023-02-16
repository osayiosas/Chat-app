import { useEffect,useState } from "react";
import { addDoc, collection, serverTimestamp, onSnapshot, query, where, snapshotEqual} from "firebase/firestore";
import { auth, db } from "../firebase-config";
import "../styles/Chat.css"

export const Chat = (props) =>
{

    const {room} = props
    
    const [newMessage, setNewMessage] = useState("");
    
    const messagesRef = collection(db, " messages")
    


    useEffect(() =>
    {
        const querymessages = query(messagesRef, where("room", "==", room));
        onSnapshot(querymessages, (snapshot) =>
        {
            console.log("New Message")
        })
    }, [])

  const handleSubmitForm = async (e) => {
      e.preventDefault();
      if (newMessage === "") return;

      await addDoc(messagesRef, {
          text: newMessage,
          createAt: serverTimestamp(),
          user: auth.currentUser.displayName,
          room,

      })

      setNewMessage("")
    };
    
  return (
    <div className="chat-app">
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
