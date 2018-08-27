var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import React from 'react';
import PropTypes from 'prop-types';
import PanelElementEditor from './panel-element-editor/panel-element-editor';
import * as SharedStyle from '../../shared-style';
import If from '../../utils/react-if';
import Button from '@material-ui/core/Button';
import { FormSubmitButton, FormGetMoreInfoButton } from '../style/export';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import ButtonMD from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

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
  return React.createElement(
    If,
    { key: ind, condition: el.condition,
      style: { position: 'relative' } },
    el.dom
  );
};

export default function Sidebar(_ref, _ref2) {
  var props = _ref.props,
      state = _ref.state,
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

  var elements = React.createElement(PanelElementEditor, { state: state });
  var sorter = [
  // { index: 0, condition: true, dom: <PanelLayers state={state} /> },
  // { index: 1, condition: true, dom: <PanelLayerElements mode={state.mode} layers={state.scene.layers} selectedLayer={state.scene.selectedLayer} /> },
  { index: 2, condition: true, dom: elements }];

  sorter = sorter.concat(sidebarComponents.map(function (Component, key) {
    return Component.prototype ? //if is a react component
    {
      condition: true,
      dom: React.createElement(Component, { state: state, key: key })
    } : { //else is a sortable toolbar button
      index: Component.index,
      condition: Component.condition,
      dom: React.createElement(Component.dom, { state: state, key: key })
    };
  }));

  var save = function save(event) {
    viewer3DActions.selectTool3DView();
    setTimeout(st, 1);
  };

  function st() {
    projectActions.rollback();
  }
  var redirectUrl = void 0;
  if (selectedObject != null) {
    var searchParams = new URLSearchParams(location.search);
    var id = { curlid: searchParams.get('curlid') || '' };
    redirectUrl = "http://rentservice.getwider.com/edit_room/?curlid={" + id.curlid + "}&id_room={" + selectedObject.id + "}";
  }

  var classes = { root: 'classes-state-root' };

  return React.createElement(
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
    React.createElement(
      'h2',
      { style: STYLE_TITLE },
      translator.t('Settings')
    ),
    sorter.sort(sortButtonsCb).map(mapButtonsCb),
    React.createElement(
      FormSubmitButton,
      { onClick: save },
      translator.t('Apply changes')
    ),
    React.createElement(
      'div',
      null,
      React.createElement(
        'form',
        { action: redirectUrl },
        React.createElement(
          FormGetMoreInfoButton,
          null,
          '\u041F\u043E\u0434\u0440\u043E\u0431\u043D\u0435\u0435 \u043E \u043F\u043E\u043C\u0435\u0449\u0435\u043D\u0438\u0438'
        )
      )
    ),
    React.createElement(
      Button,
      { variant: 'contained', color: 'blueGrey' },
      'Test Button'
    )
  );
}

Sidebar.propTypes = {
  state: PropTypes.object.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired
};

Sidebar.contextTypes = {
  projectActions: PropTypes.object.isRequired,
  translator: PropTypes.object.isRequired,
  viewer3DActions: PropTypes.object.isRequired
};