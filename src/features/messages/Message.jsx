import React from 'react';
import { useSelector } from 'react-redux';
import Media from 'react-bootstrap/Media';
import { selectChannelId } from '../channels/channelSlice';
import { selectMsgById } from './messageSlice';

const Message = () => {
  const currentChannelId = useSelector(selectChannelId);
  const messages = useSelector((state) => selectMsgById(state, currentChannelId));

  return messages.reverse().map(({ timestamp, nickname, text, avatar, id }) => {
    return (
      <Media key={id}>
        <img width={64} height={64} className=" mr-2 p-1 rounded" src={avatar} alt="Avatar" />
        <Media.Body>
          <h6>
            {nickname} <small>{timestamp}</small>
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
