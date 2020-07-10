import React from 'react';
import { Formik, Form, Field } from 'formik';
import { connect } from 'react-redux';
import { uniqueId } from 'lodash';

const NewMessageForm = () => {
  const actionCreators = {
    addMessage: actions.addMessage
  };

  const handleSubmit = async (values) => {
    const { addMessage } = this.props;
    await addMessage({ id: uniqueId(), text: values });
  };

  return (
    <Formik
      initialValues={{
        message: 'message'
      }}
      onSubmit={(values) => {
        // same shape as initial values
        console.log(values);
      }}>
      <Form className="p-2">
        <Field name="message" />
        <button className="btn btn-outline-info" type="submit">
          Send
        </button>
      </Form>
    </Formik>
  );
};

const mapStateToProps = (state) => {
  console.log(state);
};

export default connect(mapStateToProps)(NewMessageForm);
