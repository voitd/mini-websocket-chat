import React from 'react';
import { Nav } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { selectChannel, selectChannelId, updateActiveChannelID } from '../slices/channelSlice';
import { selectMessages } from '../slices/messageSlice';

export default () => {
  const dispatch = useDispatch();
  const channels = useSelector(selectChannel);
  const channelId = useSelector(selectChannelId);
  const messages = useSelector(selectMessages);

  const handleToggleChannel = (id) => () => {
    dispatch(updateActiveChannelID(id));
  };

  return channels.map(({ id, name }) => {
    const currentChannelId = channelId === id;
    const channelMessagesCount = messages.filter((message) => message.channelId === id).length;
    return (
      <Nav.Link disabled={currentChannelId} key={id} onClick={handleToggleChannel(id)}>
        #<strong> {name} </strong>
        {!currentChannelId && <span className="badge badge-info">{channelMessagesCount}</span>}
      </Nav.Link>
    );
  });
};
