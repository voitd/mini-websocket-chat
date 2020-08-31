import 'core-js/stable';
import 'regenerator-runtime/runtime';

import '../assets/application.scss';

import gon from 'gon';

import app from './app';

import './i18n';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

app(gon);
