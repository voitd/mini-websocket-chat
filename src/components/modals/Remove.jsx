import { unwrapResult } from '@reduxjs/toolkit';
import React from 'react';
import { Button, FormGroup, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { removeChannel, selectChannelId } from '../../slices/channelSlice';
import { hideModal } from '../../slices/modalSlice';

// BEGIN
const Rename = () => {
  const dispatch = useDispatch();
  const channelID = useSelector(selectChannelId);

  const onSubmit = (id) => async (e) => {
    e.preventDefault();
    try {
      const result = await dispatch(removeChannel(id));
      unwrapResult(result);
      dispatch(hideModal());
    } catch (err) {
      throw new Error(err);
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
