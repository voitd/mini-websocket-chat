import React from 'react';
import { useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import { selectShowStatus } from '../features/alerts/alertSlice';
import Sidebar from './Sidebar';
import Chat from './Chat';
import Alert from '../features/alerts/Alert';

const App = () => {
  const isShow = useSelector(selectShowStatus);

  return (
    <Row className="h-100 pb-3">
      <Col lg={3}>
        <Sidebar />
      </Col>
      <Col className="h-100">
        <Chat />
      </Col>
      {isShow && <Alert />}
    </Row>
  );
};
export default App;
