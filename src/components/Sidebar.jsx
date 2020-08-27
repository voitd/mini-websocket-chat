import React from 'react';
import { useDispatch } from 'react-redux';
import { Button, Card } from 'react-bootstrap';
import Channels from './Channels';
import { showModal } from '../slices/modalSlice';

const Sidebar = () => {
  const dispatch = useDispatch();

  const handleShowModal = () => {
    dispatch(showModal('adding'));
  };

  return (
    <Card border="info" className="h-100">
      <Card.Header className="d-flex justify-content-between font-weight-bold">
        <span className="mt-1">CHANNELS</span>
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
