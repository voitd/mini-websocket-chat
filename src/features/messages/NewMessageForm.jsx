import { useFormik } from 'formik';
import { unwrapResult } from '@reduxjs/toolkit';
import React, { useContext, useRef, useEffect } from 'react';
import { Button, Form, FormControl, InputGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { UserContext } from '../../app';
import { createError } from '../alerts/alertSlice';
import { selectChannelId } from '../channels/channelSlice';
import { createNewMessage } from './messageSlice';

const time = new Date();
const formattedTime = time.toLocaleString('ru', { hour: 'numeric', minute: 'numeric' });

const NewMessageForm = () => {
  const dispatch = useDispatch();
  const currentChannelId = useSelector(selectChannelId);
  const { name, avatar } = useContext(UserContext);

  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      message: ''
    },
    onSubmit: (values, { resetForm, setSubmitting }) => {
      const message = {
        channelId: currentChannelId,
        timestamp: formattedTime,
        nickname: name,
        text: values.message,
        avatar
      };
      dispatch(createNewMessage(message))
        .then(unwrapResult)
        .catch((err) => dispatch(createError(err.message)))
        .finally(() => {
          setSubmitting(false);
          resetForm();
        });
    }
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <InputGroup className="p-2">
        <FormControl
          placeholder="Type message..."
          id="message"
          name="message"
          ref={inputRef}
          onChange={formik.handleChange}
          value={formik.values.message}
          isInvalid={!!formik.errors.message}
          disabled={formik.isSubmitting}
          required
        />
        <Form.Control.Feedback type="invalid">{formik.errors.message}</Form.Control.Feedback>
        <InputGroup.Append>
          <Button type="submit" variant="outline-info">
            Send
          </Button>
        </InputGroup.Append>
      </InputGroup>
    </Form>
  );
};
NewMessageForm.contextType = UserContext;
export default NewMessageForm;
