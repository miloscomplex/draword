import React from 'react';
import ChatBoxInput from '../chatBox/ChatBoxInput';

const ChatsArea = ({
  room: { id, title, chats },
}) => {
  return (
    <div className="messagesArea">
      <h2>{title}</h2>
      <ul>{orderedChats(chats)}</ul>
      <ChatBoxInput room_id={id} />
    </div>
  );
};

export default ChatsArea;

// helpers

const orderedChats = chats => {
  const sortedChats = chats.sort(
    (a, b) => new Date(a.created_at) - new Date(b.created_at)
  );
  return sortedChats.map(chat => {
    return <li key={chat.id}>{chat.text}</li>;
  });
};
