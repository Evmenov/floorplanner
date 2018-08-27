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

var styles = {
  card: {
    minWidth: 275,
    position: 'absolute',
    right: 50,
    top: 5
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

var sortButtonsCb = function sortButtonsCb(a, b) {
  if (a.index === undefined || a.index === null) {
    a.index = Number.MAX_SAFE_INTEGER;
  }

  if (b.index === undefined || b.index === null) {
    b.index = Number.MAX_SAFE_INTEGER;
  }

  return a.index - b.index;
};

var mapButtonsCb = function mapButtonsCb(el, ind) {
  return _react2.default.createElement(
    _reactIf2.default,
    { key: ind, condition: el.condition, style: { position: 'relative' } },
    el.dom
  );
};

function SimpleCard(props) {
  var classes = props.classes;

  var bull = _react2.default.createElement(
    'span',
    { className: classes.bullet },
    '\u2022'
  );

  if (props.selectedObject == null) {
    //STYLE.visibility = 'hidden';
  } else {} //STYLE.visibility = 'visible';

  var elements = _react2.default.createElement(_panelElementEditor2.default, { state: props.state });
  var sorter = [{ index: 2, condition: true, dom: elements }];
  sorter = sorter.concat(props.sidebarComponents.map(function (Component, key) {
    return Component.prototype ? //if is a react component
    {
      condition: true,
      dom: _react2.default.createElement(Component, { state: state, key: key })
    } : { //else is a sortable toolbar button
      index: Component.index,
      condition: Component.condition,
      dom: _react2.default.createElement(Component.dom, { state: state, key: key })
    };
  }));

  var save = function save(event) {
    props.viewer3DActions.selectTool3DView();
    setTimeout(st, 1);
  };
  function st() {
    props.projectActions.rollback();
  }

  var redirectUrl = void 0;
  if (props.selectedObject != null) {
    var searchParams = new URLSearchParams(location.search);
    var id = { curlid: searchParams.get('curlid') || '' };
    redirectUrl = "http://rentservice.getwider.com/edit_room/?curlid={" + id.curlid + "}&id_room={" + props.selectedObject.id + "}";
  }

  var body = void 0;
  if (props.selectedObject == null) {
    body = _react2.default.createElement(
      _Card2.default,
      { className: classes.card },
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
          '\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043E\u0431\u044A\u0435\u043A\u0442 \u0434\u043B\u044F \u0440\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u044F'
        )
      )
    );
  } else {
    body = _react2.default.createElement(
      _Card2.default,
      { className: classes.card },
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
          { variant: 'headline', component: 'h2' },
          sorter.sort(sortButtonsCb).map(mapButtonsCb)
        )
      ),
      _react2.default.createElement(
        _CardActions2.default,
        null,
        _react2.default.createElement(
          _Button2.default,
          { onClick: save },
          props.translator.t('Apply changes')
        ),
        _react2.default.createElement(
          'form',
          { action: redirectUrl },
          _react2.default.createElement(
            _Button2.default,
            null,
            props.translator.t('Edit')
          )
        )
      )
    );
  }

  return _react2.default.createElement(
    'div',
    null,
    body
  );
}

SimpleCard.propTypes = {
  classes: _propTypes2.default.object.isRequired
};

exports.default = (0, _styles.withStyles)(styles)(SimpleCard);