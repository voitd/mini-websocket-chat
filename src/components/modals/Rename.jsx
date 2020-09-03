import { FormControl, FormGroup, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import React, { useEffect, useRef } from 'react';
import { hideModal } from '../../slices/modalSlice';
import { renameChannel, selectChannelId } from '../../slices/channelSlice';

const Rename = () => {
  const dispatch = useDispatch();
  const channelID = useSelector(selectChannelId);

  const { t } = useTranslation();

  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleCloseModal = () => {
    dispatch(hideModal());
  };

  const formik = useFormik({
    initialValues: { name: '', id: channelID },
    onReset: () => handleCloseModal(),
    onSubmit: async (values) => {
      try {
        await dispatch(renameChannel(values));
        dispatch(hideModal());
      } catch (err) {
        throw new Error(err);
      }
    }
  });

  return (
    <>
      <Modal show onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{t('titles.channelRename')}</Modal.Title>
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
              value={t('buttons.rename')}
              disabled={formik.isSubmitting}
            />
            <input
              type="reset"
              className="btn btn-secondary"
              value={t('buttons.cancel')}
              disabled={formik.isSubmitting}
            />
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Rename;
