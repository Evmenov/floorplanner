import React from 'react';
import PropTypes from 'prop-types';
import PanelElementEditor from './panel-element-editor/panel-element-editor';
import * as SharedStyle from '../../shared-style';
import If from '../../utils/react-if';
import Button from '@material-ui/core/Button';
import {
  FormSubmitButton,
  FormGetMoreInfoButton
} from '../style/export';


import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import ButtonMD from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const STYLE_TITLE = {
  fontSize: '16px',
  color: SharedStyle.PRIMARY_COLOR.text_alt,
  padding: '15px 25px 18px 15px',
  backgroundColor: '#32394f',
  textShadow: '-1px -1px 2px rgba(0, 0, 0, 1)',
  boxShadow: 'inset 0px -3px 19px 0px rgba(0,0,0,0.5)',
  margin: '0px',
};

let STYLE = {
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

const sortButtonsCb = (a, b) => {
  if (a.index === undefined || a.index === null) {
    a.index = Number.MAX_SAFE_INTEGER;
  }

  if (b.index === undefined || b.index === null) {
    b.index = Number.MAX_SAFE_INTEGER;
  }

  return a.index - b.index;
};

const mapButtonsCb = (el, ind) => <If key={ind} condition={el.condition}
                                      style={{ position: 'relative' }}>{el.dom}</If>;

export default function Sidebar({props, state, width, height, sidebarComponents, selectedObject },
                                {translator, projectActions, viewer3DActions}) {
 if(selectedObject == null){
  STYLE.visibility = 'hidden';
}
else  STYLE.visibility = 'visible';


let elements = <PanelElementEditor state={state} />;
  let sorter = [
   // { index: 0, condition: true, dom: <PanelLayers state={state} /> },
   // { index: 1, condition: true, dom: <PanelLayerElements mode={state.mode} layers={state.scene.layers} selectedLayer={state.scene.selectedLayer} /> },
    { index: 2, condition: true, dom: elements },
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

    let save = event => {
    viewer3DActions.selectTool3DView();
    setTimeout(st,1);
  };


  function st() {
    projectActions.rollback();
  }
  let redirectUrl;
  if(selectedObject != null){
    const searchParams = new URLSearchParams(location.search);
    let id = {curlid: searchParams.get('curlid') || ''};
    redirectUrl = "http://rentservice.getwider.com/edit_room/?curlid={" + id.curlid + "}&id_room={" + selectedObject.id + "}"
  }

  const classes ={root: 'classes-state-root'}

  return (
   <aside
     style={{ width, height, ...STYLE }}
      onKeyDown={event => event.stopPropagation()}
      onKeyUp={event => event.stopPropagation()}
      className="sidebar"
    >
     <h2 style={STYLE_TITLE}>{translator.t('Settings')}</h2>
     {sorter.sort(sortButtonsCb).map(mapButtonsCb)}

     <FormSubmitButton onClick={save} >{translator.t('Apply changes')}</FormSubmitButton>
<div>
     <form  action={redirectUrl}>
       <FormGetMoreInfoButton >Подробнее о помещении</FormGetMoreInfoButton>
     </form>
</div>
     <Button variant="contained" color="blueGrey">Test Button</Button>
    </aside>
  );
}

Sidebar.propTypes = {
  state: PropTypes.object.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};

Sidebar.contextTypes = {
  projectActions: PropTypes.object.isRequired,
  translator: PropTypes.object.isRequired,
  viewer3DActions: PropTypes.object.isRequired,
};
