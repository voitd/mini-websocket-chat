import React from 'react';
import { useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import { selectShowStatus } from '../reducers/alertSlice';
import Sidebar from './Sidebar';
import Chat from './Chat';
import Alert from './Alert';

const App = () => {
  const isShown = useSelector(selectShowStatus);

  return (
    <Row className="h-100 pb-3">
      <Col lg={3}>
        <Sidebar />
      </Col>
      <Col className="h-100">
        <Chat />
      </Col>
      {isShown && <Alert />}
    </Row>
  );
};
export default App;
