import { unwrapResult } from '@reduxjs/toolkit';
import { useFormik } from 'formik';
import React, { useEffect, useRef } from 'react';
import { FormControl, FormGroup, Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { createChannel } from '../../slices/channelSlice';
import { hideModal } from '../../slices/modalSlice';

// BEGIN
const Add = () => {
  const dispatch = useDispatch();

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleCloseModal = () => {
    dispatch(hideModal());
  };

  const formik = useFormik({
    initialValues: { name: '' },
    onSubmit: async (values, { setErrors }) => {
      try {
        const result = await dispatch(createChannel(values.name));
        unwrapResult(result);
        dispatch(hideModal());
      } catch (err) {
        setErrors(err);
      }
    },
    onReset: () => handleCloseModal()
  });

  return (
    <>
      <Modal show onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Create channel</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
            <FormGroup>
              <FormControl
                name="name"
                required
                ref={inputRef}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                disabled={formik.isSubmitting}
              />
            </FormGroup>
            <input
              type="submit"
              className="btn btn-primary mr-2"
              value="Create"
              disabled={formik.isSubmitting}
            />
            <input
              type="reset"
              className="btn btn-secondary"
              value="Cancel"
              disabled={formik.isSubmitting}
            />
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Add;
