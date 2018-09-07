'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _sharedStyle = require('../../shared-style');

var SharedStyle = _interopRequireWildcard(_sharedStyle);

var _fa = require('react-icons/lib/fa');

var _Typography = require('@material-ui/core/Typography');

var _Typography2 = _interopRequireDefault(_Typography);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var STYLE = {
  userSelect: 'none',
  background: '#ffffff',
  backgroundColor: '#ffffff'
};
var STYLE_TITLE = {
  fontSize: '13px',
  backgroundColor: '#ffffff',
  margin: '0px',
  cursor: 'pointer'
};
var STYLE_CONTENT = {
  fontSize: '15px',
  padding: '0px',
  backgroundColor: '#ffffff'
};
var STYLE_ARROW = {
  float: 'right'
};

var Panel = function (_Component) {
  _inherits(Panel, _Component);

  function Panel(props, context) {
    _classCallCheck(this, Panel);

    var _this = _possibleConstructorReturn(this, (Panel.__proto__ || Object.getPrototypeOf(Panel)).call(this, props, context));

    _this.state = {
      opened: props.hasOwnProperty('opened') ? props.opened : false,
      hover: false
    };
    return _this;
  }

  _createClass(Panel, [{
    key: 'toggleOpen',
    value: function toggleOpen() {
      this.setState({ opened: !this.state.opened });
    }
  }, {
    key: 'toggleHover',
    value: function toggleHover() {
      this.setState({ hover: !this.state.hover });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          name = _props.name,
          headComponents = _props.headComponents,
          children = _props.children;
      var _state = this.state,
          opened = _state.opened,
          hover = _state.hover;


      return _react2.default.createElement(
        'div',
        { style: STYLE },
        _react2.default.createElement(
          _Typography2.default,
          { color: 'textSecondary',
            onMouseEnter: function onMouseEnter() {
              return _this2.toggleHover();
            },
            onMouseLeave: function onMouseLeave() {
              return _this2.toggleHover();
            }
          },
          name,
          headComponents
        ),
        _react2.default.createElement(
          _Typography2.default,
          { color: 'textSecondary', style: _extends({}, STYLE_CONTENT, { display: opened ? 'block' : 'none' }) },
          children
        )
      );
    }
  }]);

  return Panel;
}(_react.Component);

exports.default = Panel;


Panel.propTypes = {
  name: _propTypes2.default.string.isRequired,
  headComponents: _propTypes2.default.array,
  opened: _propTypes2.default.bool
};