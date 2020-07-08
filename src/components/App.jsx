import React, { Fragment } from 'react';

import { Row, Col } from 'react-bootstrap';
import Sidebar from './Sidebar';
import Chat from './Chat';

const App = ({ channels, currentChannelId, messages }) => {
  return (
    <Row className="h-75 p-3">
      <Col lg={3}>
        <Sidebar channels={channels} currentChannelId={currentChannelId} />
      </Col>
      <Col lg={9}>
        <Chat messages={messages} />
      </Col>
    </Row>
  );
};
export default App;
