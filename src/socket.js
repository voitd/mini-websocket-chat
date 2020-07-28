import io from 'socket.io-client';
import store from './store';
import { addMessageSuccess } from './features/messages/messageSlice';
import { updateChannels } from './features/channels/channelSlice';

const socket = io();

socket.on('newMessage', ({ data }) => {
  const { attributes } = data;
  store.dispatch(addMessageSuccess(attributes));
});

socket.on('newChannel', ({ data }) => {
  const { attributes } = data;
  store.dispatch(updateChannels(attributes));
});

socket.on('renameChannel', () => {
  store.dispatch(updateChannels());
});

socket.on('removeChannel', () => {
  store.dispatch(updateChannels());
});

export default socket;
