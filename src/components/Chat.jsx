import { Card } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import React from 'react';

import { selectChannel, selectChannelId } from '../slices/channelSlice';
import { selectModalStatus, selectModalType } from '../slices/modalSlice';
import ActionButtons from './ActionButtons';
import Message from './Message';
import NewMessageForm from './NewMessageForm';
import getModal from './modals';

const Chat = () => {
  const isShown = useSelector(selectModalStatus);
  const modalType = useSelector(selectModalType);
  const channels = useSelector(selectChannel);
  const channelID = useSelector(selectChannelId);
  const activeChannel = channels.find((channel) => channel.id === channelID);
  const { name: activeChannelName, removable: isRemovableChannel } = activeChannel;

  const renderModal = (type) => {
    if (!type) {
      return null;
    }

    const Component = getModal(type);
    return <Component />;
  };

  return (
    <Card border="info" className="h-100 d-flex">
      <Card.Header className="d-flex font-weight-bold">
        <span className="mr-auto m-1"># {activeChannelName} </span>
        {isRemovableChannel && <ActionButtons />}
      </Card.Header>
      <Card.Body className="d-flex flex-column-reverse overflow-auto">
        <Message />
      </Card.Body>
      <Card.Footer className="text-muted">
        <NewMessageForm />
      </Card.Footer>
      {isShown && renderModal(modalType)}
    </Card>
  );
};

export default Chat;
