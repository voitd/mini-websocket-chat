import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { Modal, FormGroup, FormControl } from 'react-bootstrap';
import { createChannel } from '../../reducers/channelSlice';
import { hideModal } from '../../reducers/modalSlice';

// BEGIN
const Add = () => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: { name: '' },
    onSubmit: (values) => {
      dispatch(createChannel(values.name));
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
          <Modal.Title>Create channel</Modal.Title>
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
            <input type="submit" className="btn btn-primary" value="Create" />
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Add;
