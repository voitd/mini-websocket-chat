import { Button, Card } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import React from 'react';

import { showModal } from '../slices/modalSlice';
import Channels from './Channels';

const Sidebar = () => {
  const dispatch = useDispatch();

  const { t } = useTranslation();

  const handleShowModal = () => {
    dispatch(showModal('adding'));
  };

  return (
    <Card border="info" className="h-100">
      <Card.Header className="d-flex justify-content-between font-weight-bold">
        <span className="mt-1">{t('titles.channels')}</span>
        <Button variant="outline" size="sm" onClick={handleShowModal}>
          <span role="img" aria-label="add">
            ➕
          </span>
        </Button>
      </Card.Header>
      <Card.Header className="h-100">
        <Channels />
      </Card.Header>
    </Card>
  );
};
export default Sidebar;
