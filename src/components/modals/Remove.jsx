import React from 'react';
import { Button, FormGroup, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation, Trans } from 'react-i18next';
import { hideModal } from '../../slices/modalSlice';
import { removeChannel, selectChannelId, selectCurrentChannel } from '../../slices/channelSlice';

// BEGIN
const Rename = () => {
  const dispatch = useDispatch();
  const channelID = useSelector(selectChannelId);
  const { name } = useSelector(selectCurrentChannel);

  const { t } = useTranslation();

  const onSubmit = (id) => async (e) => {
    e.preventDefault();
    try {
      await dispatch(removeChannel(id));
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
          <Modal.Title>{t('titles.channelRemove')}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <form onSubmit={onSubmit(channelID)}>
            <FormGroup>
              <Trans i18nKey="placeholders.confirmChannelRemove">{{ name }}</Trans>
            </FormGroup>
            <input type="submit" className="btn btn-danger mr-2" value={t('buttons.ok')} />
            <Button variant="secondary" onClick={handleCloseModal}>
              {t('buttons.cancel')}
            </Button>{' '}
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Rename;
