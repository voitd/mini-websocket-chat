import React from 'react';
import { Card } from 'react-bootstrap';
import NewMessageForm from './NewMessageForm';
import Message from './Message';

const Chat = () => {
  return (
    <Card border="info" className="h-100">
      <Card.Header># general</Card.Header>
      <Card.Body>
        <Message />
      </Card.Body>
      <Card.Footer className="text-muted">
        <NewMessageForm />
      </Card.Footer>
    </Card>
  );
};
export default Chat;
