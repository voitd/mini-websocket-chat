import React from 'react';
import { Image, Media } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { selectChannelId } from '../slices/channelSlice';
import { selectMessages } from '../slices/messageSlice';

const Message = () => {
  const messages = useSelector(selectMessages);
  const currentChannelId = useSelector(selectChannelId);
  const messagesByChannelID = messages.filter((message) => message.channelId === currentChannelId);

  return messagesByChannelID.map(({ timestamp, name, text, avatar, id }) => {
    return (
      <Media key={id} border="secondary">
        <Image
          width={64}
          height={64}
          roundedCircle
          className="mr-2 p-1"
          src={avatar}
          alt="Avatar"
        />
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
