import { useFormik } from 'formik';
import React, { useContext, useEffect, useRef } from 'react';
import { Button, Form, FormControl, InputGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { UserContext } from '../../app';
import { selectError, selectLoadingState } from '../alerts/alertSlice';
import { selectChannelId } from '../channels/channelSlice';
import { createNewMessage } from './messageSlice';

const time = new Date();
const formattedTime = time.toLocaleString('ru', { hour: 'numeric', minute: 'numeric' });

const NewMessageForm = () => {
  const dispatch = useDispatch();
  const currentChannelId = useSelector(selectChannelId);
  const error = useSelector(selectError);
  const isLoading = useSelector(selectLoadingState);
  const isError = !!error;
  const { name, avatar } = useContext(UserContext);

  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleSubmit = (values, { resetForm, setSubmitting }) => {
    const message = {
      channelId: currentChannelId,
      timestamp: formattedTime,
      nickname: name,
      text: values.message,
      avatar
    };

    dispatch(createNewMessage(message));
    resetForm();
    setSubmitting(false);
  };

  const formik = useFormik({
    initialValues: {
      message: ''
    },
    onSubmit: handleSubmit
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
          onBlur={formik.handleBlur}
          value={formik.values.message}
          disabled={formik.isSubmitting}
          isInvalid={isError}
          required
        />
        <InputGroup.Append>
          <Button type="submit" variant="outline-info" disabled={isLoading}>
            Send
          </Button>
        </InputGroup.Append>
        {isError && <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>}
      </InputGroup>
    </Form>
  );
};
NewMessageForm.contextType = UserContext;
export default NewMessageForm;
