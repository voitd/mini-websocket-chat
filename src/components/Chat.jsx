import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Button } from 'react-bootstrap';
import getModal from './modals';
import NewMessageForm from './NewMessageForm';
import Message from './Message';
import { showModal, selectModalStatus, selectModalType } from '../slices/modalSlice';
import { selectChannel, selectChannelId } from '../slices/channelSlice';

const Chat = () => {
  const dispatch = useDispatch();
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

  // TODO: remake as SVG
  const renderActionButtons = () => {
    const actions = {
      renaming: '✏️',
      removing: '❌'
    };

    const handleShowModal = (type) => () => {
      dispatch(showModal(type));
    };

    return Object.entries(actions).map(([action, emoji]) => (
      <Button
        key={action}
        variant="outline"
        className="mx-1"
        size="sm"
        onClick={handleShowModal(action)}>
        <span role="img" aria-label={action}>
          {emoji}
        </span>
      </Button>
    ));
  };

  return (
    <Card border="info" className="h-100 d-flex">
      <Card.Header className="d-flex font-weight-bold">
        <span className="mr-auto m-1"># {activeChannelName} </span>
        <span>{isRemovableChannel && renderActionButtons()}</span>
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
