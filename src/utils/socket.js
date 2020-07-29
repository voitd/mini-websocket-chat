import io from 'socket.io-client';
import store from '../store';
import { createNewMessageSuccess } from '../features/messages/messageSlice';
import {
  createChannelSuccess,
  renameChannelSuccess,
  removeChannelSuccess
} from '../features/channels/channelSlice';

export default () => {
  const socket = io();

  socket.on('newMessage', ({ data }) => {
    const { attributes } = data;
    store.dispatch(createNewMessageSuccess(attributes));
  });

  socket.on('newChannel', ({ data }) => {
    const { attributes } = data;
    store.dispatch(createChannelSuccess(attributes));
  });

  socket.on('renameChannel', ({ data }) => {
    const { attributes } = data;
    store.dispatch(renameChannelSuccess(attributes));
  });

  socket.on('removeChannel', ({ data }) => {
    store.dispatch(removeChannelSuccess(data));
  });
};
