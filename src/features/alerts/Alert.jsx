import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Alert, Modal } from 'react-bootstrap';
import { selectError, selectLoadingState, clearError } from './alertSlice';

const AlertModal = () => {
  const [show, setShow] = useState(true);

  const dispatch = useDispatch();

  const error = useSelector(selectError);
  const isLoading = useSelector(selectLoadingState);

  const handleClose = () => {
    setShow(false);
    dispatch(clearError());
  };

  const renderHeader = () => (
    <>
      <Alert.Heading> {error}</Alert.Heading>
      <p>Try again in a few minutes</p>
    </>
  );

  return (
    <Modal show={show} onHide={handleClose}>
      <Alert
        variant={isLoading ? 'warning' : 'danger'}
        className="mb-0"
        onClose={handleClose}
        show
        dismissible>
        {isLoading ? 'Loading...' : renderHeader()}
      </Alert>
    </Modal>
  );
};

export default AlertModal;
