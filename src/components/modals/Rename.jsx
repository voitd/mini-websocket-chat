import { unwrapResult } from '@reduxjs/toolkit';
import { useFormik } from 'formik';
import React, { useEffect, useRef } from 'react';
import { FormControl, FormGroup, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { renameChannel, selectChannelId } from '../../reducers/channelSlice';
import { hideModal } from '../../reducers/modalSlice';

// BEGIN
const Rename = () => {
  const dispatch = useDispatch();
  const channelID = useSelector(selectChannelId);

  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleCloseModal = () => {
    dispatch(hideModal());
  };

  const formik = useFormik({
    initialValues: { name: '', id: channelID },
    onSubmit: async (values, { setErrors }) => {
      try {
        const result = await dispatch(renameChannel(values));
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
          <Modal.Title>Rename channel</Modal.Title>
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
              value="Rename"
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

export default Rename;
