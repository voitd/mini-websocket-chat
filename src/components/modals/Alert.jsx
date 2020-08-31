import { Alert, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import React from 'react';

import {
  clearError,
  selectError,
  selectLoadingState,
  selectShowStatus
} from '../../slices/alertSlice';

const AlertModal = () => {
  const dispatch = useDispatch();

  const { t } = useTranslation();

  const error = useSelector(selectError);
  const isShown = useSelector(selectShowStatus);
  const isLoading = useSelector(selectLoadingState);

  const handleClose = () => {
    dispatch(clearError());
  };

  const renderHeader = () => (
    <>
      <Alert.Heading> {error}</Alert.Heading>
      <p>{t('errors.title')}</p>
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
