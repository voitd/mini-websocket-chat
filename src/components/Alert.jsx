import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Alert, Modal } from 'react-bootstrap';
import {
  selectChannelError,
  selectChannelIsLoading,
} from '../features/channels/channelSlice';

const Error = () => {
  const isLoading = useSelector(selectChannelIsLoading);
  const error = useSelector(selectChannelError);

  const [show, setShow] = useState(true);

  const renderHeader = () => (
    <>
      <Alert.Heading> {error}</Alert.Heading>
      <p>Try again in a few minutes</p>
    </>
  );

  return (
    <Modal show={show}>
      <Alert
        variant={isLoading ? 'warning' : 'danger'}
        className='mb-0'
        onClose={() => setShow(false)}
        show
        dismissible
      >
        {isLoading ? 'Loading...' : renderHeader()}
      </Alert>
    </Modal>
  );
};

export default Error;
