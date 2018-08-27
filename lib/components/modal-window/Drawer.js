'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _MenuList = require('@material-ui/core/MenuList');

var _MenuList2 = _interopRequireDefault(_MenuList);

var _MenuItem = require('@material-ui/core/MenuItem');

var _MenuItem2 = _interopRequireDefault(_MenuItem);

var _Paper = require('@material-ui/core/Paper');

var _Paper2 = _interopRequireDefault(_Paper);

var _styles = require('@material-ui/core/styles');

var _ListItemIcon = require('@material-ui/core/ListItemIcon');

var _ListItemIcon2 = _interopRequireDefault(_ListItemIcon);

var _ListItemText = require('@material-ui/core/ListItemText');

var _ListItemText2 = _interopRequireDefault(_ListItemText);

var _MoveToInbox = require('@material-ui/icons/MoveToInbox');

var _MoveToInbox2 = _interopRequireDefault(_MoveToInbox);

var _Drafts = require('@material-ui/icons/Drafts');

var _Drafts2 = _interopRequireDefault(_Drafts);

var _Send = require('@material-ui/icons/Send');

var _Send2 = _interopRequireDefault(_Send);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = function styles(theme) {
  return {
    menuItem: {
      '&:focus': {
        backgroundColor: theme.palette.primary.main,
        '& $primary, & $icon': {
          color: theme.palette.common.white
        }
      }
    },
    primary: {},
    icon: {}
  };
};

function ListItemComposition(props) {
  var classes = props.classes;


  return _react2.default.createElement(
    _Paper2.default,
    null,
    _react2.default.createElement(
      _MenuList2.default,
      null,
      _react2.default.createElement(
        _MenuItem2.default,
        { className: classes.menuItem },
        _react2.default.createElement(
          _ListItemIcon2.default,
          { className: classes.icon },
          _react2.default.createElement(_Send2.default, null)
        ),
        _react2.default.createElement(_ListItemText2.default, { classes: { primary: classes.primary }, inset: true, primary: 'Sent mail' })
      ),
      _react2.default.createElement(
        _MenuItem2.default,
        { className: classes.menuItem },
        _react2.default.createElement(
          _ListItemIcon2.default,
          { className: classes.icon },
          _react2.default.createElement(_Drafts2.default, null)
        ),
        _react2.default.createElement(_ListItemText2.default, { classes: { primary: classes.primary }, inset: true, primary: 'Drafts' })
      ),
      _react2.default.createElement(
        _MenuItem2.default,
        { className: classes.menuItem },
        _react2.default.createElement(
          _ListItemIcon2.default,
          { className: classes.icon },
          _react2.default.createElement(_MoveToInbox2.default, null)
        ),
        _react2.default.createElement(_ListItemText2.default, { classes: { primary: classes.primary }, inset: true, primary: 'Inbox' })
      ),
      _react2.default.createElement(
        _MenuItem2.default,
        { className: classes.menuItem },
        _react2.default.createElement(
          _ListItemIcon2.default,
          { className: classes.icon },
          _react2.default.createElement(_MoveToInbox2.default, null)
        ),
        _react2.default.createElement(_ListItemText2.default, { classes: { primary: classes.primary }, inset: true, primary: 'Inbox' })
      )
    )
  );
}

ListItemComposition.propTypes = {
  classes: _propTypes2.default.object.isRequired
};

exports.default = (0, _styles.withStyles)(styles)(ListItemComposition);