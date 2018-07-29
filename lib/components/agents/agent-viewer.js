'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _export = require('../style/export');

var _agentsList = require('./agents-list');

var _agentsList2 = _interopRequireDefault(_agentsList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AgentViewer = function (_Component) {
  _inherits(AgentViewer, _Component);

  function AgentViewer(props, context) {
    _classCallCheck(this, AgentViewer);

    var _this = _possibleConstructorReturn(this, (AgentViewer.__proto__ || Object.getPrototypeOf(AgentViewer)).call(this, props, context));

    var scene = props.state.scene;

    _this.state = {
      dataWidth: scene.width,
      dataHeight: scene.height,
      isOpen: true
    };
    return _this;
  }

  _createClass(AgentViewer, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          width = _props.width,
          height = _props.height,
          sidebarH = _props.sidebarH;
      var _state = this.state,
          dataWidth = _state.dataWidth,
          dataHeight = _state.dataHeight;
      var _context = this.context,
          projectActions = _context.projectActions,
          translator = _context.translator,
          agents = _context.agents;


      var Style = {
        width: width,
        height: height,
        position: 'relative',
        top: sidebarH
      };
      var body = this.state.isOpen && _react2.default.createElement(
        _export.ContentContainer,
        { width: width, height: height, style: Style },
        _react2.default.createElement(
          _export.ContentTitle,
          null,
          translator.t('Agents list')
        ),
        _react2.default.createElement(_agentsList2.default, { agents: agents }),
        _react2.default.createElement(
          'table',
          { style: { float: 'right' } },
          _react2.default.createElement(
            'tbody',
            null,
            _react2.default.createElement(
              'tr',
              null,
              _react2.default.createElement(
                'td',
                null,
                _react2.default.createElement(
                  _export.CancelButton,
                  { size: 'large',
                    onClick: function onClick(e) {
                      return projectActions.rollback();
                    } },
                  translator.t('Close')
                )
              )
            )
          )
        )
      );
      return body;
    }
  }]);

  return AgentViewer;
}(_react.Component);

exports.default = AgentViewer;


AgentViewer.propTypes = {
  width: _propTypes2.default.number.isRequired,
  height: _propTypes2.default.number.isRequired,
  state: _propTypes2.default.object.isRequired
};

AgentViewer.contextTypes = {
  projectActions: _propTypes2.default.object.isRequired,
  translator: _propTypes2.default.object.isRequired,
  agents: _propTypes2.default.array.isRequired
};