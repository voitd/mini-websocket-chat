import React from 'react';
import { Alert, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearError,
  selectError,
  selectLoadingState,
  selectShowStatus
} from '../../slices/alertSlice';

const AlertModal = () => {
  const dispatch = useDispatch();

  const error = useSelector(selectError);
  const isShown = useSelector(selectShowStatus);
  const isLoading = useSelector(selectLoadingState);

  const handleClose = () => {
    dispatch(clearError());
  };

  const renderHeader = () => (
    <>
      <Alert.Heading> {error}</Alert.Heading>
      <p>Try again in a few minutes</p>
    </>
  );

  return (
    <Modal show={isShown} onHide={handleClose}>
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
