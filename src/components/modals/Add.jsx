import { FormControl, FormGroup, Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import React, { useEffect, useRef } from 'react';

import { createChannel } from '../../slices/channelSlice';
import { hideModal } from '../../slices/modalSlice';

// BEGIN
const Add = () => {
  const dispatch = useDispatch();

  const { t } = useTranslation();

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleCloseModal = () => {
    dispatch(hideModal());
  };

  const formik = useFormik({
    initialValues: { name: '' },
    onReset: () => handleCloseModal(),
    onSubmit: async ({ name }) => {
      await dispatch(createChannel(name));
      dispatch(hideModal());
    }
  });

  return (
    <>
      <Modal show onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{t('titles.channelAdd')}</Modal.Title>
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
