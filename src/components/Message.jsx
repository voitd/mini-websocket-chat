import React, { Component } from 'react';
import { connect } from 'react-redux';

const time = new Date();
const formattedTime = time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric' });

export class Message extends Component {
  render() {
    const name = this.context;
    const { messages } = this.props;
    console.log('NewMessageForm -> render -> name', name);
    return messages.map(({ nickName, text }) => (
      <span key={formattedTime}>
        {formattedTime} <strong>{nickName}</strong>
        {text}
      </span>
    ));
  }
}

const mapStateToProps = (state) => {
  const props = {
    messages: state.messages
  };
  return props;
};

export default connect(mapStateToProps)(Message);
