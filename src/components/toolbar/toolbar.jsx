import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { MdSettings, MdUndo, MdDirectionsRun, MdAddCircleOutline, MdSave, MdFolderOpen, MdKeyboardArrowRight, MdDehaze, MdGridOn, MdSettingsApplications, MdPeople, MdPhoto } from 'react-icons/lib/md';
import { FaFileO, FaMousePointer, FaPlus } from 'react-icons/lib/fa';
import ToolbarButton from './toolbar-button';
import ToolbarSaveButton from './toolbar-save-button';
import ToolbarLoadButton from './toolbar-load-button';
import If from '../../utils/react-if';
import {
  MODE_IDLE,
  MODE_3D_VIEW,
  MODE_3D_FIRST_PERSON,
  MODE_VIEWING_CATALOG,
  MODE_CONFIGURING_PROJECT, MODE_AGENTS_VIEWER
} from '../../constants';
import * as SharedStyle from '../../shared-style';


import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import GridOnIcon from '@material-ui/icons/GridOn';
import BackIcon from '@material-ui/icons/Replay';
import SettingsIcon from '@material-ui/icons/SettingsApplicationsOutlined';
import AgentsIcon from '@material-ui/icons/Group';
import DraftsIcon from '@material-ui/icons/KeyboardArrowRight';
import SaveIcon from '@material-ui/icons/Save';
import {unselectAll} from "../../utils/layer-operations";

import Listmenu from "../modal-window/Catalog";
import AlertDialogSlide from "../modal-window/SettingsDialog";




const iconTextStyle = {
  fontSize: '19px',
  textDecoration: 'none',
  fontWeight: 'bold',
  userSelect: 'none'
};

const Icon2D = () => <p style={iconTextStyle}>2D</p>;
const Icon3D = () => <p style={iconTextStyle}>3D</p>;

const ASIDE_STYLE = {
  backgroundColor: '#9799ac',
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

const mapButtonsCb = (el, ind) => {
  return (
    <If
      key={ind}
      condition={el.condition}
      style={{ position: 'relative' }}
    >
      {el.dom}
    </If>
  );
};

const classes={
  root: 'classes-state-root', };


export default class Toolbar extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {};
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.props.state.mode !== nextProps.state.mode ||
      this.props.height !== nextProps.height ||
      this.props.width !== nextProps.width ||
      nextProps.checked !== this.props.checked ||
      nextProps.tabValue !== this.props.tabValue ||
      nextProps.dialogIsOpen !== this.props.dialogIsOpen
  }


  render() {

    let {
      props: { state, width, height, toolbarButtons, allowProjectFileSupport },
      context: { projectActions, viewer3DActions, translator }
    } = this;

    let uploadAction = event => {
      const url = 'http://rentservice.getwider.com/corpsupdate/';

      let scene = state
        .get('scene')
        .update('layers', layers => layers.map(layer => unselectAll(layer)))
        .toJS();

      event.preventDefault();
      const datas = new FormData(event.target);

      const searchParams = new URLSearchParams(location.search);
      let id = {curlid: searchParams.get('curlid') || ''};

      datas.set('curlid', id.curlid);
      datas.set('jsstring', JSON.stringify(scene));
      console.log(scene);

      var request = new Request(url,{
        method: 'POST',
        body: datas,
      });

      fetch(request).then(function (res) {
        if (res.ok) {
          alert("Сохранение прошло успешно!");
          window.location.href='http://rentservice.getwider.com/company/objects/?curlid={' + id.curlid + '}';
        } else if (res.status == 401) {
          alert("Сервер отклонил сохранение. Код ошибки " + res.status);
        }
      }, function (e) {
        alert("Error submitting form!");
      });
    };

    let mode = state.get('mode');

    let sorter = [
           {
        index: 0, condition: allowProjectFileSupport, dom: <ToolbarButton
          active={false}
          tooltip={translator.t('New project')}
          onClick={event => confirm(translator.t('Would you want to start a new Project?')) ? projectActions.newProject() : null}>
          <MdAddCircleOutline />
        </ToolbarButton>
      },
      {
        index: 1, condition: allowProjectFileSupport,
        dom: <ToolbarSaveButton state={state} />
      },
      {
        index: 2, condition: allowProjectFileSupport,
        dom: <ToolbarLoadButton state={state} />
      },
      {
        index: 3, condition: true,
        dom: <ToolbarButton
          active={[MODE_VIEWING_CATALOG].includes(mode)}
          tooltip={translator.t('Open catalog')}
          onClick={event => projectActions.openCatalog()}>
          <MdKeyboardArrowRight />
        </ToolbarButton>
      },
     // {
        // index: 4, condition: true, dom: <ToolbarButton
        //   active={[MODE_3D_VIEW].includes(mode)}
        //   tooltip={translator.t('3D View')}
        //   onClick={event => viewer3DActions.selectTool3DView()}>
        //   <Icon3D />
        // </ToolbarButton>
    //  },
      {
        index: 5, condition: true, dom: <ToolbarButton
          active={[MODE_IDLE].includes(mode)}
          tooltip={translator.t('2D View')}
          onClick={event => projectActions.rollback()}>
          {[MODE_3D_FIRST_PERSON, MODE_3D_VIEW].includes(mode) ? <MdGridOn /> : <MdGridOn />}
        </ToolbarButton>
      },
      // {
      //   index: 6, condition: true, dom: <ToolbarButton
      //     active={[MODE_3D_FIRST_PERSON].includes(mode)}
      //     tooltip={translator.t('3D First Person')}
      //     onClick={event => viewer3DActions.selectTool3DFirstPerson()}>
      //     <MdDirectionsRun />
      //   </ToolbarButton>
      // },
            {
        index: 7, condition: true, dom: <ToolbarButton
          active={false}
          tooltip={translator.t('Undo (CTRL-Z)')}
          onClick={event => projectActions.undo()}>
          <MdUndo />
        </ToolbarButton>
      },
      {
        index: 8, condition: true, dom: <ToolbarButton
          active={[MODE_CONFIGURING_PROJECT].includes(mode)}
          tooltip={translator.t('Configure project')}
          onClick={event => projectActions.openProjectConfigurator()}>
          <MdSettingsApplications />
        </ToolbarButton>
      },
      {
        index: 9, condition: true, dom: <ToolbarButton
          active={[MODE_AGENTS_VIEWER].includes(mode)}
          tooltip={translator.t('View agents')}
          onClick={event => projectActions.openAgentsVIew()}>
          <MdPeople />
        </ToolbarButton>
      }
    ];

    sorter = sorter.concat(toolbarButtons.map((Component, key) => {
      return Component.prototype ? //if is a react component
        {
          condition: true,
          dom: React.createElement(Component, { mode, state, key })
        } :
        {                           //else is a sortable toolbar button
          index: Component.index,
          condition: Component.condition,
          dom: React.createElement(Component.dom, { mode, state, key })
        };
    }));

    console.log(this.props.tabValue)
    return (
     // <aside style={{ ...ASIDE_STYLE, maxWidth: width, maxHeight: height }} className='toolbar'>
     //   {sorter.sort(sortButtonsCb).map(mapButtonsCb)}
     // </aside>
      <Paper>
      <MenuList>

      <MenuItem className={classes.menuItem} onClick={uploadAction}>
  <ListItemIcon className={classes.icon}>
  <SaveIcon />
    </ListItemIcon>
    <ListItemText classes={{ primary: classes.primary }} inset primary="Сохранить" />
    </MenuItem>

    <MenuItem className={classes.menuItem} onClick={() => this.props.onInvertCatalog()}>
      <ListItemIcon className={classes.icon}>
        <DraftsIcon />
      </ListItemIcon>
      <ListItemText classes={{ primary: classes.primary }} inset primary="Каталог" />
    </MenuItem>

    <MenuItem className={classes.menuItem} onClick={event => projectActions.rollback()}>
      <ListItemIcon className={classes.icon}>
         <GridOnIcon />
     </ListItemIcon>
    <ListItemText classes={{ primary: classes.primary }} inset primary="Схема" />
    </MenuItem>

    <MenuItem className={classes.menuItem} onClick={event => projectActions.undo()}>
      <ListItemIcon className={classes.icon}>
        <BackIcon />
      </ListItemIcon>
      <ListItemText classes={{ primary: classes.primary }} inset primary="Назад" />
    </MenuItem>

    <MenuItem className={classes.menuItem} onClick={() => this.props.onInvertSettings()}>
      <ListItemIcon className={classes.icon}>
        <SettingsIcon />
      </ListItemIcon>
      <ListItemText classes={{ primary: classes.primary }} inset primary="Настройки" />
    </MenuItem>

    <MenuItem className={classes.menuItem} onClick={event => projectActions.openAgentsVIew()}>
      <ListItemIcon className={classes.icon}>
        <AgentsIcon />
      </ListItemIcon>
      <ListItemText classes={{ primary: classes.primary }} inset primary="Агенты" />
    </MenuItem>

    </MenuList>
        <Listmenu checked={this.props.checked}
                  tabValue={this.props.tabValue}
                  ontabValueChanged={() => this.props.ontabValueChanged()}
                  state={state} />


        <AlertDialogSlide state={state} dialogIsOpen={this.props.dialogIsOpen} onInvertSettings={() => this.props.onInvertSettings()} />
  </Paper>


    )
  }
}

Toolbar.propTypes = {
  state: PropTypes.object.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  allowProjectFileSupport: PropTypes.bool.isRequired,
  toolbarButtons: PropTypes.array
};

Toolbar.contextTypes = {
  projectActions: PropTypes.object.isRequired,
  viewer2DActions: PropTypes.object.isRequired,
  viewer3DActions: PropTypes.object.isRequired,
  linesActions: PropTypes.object.isRequired,
  holesActions: PropTypes.object.isRequired,
  itemsActions: PropTypes.object.isRequired,
  translator: PropTypes.object.isRequired,
};
