import React from 'react';
import { useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import { selectShowStatus } from '../reducers/alertSlice';
import Sidebar from './Sidebar';
import Chat from './Chat';
import Alert from './modals/Alert';

const App = () => {
  const isShown = useSelector(selectShowStatus);

  return (
    <Row className="h-100 pb-3">
      <Col lg={3} className="px-1">
        <Sidebar />
      </Col>
      <Col className="h-100 px-0">
        <Chat />
      </Col>
      {isShown && <Alert />}
    </Row>
  );
};
export default App;
