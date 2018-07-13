module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./components/Chat.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__("react");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_axios__ = __webpack_require__("axios");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_axios__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_pusher_js__ = __webpack_require__("pusher-js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_pusher_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_pusher_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_next_link__ = __webpack_require__("next/link");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_next_link___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_next_link__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ChatMessage__ = __webpack_require__("./components/ChatMessage.js");
var _jsxFileName = "C:\\Users\\Jonny\\Documents\\GitHub\\Sentimental-Chat\\components\\Chat.js";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }






var SAD_EMOJI = [55357, 56864];
var HAPPY_EMOJI = [55357, 56832];
var NEUTRAL_EMOJI = [55357, 56848];
/*========================================================================
// This component contains logic for chat.
========================================================================*/

var Chat =
/*#__PURE__*/
function (_Component) {
  _inherits(Chat, _Component);

  /*========================================================================
  // Store the name of the current chatroom, an array of chat messages,
  // and a boolean for determining whether to show the menu or chat.
  ========================================================================*/
  function Chat() {
    var _this;

    _classCallCheck(this, Chat);

    _this = _possibleConstructorReturn(this, (Chat.__proto__ || Object.getPrototypeOf(Chat)).call(this));
    Object.defineProperty(_assertThisInitialized(_this), "handleChangeChannel", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value(channelName) {
        if (_this.state.chatroom.length > 0) _this.pusher.unsubscribe(_this.state.chatroom);
        _this.channel = _this.pusher.subscribe(channelName);

        _this.setState({
          chatroom: channelName,
          chats: [],
          showIntroHeader: true
        });

        _this.channel.bind('new-message', function (_ref) {
          var _ref$chat = _ref.chat,
              chat = _ref$chat === void 0 ? null : _ref$chat;
          var chats = _this.state.chats;
          chat && chats.push(chat);

          _this.setState({
            chats: chats,
            showMenu: false
          });
        });

        __WEBPACK_IMPORTED_MODULE_1_axios___default.a.post('/messages').then(function (response) {
          var chats = response.data.messages;

          _this.setState({
            chats: chats,
            showMenu: false
          });
        }).catch(function (error) {
          console.log('Messages fetch failed. ' + error);
        });
      }
    });
    Object.defineProperty(_assertThisInitialized(_this), "handleKeyUp", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value(evt) {
        var value = evt.target.value;

        if (evt.keyCode === 13 && !evt.shiftKey) {
          var user = _this.props.activeUser;
          var chat = {
            user: user,
            message: value,
            timestamp: +new Date()
          };
          var room = _this.state.chatroom;
          evt.target.value = '';
          __WEBPACK_IMPORTED_MODULE_1_axios___default.a.post('/message', {
            chat: chat,
            room: room
          });
        }
      }
    });
    _this.state = {
      chatroom: '',
      chats: [],
      showMenu: true
    };
    return _this;
  }
  /*========================================================================
  // Create Pusher object to provide API reference to Pusher services.
  ========================================================================*/


  _createClass(Chat, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.pusher = new __WEBPACK_IMPORTED_MODULE_2_pusher_js___default.a("6af1d66989d10cf60b14", {
        cluster: "us2",
        encrypted: true
      });
    }
    /*========================================================================
    // Disconnect from pusher when component is unmounted.
    ========================================================================*/

  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.pusher.disconnect();
    }
    /*========================================================================
    // This will handle subscription to the various chat channels that
    // Sentimental Chat offers. First, we will unregister the current
    // subscription if one exists before resetting chat state and setting
    // a name for chatroom. Then, we will subscribe to the corresponding
    // channel and create bindings to Pusher.
    ========================================================================*/

  }, {
    key: "render",

    /*========================================================================
    // The Chat div is rendered on the right-side of the screen. Initially,
    // it will display a top bar that instructs the user to 'Select a 
    // Chatroom', with a selection of rooms along with an About and Signout
    // button. Once a user selects a chatroom, change the top bar to show
    // a profile avatar, the name of the chatroom, and a menu button.
    // Below is a list of chat messages within that chatroom. Upon clicking
    // the menu button, display the same chatroom, about, and signout buttons
    // as during the introduction.
    ========================================================================*/
    value: function render() {
      var _this2 = this;

      return this.props.activeUser && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_0_react__["Fragment"], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 119
        }
      }, this.state.chatroom ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", {
        className: "border-bottom border-gray w-100 align-items-center bg-white",
        style: {
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          height: 90
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 121
        }
      }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("img", {
        src: "https://i.pinimg.com/originals/56/f0/c7/56f0c7de57fdae6d0a9ddc43448b6dff.png",
        alt: "Default avatar PNG",
        style: {
          height: 60,
          marginLeft: 20
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 122
        }
      }), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("h2", {
        className: "text-dark mb-0 mx-4 px-2",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 124
        }
      }, this.state.showMenu ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_0_react__["Fragment"], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 126
        }
      }, "Menu") : __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_0_react__["Fragment"], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 129
        }
      }, this.state.chatroom)), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("img", {
        onClick: function onClick(e) {
          return _this2.setState(function (prevState) {
            return {
              showMenu: !prevState.showMenu
            };
          });
        },
        src: "https://www.shareicon.net/data/512x512/2017/02/09/878626_gear_512x512.png",
        alt: "Gear cog PNG",
        style: {
          height: 60,
          marginRight: 20,
          cursor: 'pointer'
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 133
        }
      })) : __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", {
        className: "border-bottom border-gray w-100 align-items-center bg-white",
        style: {
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          height: 90
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 136
        }
      }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("img", {
        src: "http://pixsector.com/cache/0688783e/avbf566659ab2bdf82f87.png",
        alt: "Down arrow PNG",
        style: {
          height: 60,
          marginRight: 20
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 137
        }
      }), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("h2", {
        className: "text-dark mb-0 mx-4 px-2",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 139
        }
      }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_0_react__["Fragment"], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 140
        }
      }, "Select a Chatroom")), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("img", {
        src: "http://pixsector.com/cache/0688783e/avbf566659ab2bdf82f87.png",
        alt: "Down arrow PNG",
        style: {
          height: 60,
          marginRight: 20
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 144
        }
      })), !this.state.showMenu ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_0_react__["Fragment"], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 148
        }
      }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", {
        className: "px-4 pb-4 w-100 d-flex flex-row flex-wrap align-items-start align-content-start position-relative",
        style: {
          height: 'calc(95% - 180px)',
          overflowY: 'scroll'
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 149
        }
      }, this.state.chats.map(function (chat, index) {
        var previous = Math.max(0, index - 1);
        var previousChat = _this2.state.chats[previous];
        var position = chat.user === _this2.props.activeUser ? "right" : "left";
        var isFirst = previous === index;
        var inSequence = chat.user === previousChat.user;
        var hasDelay = Math.ceil((chat.timestamp - previousChat.timestamp) / (1000 * 60)) > 1;
        var mood = chat.sentiment > 0 ? HAPPY_EMOJI : chat.sentiment === 0 ? NEUTRAL_EMOJI : SAD_EMOJI;
        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_0_react__["Fragment"], {
          key: index,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 158
          }
        }, (isFirst || !inSequence || hasDelay) && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", {
          className: "d-block w-100 font-weight-bold text-dark mt-4 pb-1 px-1 text-".concat(position),
          style: {
            fontSize: '1.2rem'
          },
          __source: {
            fileName: _jsxFileName,
            lineNumber: 160
          }
        }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("span", {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 161
          }
        }, chat.user || 'Anonymous')), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", {
          className: "d-block w-100 mt-2 pb-1 px-1 text-".concat(position),
          style: {
            fontSize: '1.5rem'
          },
          __source: {
            fileName: _jsxFileName,
            lineNumber: 166
          }
        }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("span", {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 167
          }
        }, String.fromCodePoint.apply(String, mood))), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__ChatMessage__["a" /* default */], {
          message: chat.message,
          position: position,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 171
          }
        }));
      })), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", {
        className: "border-top border-gray w-100 px-4 d-flex align-items-center bg-light",
        style: {
          minHeight: 90
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 175
        }
      }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("textarea", {
        className: "form-control px-3 py-2",
        onKeyUp: this.handleKeyUp,
        placeholder: "Enter a chat message",
        style: {
          resize: 'none'
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 176
        }
      }))) : __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_0_react__["Fragment"], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 179
        }
      }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", {
        className: "w-100 align-items-center",
        style: {
          display: 'flex',
          flexDirection: 'column',
          height: 'auto',
          color: '#FFF'
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 180
        }
      }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("button", {
        onClick: function onClick() {
          return _this2.handleChangeChannel('General-Chat');
        },
        style: {
          display: 'block',
          width: '40%',
          margin: '5px',
          padding: '20px',
          backgroundColor: '#2A275E',
          color: '#fff',
          border: 'none',
          cursor: 'pointer'
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 181
        }
      }, "General Chat"), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("button", {
        onClick: function onClick() {
          return _this2.handleChangeChannel('Gamer-Chat');
        },
        style: {
          display: 'block',
          width: '40%',
          margin: '5px',
          padding: '20px',
          backgroundColor: '#2A275E',
          color: '#fff',
          border: 'none',
          cursor: 'pointer'
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 182
        }
      }, "Gamer Chat"), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("button", {
        onClick: function onClick() {
          return _this2.handleChangeChannel('Technology-Chat');
        },
        style: {
          display: 'block',
          width: '40%',
          margin: '5px',
          padding: '20px',
          backgroundColor: '#2A275E',
          color: '#fff',
          border: 'none',
          cursor: 'pointer'
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 183
        }
      }, "Technology Chat"), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("button", {
        onClick: function onClick() {
          return _this2.handleChangeChannel('RL-Chat');
        },
        style: {
          display: 'block',
          width: '40%',
          margin: '5px',
          padding: '20px',
          backgroundColor: '#2A275E',
          color: '#fff',
          border: 'none',
          cursor: 'pointer'
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 184
        }
      }, "RL Chat"), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("button", {
        onClick: function onClick() {
          return _this2.handleChangeChannel('Introduction-Chat');
        },
        style: {
          display: 'block',
          width: '40%',
          margin: '5px',
          padding: '20px',
          backgroundColor: '#2A275E',
          color: '#fff',
          border: 'none',
          cursor: 'pointer'
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 185
        }
      }, "Introduction Chat")), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", {
        className: "w-100 align-items-center",
        style: {
          display: 'flex',
          flexDirection: 'column',
          height: 'auto',
          color: '#FFF'
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 187
        }
      }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_next_link___default.a, {
        href: {
          pathname: '/about'
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 188
        }
      }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("button", {
        style: {
          display: 'block',
          width: '40%',
          margin: '5px',
          padding: '20px',
          backgroundColor: '#2A275E',
          color: '#fff',
          border: 'none',
          cursor: 'pointer'
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 188
        }
      }, "About")), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("button", {
        onClick: this.props.signout,
        style: {
          display: 'block',
          width: '40%',
          margin: '5px',
          padding: '20px',
          backgroundColor: '#2A275E',
          color: '#fff',
          border: 'none',
          cursor: 'pointer'
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 189
        }
      }, "Signout"))));
    }
  }]);

  return Chat;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);

/* harmony default export */ __webpack_exports__["a"] = (Chat);

/***/ }),

/***/ "./components/ChatMessage.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__("react");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
var _jsxFileName = "C:\\Users\\Jonny\\Documents\\GitHub\\Sentimental-Chat\\components\\ChatMessage.js";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }


/*========================================================================
// This component is used for each individual message in a chat.
========================================================================*/

var ChatMessage =
/*#__PURE__*/
function (_Component) {
  _inherits(ChatMessage, _Component);

  function ChatMessage() {
    _classCallCheck(this, ChatMessage);

    return _possibleConstructorReturn(this, (ChatMessage.__proto__ || Object.getPrototypeOf(ChatMessage)).apply(this, arguments));
  }

  _createClass(ChatMessage, [{
    key: "render",
    value: function render() {
      /*========================================================================
      // Inline styling.
      ========================================================================*/
      var _props = this.props,
          _props$position = _props.position,
          position = _props$position === void 0 ? 'left' : _props$position,
          message = _props.message;
      var isRight = position.toLowerCase() === 'right';
      var align = isRight ? 'text-right' : 'text-left';
      var justify = isRight ? 'justify-content-end' : 'justify-content-start';
      var messageBoxStyles = {
        maxWidth: '70%',
        flexGrow: 0
      };
      var messageStyles = {
        fontWeight: 500,
        lineHeight: 1.4,
        whiteSpace: 'pre-wrap'
      };
      /*========================================================================
      // Display message to the user.
      ========================================================================*/

      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", {
        className: "w-100 my-1 d-flex ".concat(justify),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 32
        }
      }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", {
        className: "bg-light rounded border border-gray p-2",
        style: messageBoxStyles,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 33
        }
      }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("span", {
        className: "d-block text-secondary ".concat(align),
        style: messageStyles,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 34
        }
      }, message)));
    }
  }]);

  return ChatMessage;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);

/* harmony default export */ __webpack_exports__["a"] = (ChatMessage);

/***/ }),

/***/ "./components/Layout.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__("react");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_next_head__ = __webpack_require__("next/head");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_next_head___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_next_head__);
var _jsxFileName = "C:\\Users\\Jonny\\Documents\\GitHub\\Sentimental-Chat\\components\\Layout.js";


/*========================================================================
// A wrapper that adds top-level styling to each page along with a next
// and head component for meta information.
========================================================================*/

var Layout = function Layout(props) {
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_0_react__["Fragment"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 9
    }
  }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_next_head___default.a, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 10
    }
  }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("meta", {
    charSet: "utf-8",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 11
    }
  }), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("meta", {
    name: "viewport",
    content: "width=device-width, initial-scale=1, shrink-to-fit=no",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 12
    }
  }), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("link", {
    rel: "stylesheet",
    href: "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css",
    integrity: "sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm",
    crossOrigin: "anonymous",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 13
    }
  }), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("title", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 14
    }
  }, 'Sentimental Chat')), props.children);
};

/* harmony default export */ __webpack_exports__["a"] = (Layout);

/***/ }),

/***/ "./pages/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__("react");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_Chat__ = __webpack_require__("./components/Chat.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_Layout__ = __webpack_require__("./components/Layout.js");
var _jsxFileName = "C:\\Users\\Jonny\\Documents\\GitHub\\Sentimental-Chat\\pages\\index.js";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }




/*========================================================================
// The main page of the app where core functionality is contained.
========================================================================*/

var IndexPage =
/*#__PURE__*/
function (_Component) {
  _inherits(IndexPage, _Component);

  function IndexPage() {
    var _ref;

    var _temp, _this;

    _classCallCheck(this, IndexPage);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(_this, (_temp = _this = _possibleConstructorReturn(this, (_ref = IndexPage.__proto__ || Object.getPrototypeOf(IndexPage)).call.apply(_ref, [this].concat(args))), Object.defineProperty(_assertThisInitialized(_this), "state", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: {
        user: null
        /*========================================================================
        // Handle 'enter' key event on name input.
        ========================================================================*/

      }
    }), Object.defineProperty(_assertThisInitialized(_this), "handleKeyUp", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value(evt) {
        if (evt.keyCode === 13) {
          var user = evt.target.value;

          _this.setState({
            user: user
          });
        }
      }
    }), Object.defineProperty(_assertThisInitialized(_this), "handleSignout", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value(evt) {
        _this.setState({
          user: null
        });
      }
    }), _temp));
  }

  _createClass(IndexPage, [{
    key: "render",

    /*========================================================================
    // Render top level page with main screen on the left and menu/chat
    // window on the right.
    ========================================================================*/
    value: function render() {
      var user = this.state.user;
      /*========================================================================
      // Inline styling.
      ========================================================================*/

      var nameInputStyles = {
        background: 'transparent',
        color: '#999',
        border: 0,
        borderBottom: '1px solid #666',
        borderRadius: 0,
        fontSize: '3rem',
        fontWeight: 500,
        boxShadow: 'none !important'
      };
      /*========================================================================
      // Initially display enter name field. Once a name has been provided,
      // display chat.
      ========================================================================*/

      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__components_Layout__["a" /* default */], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 63
        }
      }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("main", {
        className: "container-fluid position-absolute h-100",
        style: {
          backgroundColor: '#2A275E'
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 64
        }
      }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", {
        className: "row position-absolute w-100 h-100",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 65
        }
      }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("section", {
        className: "col-md-8 d-flex flex-row flex-wrap align-items-center align-content-center px-5",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 66
        }
      }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", {
        className: "px-5 mx-5",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 67
        }
      }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("span", {
        className: "d-block w-100 h1 text-light",
        style: {
          marginTop: -50
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 68
        }
      }, user ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("span", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 70
        }
      }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("span", {
        style: {
          color: '#fff'
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 71
        }
      }, "Welcome to Sentimental Chat,"), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("br", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 72
        }
      }), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("span", {
        style: {
          color: '#aaa'
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 73
        }
      }, this.state.user), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("span", {
        style: {
          color: '#fff'
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 74
        }
      }, "!")) : "Enter a username below to begin."), !user && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("input", {
        type: "text",
        className: "form-control mt-3 px-3 py-2",
        onKeyUp: this.handleKeyUp,
        autoComplete: "off",
        style: nameInputStyles,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 79
        }
      }))), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("section", {
        className: "col-md-4 position-relative d-flex flex-wrap h-100 align-items-start align-content-between px-0",
        style: {
          backgroundColor: '#eee'
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 82
        }
      }, user && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1__components_Chat__["a" /* default */], {
        activeUser: user,
        signout: this.handleSignout,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 83
        }
      })))));
    }
  }]);

  return IndexPage;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);

/* harmony default export */ __webpack_exports__["default"] = (IndexPage);

/***/ }),

/***/ 3:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("./pages/index.js");


/***/ }),

/***/ "axios":
/***/ (function(module, exports) {

module.exports = require("axios");

/***/ }),

/***/ "next/head":
/***/ (function(module, exports) {

module.exports = require("next/head");

/***/ }),

/***/ "next/link":
/***/ (function(module, exports) {

module.exports = require("next/link");

/***/ }),

/***/ "pusher-js":
/***/ (function(module, exports) {

module.exports = require("pusher-js");

/***/ }),

/***/ "react":
/***/ (function(module, exports) {

module.exports = require("react");

/***/ })

/******/ });
//# sourceMappingURL=index.js.map