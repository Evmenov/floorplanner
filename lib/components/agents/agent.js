"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Agent(props) {
  var agent = props.agent;


  return _react2.default.createElement(
    "div",
    null,
    _react2.default.createElement(
      "h3",
      null,
      agent.name,
      " ",
      agent.surname
    ),
    _react2.default.createElement(
      "h4",
      null,
      "\u041A\u043E\u0440\u043F\u043E\u0440\u0430\u0446\u0438\u044F: ",
      agent.corporation
    )
  );
}

exports.default = Agent;