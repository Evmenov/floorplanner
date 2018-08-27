'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _styles = require('@material-ui/core/styles');

var _Card = require('@material-ui/core/Card');

var _Card2 = _interopRequireDefault(_Card);

var _CardActions = require('@material-ui/core/CardActions');

var _CardActions2 = _interopRequireDefault(_CardActions);

var _CardContent = require('@material-ui/core/CardContent');

var _CardContent2 = _interopRequireDefault(_CardContent);

var _Button = require('@material-ui/core/Button');

var _Button2 = _interopRequireDefault(_Button);

var _Typography = require('@material-ui/core/Typography');

var _Typography2 = _interopRequireDefault(_Typography);

var _panelElementEditor = require('../sidebar/panel-element-editor/panel-element-editor');

var _panelElementEditor2 = _interopRequireDefault(_panelElementEditor);

var _reactIf = require('../../utils/react-if');

var _reactIf2 = _interopRequireDefault(_reactIf);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var positionStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  visibility: 'visible'
};
var styles = {
  card: {
    minWidth: 275,
    minHeight: 275,
    position: 'absolute'

  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)'
  },
  title: {
    marginBottom: 13,
    fontSize: 18
  },
  pos: {
    marginBottom: 12
  }
};

function SimpleCard(props) {
  var classes = props.classes;

  // if(props.selectedObject == null){
  //   positionStyle.visibility = 'hidden';
  //   return null;
  // }
  // else if(props.selectedObject.prototype == 'areas'){
  //   positionStyle.top = props.y;
  //   positionStyle.left = props.x;
  //   positionStyle.visibility = 'visible';
  // }
  // else{
  //   positionStyle.visibility = 'hidden';
  //   return null;
  // }

  var body = void 0;
  if (props.selectedObject != null) {

    positionStyle.left = props.y;
    body = _react2.default.createElement(
      _Card2.default,
      { className: classes.card, style: styles },
      _react2.default.createElement(
        _CardContent2.default,
        null,
        _react2.default.createElement(
          _Typography2.default,
          { className: classes.title },
          props.translator.t('Settings')
        ),
        _react2.default.createElement(
          _Typography2.default,
          { component: 'h3' },
          'sdgfsd'
        )
      )
    );
  } else {}

  return _react2.default.createElement(
    'div',
    { style: positionStyle },
    body
  );
}

SimpleCard.propTypes = {
  classes: _propTypes2.default.object.isRequired
};

exports.default = (0, _styles.withStyles)(styles)(SimpleCard);