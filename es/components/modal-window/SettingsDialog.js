var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import ProjectConfigurator from "../configurator/project-configurator";

function Transition(props) {
  return React.createElement(Slide, _extends({ direction: 'up' }, props));
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


      return React.createElement(
        'div',
        null,
        React.createElement(
          Dialog,
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
          React.createElement(
            DialogTitle,
            { id: 'alert-dialog-slide-title' },
            "Настройки размера карты"
          ),
          React.createElement(
            DialogContent,
            null,
            React.createElement(ProjectConfigurator, { state: state, onInvertSettings: function onInvertSettings() {
                return _this2.props.onInvertSettings();
              } })
          ),
          React.createElement(DialogActions, null)
        )
      );
    }
  }]);

  return AlertDialogSlide;
}(React.Component);

export default AlertDialogSlide;