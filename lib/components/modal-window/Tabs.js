'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _styles = require('@material-ui/core/styles');

var _AppBar = require('@material-ui/core/AppBar');

var _AppBar2 = _interopRequireDefault(_AppBar);

var _Tabs = require('@material-ui/core/Tabs');

var _Tabs2 = _interopRequireDefault(_Tabs);

var _Tab = require('@material-ui/core/Tab');

var _Tab2 = _interopRequireDefault(_Tab);

var _Typography = require('@material-ui/core/Typography');

var _Typography2 = _interopRequireDefault(_Typography);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function TabContainer(props) {
  return _react2.default.createElement(
    _Typography2.default,
    { component: 'div', style: { padding: 8 * 3 } },
    props.children
  );
}

TabContainer.propTypes = {
  children: _propTypes2.default.node.isRequired
};

var styles = function styles(theme) {
  return {
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper
    }
  };
};

var SimpleTabs = function (_React$Component) {
  _inherits(SimpleTabs, _React$Component);

  function SimpleTabs() {
    _classCallCheck(this, SimpleTabs);

    return _possibleConstructorReturn(this, (SimpleTabs.__proto__ || Object.getPrototypeOf(SimpleTabs)).apply(this, arguments));
  }

  _createClass(SimpleTabs, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      if (nextProps.tabValue === this.props.tabValue) {
        return false;
      } else return true;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var classes = this.props.classes;
      // const { value } = this.state;

      var handleChange = function handleChange(event, value) {
        _this2.setState({ value: value });
      };

      return _react2.default.createElement(
        'div',
        { className: classes.root },
        _react2.default.createElement(
          _AppBar2.default,
          { position: 'static' },
          _react2.default.createElement(
            _Tabs2.default,
            { value: this.props.tabValue, onChange: handleChange },
            _react2.default.createElement(_Tab2.default, { label: 'Item One' }),
            _react2.default.createElement(_Tab2.default, { label: 'Item Two' }),
            _react2.default.createElement(_Tab2.default, { label: 'Item Three', href: '#basic-tabs' })
          )
        ),
        this.props.tabValue === 0 && _react2.default.createElement(
          TabContainer,
          null,
          'Item One'
        ),
        this.props.tabValue === 1 && _react2.default.createElement(
          TabContainer,
          null,
          'Item Two'
        ),
        this.props.tabValue === 2 && _react2.default.createElement(
          TabContainer,
          null,
          'Item Three'
        )
      );
    }
  }]);

  return SimpleTabs;
}(_react2.default.Component);

SimpleTabs.propTypes = {
  classes: _propTypes2.default.object.isRequired
};

exports.default = (0, _styles.withStyles)(styles)(SimpleTabs);