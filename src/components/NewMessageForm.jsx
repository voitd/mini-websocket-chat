import { Button, Form, FormControl, InputGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import React, { useContext, useEffect, useRef } from 'react';
import * as Yup from 'yup';
import formatISO9075 from 'date-fns/formatISO9075';

import { UserContext } from '../app';
import { createNewMessage } from '../slices/messageSlice';
import { selectChannelId } from '../slices/channelSlice';

const NewMessageForm = () => {
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const currentChannelId = useSelector(selectChannelId);

  const { name, avatar } = useContext(UserContext);

  const { t } = useTranslation();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleSubmit = async (values, actions) => {
    const { text } = values;
    const { resetForm, setSubmitting } = actions;

    const time = new Date();
    const formattedTime = formatISO9075(time, { representation: 'time' });

    const message = {
      channelId: currentChannelId,
      timestamp: formattedTime,
      text,
      name,
      avatar
    };

    await dispatch(createNewMessage(message));
    setSubmitting(false);
    resetForm();
  };

  const formik = useFormik({
    initialValues: {
      text: ''
    },
    validationSchema: Yup.object({
      text: Yup.string().trim().required(t('errors.required'))
    }),
    onSubmit: handleSubmit
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <InputGroup className="p-2">
        <FormControl
          placeholder={t('placeholders.addMessage')}
          id="text"
          name="text"
          ref={inputRef}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.text}
          disabled={formik.isSubmitting}
          isInvalid={!!formik.errors.text}
        />
        <InputGroup.Append>
          <Button
            type="submit"
            disabled={formik.isSubmitting}
            variant={formik.errors.text ? 'outline-danger' : 'outline-info'}>
            {t('buttons.send')}
          </Button>
        </InputGroup.Append>
        {formik.errors.text && (
          <Form.Control.Feedback className="d-flex" type="invalid">
            {formik.errors.text}
          </Form.Control.Feedback>
        )}
      </InputGroup>
    </Form>
  );
};
NewMessageForm.contextType = UserContext;
export default NewMessageForm;
