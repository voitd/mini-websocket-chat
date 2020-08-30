import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// ! TODO: move them in a JSON file and import them
const resources = {
  en: {
    translation: {
      titles: {
        channels: 'Channels',
        channelAdd: 'Add',
        channelRename: 'Rename',
        channelRemove: 'Remove'
      },
      placeholders: {
        addMessage: 'Type message...',
        newNameChannel: 'Enter channel name...',
        confirmChannelRemove: 'You are sure delete this channel {{name}}?'
      },
      buttons: {
        ok: 'OK',
        cancel: 'Cancel',
        send: 'Send'
      },
      errors: {
        network: 'Network error, try a few minut leter',
        required: 'Type message first'
      }
    }
  },

  ru: {
    translation: {
      titles: {
        channels: 'Каналы',
        channelAdd: 'Добавить канал',
        channelRename: 'Переименовать канал',
        channelRemove: 'Удалить канал'
      },
      placeholders: {
        addMessage: 'Введите сообщение...',
        newNameChannel: 'Введите название канала...',
        confirmChannelRemove: 'Вы действительно хотите удалить канал {{name}}?'
      },
      buttons: {
        ok: 'OK',
        cancel: 'Отмена',
        send: 'Отправить'
      },
      errors: {
        network: 'Проблемы с сетью, повторите через время',
        required: 'Сначала введите сообщение'
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    fallbackLng: 'en',

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;
