import React from 'react';
import PropTypes from 'prop-types';
import PanelElementEditor from './panel-element-editor/panel-element-editor';
import * as SharedStyle from '../../shared-style';
import If from '../../utils/react-if';
import {
  FormSubmitButton,
} from '../style/export';

const STYLE = {
  backgroundColor: SharedStyle.PRIMARY_COLOR.main,
  display: 'absolute',
  overflowY: 'auto',
  position: 'absolute',
  left: 50,
  visibility: 'visible',
  overflowX: 'hidden',
  paddingBottom: '0px'
};

const sortButtonsCb = (a, b) => {
  if (a.index === undefined || a.index === null) {
    a.index = Number.MAX_SAFE_INTEGER;
  }

  if (b.index === undefined || b.index === null) {
    b.index = Number.MAX_SAFE_INTEGER;
  }

  return a.index - b.index;
};

const mapButtonsCb = (el, ind) => <If key={ind} condition={el.condition} style={{ position: 'relative' }}>{el.dom}</If>;

export default function Sidebar({ state, width, height, sidebarComponents }, {translator, projectActions, viewer3DActions}) {

let ele = <PanelElementEditor state={state} />;
  let sorter = [
   // { index: 0, condition: true, dom: <PanelLayers state={state} /> },
   // { index: 1, condition: true, dom: <PanelLayerElements mode={state.mode} layers={state.scene.layers} selectedLayer={state.scene.selectedLayer} /> },
    { index: 2, condition: true, dom: ele },
    //{ index: 999999, condition: true, dom: <PanelGuides state={state}/> },
  ];

  sorter = sorter.concat(sidebarComponents.map((Component, key) => {
    return Component.prototype ? //if is a react component
      {
        condition: true,
        dom: React.createElement(Component, { state, key })
      } :
      {                           //else is a sortable toolbar button
        index: Component.index,
        condition: Component.condition,
        dom: React.createElement(Component.dom, { state, key })
      };
  }));

  if(sorter[0].dom == null){

    console.log("2d12")
  }

  let save = event => {
    viewer3DActions.selectTool3DView();
    setTimeout(st,1);
  };

  function st() {
    projectActions.rollback();
  }

  return (
   <aside
      style={{ width, height, ...STYLE }}
      onKeyDown={event => event.stopPropagation()}
      onKeyUp={event => event.stopPropagation()}
      className="sidebar"
    >
      <div>
        <FormSubmitButton onClick={save} size='large'>{translator.t('Apply changes')}</FormSubmitButton>
      </div>
      {sorter.sort(sortButtonsCb).map(mapButtonsCb)}
    </aside>
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
  viewer3DActions: PropTypes.object.isRequired,
};
