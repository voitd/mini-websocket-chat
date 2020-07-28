import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, FormGroup, Button } from 'react-bootstrap';
import { selectChannelId, removeChannel } from '../channels/channelSlice';
import { hideModal } from './modalSlice';

// BEGIN
const Rename = () => {
  const dispatch = useDispatch();
  const channelID = useSelector(selectChannelId);

  const onSubmit = (id) => (e) => {
    e.preventDefault();
    try {
      dispatch(removeChannel(id));
      dispatch(hideModal());
    } catch (err) {
      console.error(err);
    }
  };

  const handleCloseModal = () => {
    dispatch(hideModal());
  };

  return (
    <>
      <Modal show onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Remove</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <form onSubmit={onSubmit(channelID)}>
            <FormGroup>You are sure delete this channel?</FormGroup>
            <input type="submit" className="btn btn-danger mr-2" value="Yes" />
            <Button variant="secondary" onClick={handleCloseModal}>
              No
            </Button>{' '}
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Rename;
