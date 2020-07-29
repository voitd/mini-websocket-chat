import React, { useContext } from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { Form, InputGroup, FormControl, Button } from 'react-bootstrap';
import { selectChannelId } from '../channels/channelSlice';
import { createNewMessage } from './messageSlice';
import { UserContext } from '../../app';

const time = new Date();
const formattedTime = time.toLocaleString('ru', { hour: 'numeric', minute: 'numeric' });

const NewMessageForm = () => {
  const dispatch = useDispatch();
  const currentChannelId = useSelector(selectChannelId);
  const user = useContext(UserContext);

  const formik = useFormik({
    initialValues: {
      message: ''
    },
    onSubmit: (values, { resetForm }) => {
      const message = {
        channelId: currentChannelId,
        timestamp: formattedTime,
        nickname: user.name,
        text: values.message,
        avatar: user.avatar
      };
      dispatch(createNewMessage(message));
      resetForm();
    }
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <InputGroup className="p-2">
        <FormControl
          placeholder="Type message..."
          id="message"
          name="message"
          onChange={formik.handleChange}
          value={formik.values.message}
          required
        />

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
