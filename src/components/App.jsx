import React from 'react';

import { Row, Col } from 'react-bootstrap';
import Sidebar from './Sidebar';
import Chat from './Chat';

const App = () => {
  return (
    <Row className="h-75 p-3">
      <Col lg={3}>
        <Sidebar />
      </Col>
      <Col lg={9}>
        <Chat />
      </Col>
    </Row>
  );
};
export default App;
