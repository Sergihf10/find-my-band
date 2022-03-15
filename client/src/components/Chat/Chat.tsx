import React from 'react';
import { Avatar } from '@mui/material';
import './Chat.css';

interface ChatProps {
  firstName: string;
  lastMsg: string;
  profPic: string;
  timestamp: string;
}

const Chat: React.FC<ChatProps> = ({
  firstName,
  lastMsg,
  profPic,
  timestamp,
}) => {
  return (
    <div className="single-chat">
      <Avatar className="chat-avatar" alt={firstName} src={profPic} />
      <div className="chat-deetz">
        <h3 className="first-name">{firstName}</h3>
        <p className="last-msg">{lastMsg}</p>
      </div>
      <p className="timestamp">{timestamp}</p>
    </div>
  );
};

export default Chat;
