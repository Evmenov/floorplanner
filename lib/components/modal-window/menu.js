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

var _BottomNavigation = require('@material-ui/core/BottomNavigation');

var _BottomNavigation2 = _interopRequireDefault(_BottomNavigation);

var _BottomNavigationAction = require('@material-ui/core/BottomNavigationAction');

var _BottomNavigationAction2 = _interopRequireDefault(_BottomNavigationAction);

var _Restore = require('@material-ui/icons/Restore');

var _Restore2 = _interopRequireDefault(_Restore);

var _Favorite = require('@material-ui/icons/Favorite');

var _Favorite2 = _interopRequireDefault(_Favorite);

var _LocationOn = require('@material-ui/icons/LocationOn');

var _LocationOn2 = _interopRequireDefault(_LocationOn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var styles = {
  root: {
    width: 500
  }
};

var SimpleBottomNavigation = function (_React$Component) {
  _inherits(SimpleBottomNavigation, _React$Component);

  function SimpleBottomNavigation() {
    _classCallCheck(this, SimpleBottomNavigation);

    return _possibleConstructorReturn(this, (SimpleBottomNavigation.__proto__ || Object.getPrototypeOf(SimpleBottomNavigation)).apply(this, arguments));
  }

  _createClass(SimpleBottomNavigation, [{
    key: 'render',


    // handleChange = (event, value) => {
    //   this.setState({ value });
    // };

    value: function render() {
      var classes = this.props.classes;


      return _react2.default.createElement(
        _BottomNavigation2.default,
        {
          value: 3
          //onChange={this.handleChange}
          , showLabels: true,
          className: classes.root
        },
        _react2.default.createElement(_BottomNavigationAction2.default, { label: 'Recents', icon: _react2.default.createElement(_Restore2.default, null) }),
        _react2.default.createElement(_BottomNavigationAction2.default, { label: 'Favorites', icon: _react2.default.createElement(_Favorite2.default, null) }),
        _react2.default.createElement(_BottomNavigationAction2.default, { label: 'Nearby', icon: _react2.default.createElement(_LocationOn2.default, null) })
      );
    }
  }]);

  return SimpleBottomNavigation;
}(_react2.default.Component);

SimpleBottomNavigation.propTypes = {
  classes: _propTypes2.default.object.isRequired
};

exports.default = (0, _styles.withStyles)(styles)(SimpleBottomNavigation);