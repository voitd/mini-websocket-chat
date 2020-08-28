import { Image, Media } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import React, { useContext } from 'react';
import cn from 'classnames';
import { UserContext } from '../app';
import { selectChannelId } from '../slices/channelSlice';
import { selectMessages } from '../slices/messageSlice';

const Message = () => {
  const { name: CurrentUserName } = useContext(UserContext);
  const messages = useSelector(selectMessages);
  const currentChannelId = useSelector(selectChannelId);
  const messagesByChannelID = messages.filter((message) => message.channelId === currentChannelId);

  return messagesByChannelID.map(({ timestamp, name, text, avatar, id }) => {
    const isSelfMessage = CurrentUserName === name;
    const classnames = cn({
      'm-1 p-2': true,
      'text-wrap text-break': true,
      'bg-light rounded-pill': isSelfMessage
      // 'align-self-start border-info': !isSelfMessage,
      // 'align-self-end border-primary': isSelfMessage,
      // 'border  rounded': true
    });

    return (
      <Media key={id} className={classnames}>
        <Image
          width={64}
          height={64}
          roundedCircle
          className="mr-2 p-1"
          src={avatar}
          alt="Avatar"
        />
        <Media.Body>
          <h6 className="text-monospace">
            {name} <small>{timestamp}</small>
          </h6>
          <p>{text}</p>
        </Media.Body>
      </Media>
    );
  });
};

export default Message;
