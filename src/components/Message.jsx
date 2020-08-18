import React from 'react';
import Media from 'react-bootstrap/Media';
import { useSelector } from 'react-redux';
import { selectChannelId } from '../channels/channelSlice';
import { selectMessages } from './messageSlice';

const Message = () => {
  const messages = useSelector(selectMessages);
  const currentChannelId = useSelector(selectChannelId);
  const messagesByChannelID = messages.filter((message) => message.channelId === currentChannelId);

  return messagesByChannelID.map(({ timestamp, name, text, avatar, id }) => {
    return (
      <Media key={id}>
        <img width={64} height={64} className=" mr-2 p-1 rounded" src={avatar} alt="Avatar" />
        <Media.Body>
          <h6>
            {name} <small>{timestamp}</small>
          </h6>
          <p>
            <strong>{text}</strong>
          </p>
        </Media.Body>
      </Media>
    );
  });
};

export default Message;
