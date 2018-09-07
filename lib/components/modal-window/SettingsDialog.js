'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Button = require('@material-ui/core/Button');

var _Button2 = _interopRequireDefault(_Button);

var _Dialog = require('@material-ui/core/Dialog');

var _Dialog2 = _interopRequireDefault(_Dialog);

var _DialogActions = require('@material-ui/core/DialogActions');

var _DialogActions2 = _interopRequireDefault(_DialogActions);

var _DialogContent = require('@material-ui/core/DialogContent');

var _DialogContent2 = _interopRequireDefault(_DialogContent);

var _DialogContentText = require('@material-ui/core/DialogContentText');

var _DialogContentText2 = _interopRequireDefault(_DialogContentText);

var _DialogTitle = require('@material-ui/core/DialogTitle');

var _DialogTitle2 = _interopRequireDefault(_DialogTitle);

var _Slide = require('@material-ui/core/Slide');

var _Slide2 = _interopRequireDefault(_Slide);

var _projectConfigurator = require('../configurator/project-configurator');

var _projectConfigurator2 = _interopRequireDefault(_projectConfigurator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function Transition(props) {
  return _react2.default.createElement(_Slide2.default, _extends({ direction: 'up' }, props));
}

var AlertDialogSlide = function (_React$Component) {
  _inherits(AlertDialogSlide, _React$Component);

  function AlertDialogSlide() {
    _classCallCheck(this, AlertDialogSlide);

    return _possibleConstructorReturn(this, (AlertDialogSlide.__proto__ || Object.getPrototypeOf(AlertDialogSlide)).apply(this, arguments));
  }

  _createClass(AlertDialogSlide, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      if (nextProps.dialogIsOpen === this.props.dialogIsOpen) {
        return false;
      } else return true;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var state = this.props.state;


      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          _Dialog2.default,
          {
            open: this.props.dialogIsOpen,
            TransitionComponent: Transition,
            keepMounted: true,
            onClose: function onClose() {
              _this2.props.onInvertSettings();
            },
            'aria-labelledby': 'alert-dialog-slide-title',
            'aria-describedby': 'alert-dialog-slide-description'
          },
          _react2.default.createElement(
            _DialogTitle2.default,
            { id: 'alert-dialog-slide-title' },
            "Настройки размера карты"
          ),
          _react2.default.createElement(
            _DialogContent2.default,
            null,
            _react2.default.createElement(_projectConfigurator2.default, { state: state, onInvertSettings: function onInvertSettings() {
                return _this2.props.onInvertSettings();
              } })
          ),
          _react2.default.createElement(_DialogActions2.default, null)
        )
      );
    }
  }]);

  return AlertDialogSlide;
}(_react2.default.Component);

exports.default = AlertDialogSlide;