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

var _Switch = require('@material-ui/core/Switch');

var _Switch2 = _interopRequireDefault(_Switch);

var _Paper = require('@material-ui/core/Paper');

var _Paper2 = _interopRequireDefault(_Paper);

var _Slide = require('@material-ui/core/Slide');

var _Slide2 = _interopRequireDefault(_Slide);

var _catalogList = require('../catalog-view/catalog-list');

var _catalogList2 = _interopRequireDefault(_catalogList);

var _Tabs = require('../modal-window/Tabs');

var _Tabs2 = _interopRequireDefault(_Tabs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var styles = function styles(theme) {
  return {
    root: {
      height: 300
    },
    wrapper: {
      width: 250 + theme.spacing.unit * 2
    },
    paper: {
      zIndex: 1,
      position: 'relative',
      margin: theme.spacing.unit
    },
    svg: {
      height: 600
    },
    polygon: {
      fill: theme.palette.common.white,
      stroke: theme.palette.divider,
      strokeWidth: 1
    }
  };
};

var SimpleSlide = function (_React$Component) {
  _inherits(SimpleSlide, _React$Component);

  function SimpleSlide() {
    _classCallCheck(this, SimpleSlide);

    return _possibleConstructorReturn(this, (SimpleSlide.__proto__ || Object.getPrototypeOf(SimpleSlide)).apply(this, arguments));
  }

  _createClass(SimpleSlide, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      if (nextProps.checked === this.props.checked) {
        return false;
      } else return true;
    }
  }, {
    key: 'render',
    value: function render() {
      var state = this.props.state;
      var classes = this.props.classes;


      return _react2.default.createElement(
        'div',
        { className: classes.root },
        _react2.default.createElement(
          'div',
          { className: classes.wrapper },
          _react2.default.createElement(
            _Slide2.default,
            { direction: 'right', 'in': this.props.checked, mountOnEnter: true, unmountOnExit: true },
            _react2.default.createElement(
              _Paper2.default,
              { elevation: 4, className: classes.paper },
              _react2.default.createElement(_catalogList2.default, { state: state, width: 250, height: 600 }),
              _react2.default.createElement('svg', { className: classes.svg })
            )
          )
        )
      );
    }
  }]);

  return SimpleSlide;
}(_react2.default.Component);

SimpleSlide.propTypes = {
  classes: _propTypes2.default.object.isRequired
};

exports.default = (0, _styles.withStyles)(styles)(SimpleSlide);