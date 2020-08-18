import React from 'react';
import { Nav } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { selectChannel, updateActiveChannelID, selectChannelId } from '../reducers/channelSlice';

export default () => {
  const dispatch = useDispatch();
  const channels = useSelector(selectChannel);
  const channelId = useSelector(selectChannelId);

  const handleToggleChannel = (id) => () => {
    dispatch(updateActiveChannelID(id));
  };

  return channels.map(({ id, name }) => (
    <Nav.Link disabled={channelId === id} key={id} onClick={handleToggleChannel(id)}>
      #<strong> {name}</strong>
    </Nav.Link>
  ));
};
