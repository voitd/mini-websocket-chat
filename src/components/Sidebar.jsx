import React from 'react';
import { useDispatch } from 'react-redux';
import { Button, Card } from 'react-bootstrap';
import Channels from '../features/channels/Channels';
import { showModal } from '../features/modals/modalSlice';

const Sidebar = () => {
  const dispatch = useDispatch();

  const handleShowModal = () => {
    dispatch(showModal('adding'));
  };

  return (
    <Card border="info" className="h-100">
      <Card.Header className="d-flex justify-content-between font-weight-bold">
        CHANNELS
        <Button variant="outline-info" size="sm" onClick={handleShowModal}>
          <span>+</span>
        </Button>{' '}
      </Card.Header>
      <Card.Body>
        <Channels />
      </Card.Body>
    </Card>
  );
};
export default Sidebar;
