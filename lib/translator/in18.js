'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _store = require('store');

var _store2 = _interopRequireDefault(_store);

var _en = require('./en');

var _en2 = _interopRequireDefault(_en);

var _vn = require('./vn');

var _vn2 = _interopRequireDefault(_vn);

var _i18next = require('i18next');

var _i18next2 = _interopRequireDefault(_i18next);

var _reactI18next = require('react-i18next');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// the translations
// (tip move them in a JSON file and import them)
var defaultLang = 'vn';

var resources = {
  en: {
    translation: _en2.default
  },

  vn: {
    translation: _vn2.default
  }
};

_i18next2.default.use(_reactI18next.initReactI18next) // passes i18n down to react-i18next
.init({
  resources: resources,
  lng: _store2.default.get('lang') || defaultLang,

  keySeparator: false, // we do not use keys in form messages.welcome

  interpolation: {
    escapeValue: false // react already safes from xss
  }
});

exports.default = i18n;