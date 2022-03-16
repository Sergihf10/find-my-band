import { useState } from "react";
import ChatList from "../ChatList/ChatList";
import Header from "../Header/Header";
import "./chatRoom.css";

const ChatRoom: React.FC = () => {
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<string[]>([]);

  const handleMessage = (event: any) => {
    setMessage(event.target.value);
  };

  const handleMessages = (event: any) => {
    setMessages([...messages, message]);
  };

  return (
    <div>
      <Header />
      <div className="container mContainer">
        <div className="message_container">
          <div className="chatLog">
            {messages.map((mess) => {
              return (
                <div>
                  <p className="userMessage">{mess}</p>
                  <br />
                </div>
              );
            })}
          </div>
          <div className="inputArea">
            <input
              type="textarea"
              name="textValue"
              placeholder="type message here..."
              className="messageArea"
              size={100}
              onChange={handleMessage}
            />
            <button className="sendMessage" onClick={handleMessages}>
              {" "}
              send{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
