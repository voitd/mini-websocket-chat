import { useFormik } from 'formik';
import React, { useContext, useEffect, useRef } from 'react';
import { unwrapResult } from '@reduxjs/toolkit';
import { Button, Form, FormControl, InputGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { UserContext } from '../app';
import { selectChannelId } from '../reducers/channelSlice';
import { createNewMessage } from '../reducers/messageSlice';

const time = new Date();
const formattedTime = time.toLocaleString('ru', { hour: 'numeric', minute: 'numeric' });

const NewMessageForm = () => {
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const currentChannelId = useSelector(selectChannelId);

  const { name, avatar } = useContext(UserContext);

  const setFocus = () => inputRef.current.focus();

  useEffect(setFocus);

  const handleSubmit = async (values, actions) => {
    const { text } = values;
    const { resetForm, setSubmitting, setErrors } = actions;

    if (!text.trim()) return;

    const message = {
      channelId: currentChannelId,
      timestamp: formattedTime,
      text,
      name,
      avatar
    };

    try {
      const result = await dispatch(createNewMessage(message));
      unwrapResult(result);
      resetForm();
      setSubmitting(false);
    } catch (err) {
      setErrors(err.message);
    }
  };

  const formik = useFormik({
    initialValues: {
      text: ''
    },
    onSubmit: handleSubmit
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <InputGroup className="p-2">
        <FormControl
          placeholder="Type message..."
          id="text"
          name="text"
          ref={inputRef}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.text}
          disabled={formik.isSubmitting}
          required
        />
        <InputGroup.Append>
          <Button type="submit" variant="outline-info" disabled={formik.isSubmitting}>
            Send
          </Button>
        </InputGroup.Append>
      </InputGroup>
    </Form>
  );
};
NewMessageForm.contextType = UserContext;
export default NewMessageForm;
