'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = Sidebar;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _panelElementEditor = require('./panel-element-editor/panel-element-editor');

var _panelElementEditor2 = _interopRequireDefault(_panelElementEditor);

var _sharedStyle = require('../../shared-style');

var SharedStyle = _interopRequireWildcard(_sharedStyle);

var _reactIf = require('../../utils/react-if');

var _reactIf2 = _interopRequireDefault(_reactIf);

var _export = require('../style/export');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var STYLE_TITLE = {
  fontSize: '16px',
  color: SharedStyle.PRIMARY_COLOR.text_alt,
  padding: '15px 25px 18px 15px',
  backgroundColor: '#32394f',
  textShadow: '-1px -1px 2px rgba(0, 0, 0, 1)',
  boxShadow: 'inset 0px -3px 19px 0px rgba(0,0,0,0.5)',
  margin: '0px'
};

var STYLE = {
  backgroundColor: '#32394f',
  display: 'absolute',
  overflowY: 'auto',
  position: 'absolute',
  right: 0,
  bottom: 20,
  visibility: 'visible',
  overflowX: 'hidden',
  paddingBottom: '0px'
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

function Sidebar(_ref, _ref2) {
  var state = _ref.state,
      width = _ref.width,
      height = _ref.height,
      sidebarComponents = _ref.sidebarComponents,
      selectedObject = _ref.selectedObject;
  var translator = _ref2.translator,
      projectActions = _ref2.projectActions,
      viewer3DActions = _ref2.viewer3DActions;


  if (selectedObject == null) {
    STYLE.visibility = 'hidden';
  } else STYLE.visibility = 'visible';

  var elements = _react2.default.createElement(_panelElementEditor2.default, { state: state });
  var sorter = [
  // { index: 0, condition: true, dom: <PanelLayers state={state} /> },
  // { index: 1, condition: true, dom: <PanelLayerElements mode={state.mode} layers={state.scene.layers} selectedLayer={state.scene.selectedLayer} /> },
  { index: 2, condition: true, dom: elements }];

  sorter = sorter.concat(sidebarComponents.map(function (Component, key) {
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
    viewer3DActions.selectTool3DView();
    setTimeout(st, 1);
  };

  function st() {
    projectActions.rollback();
  }

  return _react2.default.createElement(
    'aside',
    {
      style: _extends({ width: width, height: height }, STYLE),
      onKeyDown: function onKeyDown(event) {
        return event.stopPropagation();
      },
      onKeyUp: function onKeyUp(event) {
        return event.stopPropagation();
      },
      className: 'sidebar'
    },
    _react2.default.createElement(
      'h2',
      { style: STYLE_TITLE },
      translator.t('Settings')
    ),
    sorter.sort(sortButtonsCb).map(mapButtonsCb),
    _react2.default.createElement(
      _export.FormSubmitButton,
      { onClick: save },
      translator.t('Apply changes')
    )
  );
}

Sidebar.propTypes = {
  state: _propTypes2.default.object.isRequired,
  width: _propTypes2.default.number.isRequired,
  height: _propTypes2.default.number.isRequired
};

Sidebar.contextTypes = {
  projectActions: _propTypes2.default.object.isRequired,
  translator: _propTypes2.default.object.isRequired,
  viewer3DActions: _propTypes2.default.object.isRequired
};