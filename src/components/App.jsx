import React from 'react';

import { useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import { selectError, selectLoadingState } from '../features/alerts/alertSlice';
import Sidebar from './Sidebar';
import Chat from './Chat';
import Alert from '../features/alerts/Alert';

const App = () => {
  const isLoading = useSelector(selectLoadingState);
  const isError = useSelector(selectError);
  const isShow = isError || isLoading;
  return (
    <>
      {isShow && <Alert />}
      <Row className="h-75 p-0">
        <Col lg={3}>
          <Sidebar />
        </Col>
        <Col lg={9}>
          <Chat />
        </Col>
      </Row>
    </>
  );
};
export default App;
