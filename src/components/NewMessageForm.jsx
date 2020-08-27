import { unwrapResult } from '@reduxjs/toolkit';
import { useFormik } from 'formik';
import React, { useContext, useEffect, useRef } from 'react';
import { Button, Form, FormControl, InputGroup, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { UserContext } from '../app';
import { selectChannelId } from '../slices/channelSlice';
import { createNewMessage } from '../slices/messageSlice';

const time = new Date();
const formattedTime = time.toLocaleString('ru', { hour: 'numeric', minute: 'numeric' });

const NewMessageForm = () => {
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const currentChannelId = useSelector(selectChannelId);

  const { name, avatar } = useContext(UserContext);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleSubmit = async (values, actions) => {
    const { text } = values;
    const { resetForm, setSubmitting, setErrors } = actions;

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
    validationSchema: Yup.object({
      text: Yup.string().trim().required('Required')
    }),
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
          isInvalid={!!formik.errors.text}
          required
        />
        <InputGroup.Append>
          <Button
            type="submit"
            disabled={formik.isSubmitting}
            variant={formik.errors.text ? 'outline-danger' : 'outline-info'}>
            Send
          </Button>
        </InputGroup.Append>
        {!!formik.errors.text && (
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
