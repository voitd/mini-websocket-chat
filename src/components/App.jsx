import React from 'react';

import { useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import {
  selectChannelIsLoading,
  selectChannelError,
} from '../features/channels/channelSlice';
import Sidebar from './Sidebar';
import Chat from './Chat';
import Alert from './Alert';

const App = () => {
  const isLoading = useSelector(selectChannelIsLoading);
  const isError = useSelector(selectChannelError);

  return (
    <>
      {(isError || isLoading) && <Alert />}
      <Row className='h-75 p-0'>
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
