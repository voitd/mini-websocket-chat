import React from 'react';
import { Card, InputGroup, FormControl, Button } from 'react-bootstrap';

const Chat = (props) => {
  const renderMessage = () => {
    return (
      <Card.Text>
        <strong>Coder:</strong> Hi there!
      </Card.Text>
    );
  };
  return (
    <Card border="info" className="h-100">
      <Card.Header># general</Card.Header>
      <Card.Body>
        <Card.Text>{renderMessage()}</Card.Text>
      </Card.Body>
      <Card.Footer className="text-muted">
        <InputGroup className="p-2">
          <FormControl
            placeholder="Text message..."
            aria-label="text meassage"
            aria-describedby="basic-addon2"
          />
          <InputGroup.Append>
            <Button variant="outline-info">Send</Button>
          </InputGroup.Append>
        </InputGroup>
      </Card.Footer>
    </Card>
  );
};

export default Chat;
