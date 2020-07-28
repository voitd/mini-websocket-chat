import 'core-js/stable';
import 'regenerator-runtime/runtime';

import '../assets/application.scss';

import gon from 'gon';
<<<<<<< HEAD
=======
// import cookies from 'js-cookie';
// import io from 'socket.io-client';
>>>>>>> effcfadab718bc35bbd7f87edf7b7424b84d636a
import app from './app';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

<<<<<<< HEAD
=======
// const { channels, messages, currentChannelId } = gon;

>>>>>>> effcfadab718bc35bbd7f87edf7b7424b84d636a
app(gon);
