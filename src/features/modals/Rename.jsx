import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { Modal, FormGroup, FormControl } from 'react-bootstrap';
import { renameChannel, selectChannelId } from '../channels/channelSlice';
import { hideModal } from './modalSlice';

// BEGIN
const Rename = () => {
  const dispatch = useDispatch();
  const channelID = useSelector(selectChannelId);

  const formik = useFormik({
    initialValues: { name: '', id: channelID },
    onSubmit: (values) => {
      dispatch(renameChannel(values));
      dispatch(hideModal());
    }
  });

  const handleCloseModal = () => {
    dispatch(hideModal());
  };

  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <>
      <Modal show onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Rename channel</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <form onSubmit={formik.handleSubmit}>
            <FormGroup>
              <FormControl
                name="name"
                required
                ref={inputRef}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
              />
            </FormGroup>
            <input type="submit" className="btn btn-primary" value="submit" />
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Rename;
