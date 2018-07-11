webpackHotUpdate(4,{

/***/ "./components/Chat.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__("./node_modules/react/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_axios__ = __webpack_require__("./node_modules/axios/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_axios__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_pusher_js__ = __webpack_require__("./node_modules/pusher-js/dist/web/pusher.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_pusher_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_pusher_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ChatMessage__ = __webpack_require__("./components/ChatMessage.js");
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
  // Chat strings will be stored in the chats array.
  ========================================================================*/
  function Chat() {
    var _this;

    _classCallCheck(this, Chat);

    _this = _possibleConstructorReturn(this, (Chat.__proto__ || Object.getPrototypeOf(Chat)).call(this));
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
          evt.target.value = '';
          __WEBPACK_IMPORTED_MODULE_1_axios___default.a.post('/message', chat);
        }
      }
    });
    _this.state = {
      chatroom: 'chat-room',
      chats: [],
      showMenu: false
    };
    return _this;
  }
  /*========================================================================
  // Upon mount connect to Pusher and perform channel subscription.
  ========================================================================*/


  _createClass(Chat, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      this.pusher = new __WEBPACK_IMPORTED_MODULE_2_pusher_js___default.a("6af1d66989d10cf60b14", {
        cluster: "us2",
        encrypted: true
      });
      this.channel = this.pusher.subscribe(this.state.chatroom);
      this.channel.bind('new-message', function (_ref) {
        var _ref$chat = _ref.chat,
            chat = _ref$chat === void 0 ? null : _ref$chat;
        var chats = _this2.state.chats;
        chat && chats.push(chat);

        _this2.setState({
          chats: chats
        });
      });
      /*========================================================================
      // Retrieve all chat messages for this conversation stored on Pusher.
      ========================================================================*/

      this.pusher.connection.bind('connected', function () {
        __WEBPACK_IMPORTED_MODULE_1_axios___default.a.post('/messages').then(function (response) {
          var chats = response.data.messages;

          _this2.setState({
            chats: chats
          });
        });
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
    // Handle event when user enters a chat message.
    ========================================================================*/

  }, {
    key: "render",

    /*========================================================================
    // Display user's name and chat section. Each chat message is mapped
    // between the header and message box.
    ========================================================================*/
    value: function render() {
      var _this3 = this;

      return this.props.activeUser && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_0_react__["Fragment"], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 84
        }
      }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", {
        className: "border-bottom border-gray w-100 align-items-center bg-white",
        style: {
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          height: 90
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 85
        }
      }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("img", {
        src: "https://i.pinimg.com/originals/56/f0/c7/56f0c7de57fdae6d0a9ddc43448b6dff.png",
        style: {
          height: 60,
          marginLeft: 20
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 86
        }
      }), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("h2", {
        className: "text-dark mb-0 mx-4 px-2",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 87
        }
      }, this.props.activeUser), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("img", {
        onClick: function onClick(e) {
          return _this3.setState(function (prevState) {
            return {
              showMenu: !prevState.showMenu
            };
          });
        },
        src: "https://www.shareicon.net/data/512x512/2017/02/09/878626_gear_512x512.png",
        style: {
          height: 60,
          marginRight: 20,
          cursor: 'pointer'
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 88
        }
      })), !this.state.showMenu ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", {
        className: "px-4 pb-4 w-100 d-flex flex-row flex-wrap align-items-start align-content-start position-relative",
        style: {
          height: 'calc(95% - 180px)',
          overflowY: 'scroll'
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 91
        }
      }, this.state.chats.map(function (chat, index) {
        var previous = Math.max(0, index - 1);
        var previousChat = _this3.state.chats[previous];
        var position = chat.user === _this3.props.activeUser ? "right" : "left";
        var isFirst = previous === index;
        var inSequence = chat.user === previousChat.user;
        var hasDelay = Math.ceil((chat.timestamp - previousChat.timestamp) / (1000 * 60)) > 1;
        var mood = chat.sentiment > 0 ? HAPPY_EMOJI : chat.sentiment === 0 ? NEUTRAL_EMOJI : SAD_EMOJI;
        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_0_react__["Fragment"], {
          key: index,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 100
          }
        }, (isFirst || !inSequence || hasDelay) && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", {
          className: "d-block w-100 font-weight-bold text-dark mt-4 pb-1 px-1 text-".concat(position),
          style: {
            fontSize: '0.9rem'
          },
          __source: {
            fileName: _jsxFileName,
            lineNumber: 102
          }
        }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("span", {
          className: "d-block",
          style: {
            fontSize: '1.6rem'
          },
          __source: {
            fileName: _jsxFileName,
            lineNumber: 103
          }
        }, String.fromCodePoint.apply(String, mood)), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("span", {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 106
          }
        }, chat.user || 'Anonymous')), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__ChatMessage__["a" /* default */], {
          message: chat.message,
          position: position,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 110
          }
        }));
      })) : __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 114
        }
      }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("h2", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 115
        }
      }, "Menu"), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("br", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 116
        }
      }), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("button", {
        onClick: this.props.signout,
        style: {
          cursor: 'pointer'
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 117
        }
      }, "Signout")), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", {
        className: "border-top border-gray w-100 px-4 d-flex align-items-center bg-light",
        style: {
          minHeight: 90
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 119
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
          lineNumber: 120
        }
      })));
    }
  }]);

  return Chat;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);

/* harmony default export */ __webpack_exports__["a"] = (Chat);

/***/ })

})
//# sourceMappingURL=4.9fa21832b85493061ac3.hot-update.js.map