

import React from 'react';
import ChatBoxInput from '../chatBox/ChatBoxInput';

const ChatsArea = ({
  conversation: { id, title, messages },
}) => {
  return (
    <div className="messagesArea">
      <h2>{title}</h2>
      <ul>{orderedMessages(messages)}</ul>
      <ChatBoxInput conversation_id={id} />
    </div>
  );
};

export default ChatsArea;

// helpers

const orderedMessages = messages => {
  const sortedMessages = messages.sort(
    (a, b) => new Date(a.created_at) - new Date(b.created_at)
  );
  return sortedMessages.map(message => {
    return <li key={message.id}>{message.text}</li>;
  });
};
