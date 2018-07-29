"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = AgentsList;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _agent = require("./agent");

var _agent2 = _interopRequireDefault(_agent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function AgentsList(_ref) {
  var agents = _ref.agents;

  var agentElements = agents.map(function (agent) {
    return _react2.default.createElement(
      "section",
      { key: agent.id },
      " >",
      _react2.default.createElement(_agent2.default, { agent: agent })
    );
  });
  return _react2.default.createElement(
    "ul",
    null,
    agentElements
  );
}