var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import React from 'react';
import PropTypes from 'prop-types';
import PanelElementEditor from './panel-element-editor/panel-element-editor';
import * as SharedStyle from '../../shared-style';
import If from '../../utils/react-if';
import { FormSubmitButton } from '../style/export';

var STYLE = {
  backgroundColor: SharedStyle.PRIMARY_COLOR.main,
  display: 'block',
  overflowY: 'auto',
  overflowX: 'hidden',
  paddingBottom: '20px'
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
    { key: ind, condition: el.condition, style: { position: 'relative' } },
    el.dom
  );
};

export default function Sidebar(_ref, _ref2) {
  var state = _ref.state,
      width = _ref.width,
      height = _ref.height,
      sidebarComponents = _ref.sidebarComponents;
  var translator = _ref2.translator,
      projectActions = _ref2.projectActions,
      viewer3DActions = _ref2.viewer3DActions;


  var sorter = [
  // { index: 0, condition: true, dom: <PanelLayers state={state} /> },
  // { index: 1, condition: true, dom: <PanelLayerElements mode={state.mode} layers={state.scene.layers} selectedLayer={state.scene.selectedLayer} /> },
  { index: 2, condition: true, dom: React.createElement(PanelElementEditor, { state: state }) }];

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

  return React.createElement(
    'div',
    null,
    React.createElement(
      FormSubmitButton,
      { onClick: save, size: 'large' },
      translator.t('Apply changes')
    ),
    React.createElement(
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
      sorter.sort(sortButtonsCb).map(mapButtonsCb)
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