var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { MdSettings, MdUndo, MdDirectionsRun, MdAddCircleOutline, MdSave, MdFolderOpen, MdKeyboardArrowRight, MdDehaze, MdGridOn, MdSettingsApplications, MdPeople, MdPhoto } from 'react-icons/lib/md';
import { FaFileO, FaMousePointer, FaPlus } from 'react-icons/lib/fa';
import ToolbarButton from './toolbar-button';
import ToolbarSaveButton from './toolbar-save-button';
import ToolbarLoadButton from './toolbar-load-button';
import If from '../../utils/react-if';
import { MODE_IDLE, MODE_3D_VIEW, MODE_3D_FIRST_PERSON, MODE_VIEWING_CATALOG, MODE_CONFIGURING_PROJECT, MODE_AGENTS_VIEWER } from '../../constants';
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
import { unselectAll } from "../../utils/layer-operations";

import Listmenu from "../modal-window/Catalog";
import AlertDialogSlide from "../modal-window/SettingsDialog";

var iconTextStyle = {
  fontSize: '19px',
  textDecoration: 'none',
  fontWeight: 'bold',
  userSelect: 'none'
};

var Icon2D = function Icon2D() {
  return React.createElement(
    'p',
    { style: iconTextStyle },
    '2D'
  );
};
var Icon3D = function Icon3D() {
  return React.createElement(
    'p',
    { style: iconTextStyle },
    '3D'
  );
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
    {
      key: ind,
      condition: el.condition,
      style: { position: 'relative' }
    },
    el.dom
  );
};

var classes = {
  root: 'classes-state-root' };

var Toolbar = function (_Component) {
  _inherits(Toolbar, _Component);

  function Toolbar(props, context) {
    _classCallCheck(this, Toolbar);

    var _this = _possibleConstructorReturn(this, (Toolbar.__proto__ || Object.getPrototypeOf(Toolbar)).call(this, props, context));

    _this.state = {};
    return _this;
  }

  _createClass(Toolbar, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return this.props.state.mode !== nextProps.state.mode || this.props.height !== nextProps.height || this.props.width !== nextProps.width || nextProps.checked !== this.props.checked || nextProps.tabValue !== this.props.tabValue || nextProps.dialogIsOpen !== this.props.dialogIsOpen;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          state = _props.state,
          width = _props.width,
          height = _props.height,
          toolbarButtons = _props.toolbarButtons,
          allowProjectFileSupport = _props.allowProjectFileSupport,
          _context = this.context,
          projectActions = _context.projectActions,
          viewer3DActions = _context.viewer3DActions,
          translator = _context.translator;


      var uploadAction = function uploadAction(event) {
        var url = 'http://rentservice.getwider.com/corpsupdate/';

        var scene = state.get('scene').update('layers', function (layers) {
          return layers.map(function (layer) {
            return unselectAll(layer);
          });
        }).toJS();

        event.preventDefault();
        var datas = new FormData(event.target);

        var searchParams = new URLSearchParams(location.search);
        var id = { curlid: searchParams.get('curlid') || '' };

        datas.set('curlid', id.curlid);
        datas.set('jsstring', JSON.stringify(scene));
        console.log(scene);

        var request = new Request(url, {
          method: 'POST',
          body: datas
        });

        fetch(request).then(function (res) {
          if (res.ok) {
            alert("Сохранение прошло успешно!");
            window.location.href = 'http://rentservice.getwider.com/company/objects/?curlid={' + id.curlid + '}';
          } else if (res.status == 401) {
            alert("Сервер отклонил сохранение. Код ошибки " + res.status);
          }
        }, function (e) {
          alert("Error submitting form!");
        });
      };

      var mode = state.get('mode');

      var sorter = [{
        index: 0, condition: allowProjectFileSupport, dom: React.createElement(
          ToolbarButton,
          {
            active: false,
            tooltip: translator.t('New project'),
            onClick: function onClick(event) {
              return confirm(translator.t('Would you want to start a new Project?')) ? projectActions.newProject() : null;
            } },
          React.createElement(MdAddCircleOutline, null)
        )
      }, {
        index: 1, condition: allowProjectFileSupport,
        dom: React.createElement(ToolbarSaveButton, { state: state })
      }, {
        index: 2, condition: allowProjectFileSupport,
        dom: React.createElement(ToolbarLoadButton, { state: state })
      }, {
        index: 3, condition: true,
        dom: React.createElement(
          ToolbarButton,
          {
            active: [MODE_VIEWING_CATALOG].includes(mode),
            tooltip: translator.t('Open catalog'),
            onClick: function onClick(event) {
              return projectActions.openCatalog();
            } },
          React.createElement(MdKeyboardArrowRight, null)
        )
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
        index: 5, condition: true, dom: React.createElement(
          ToolbarButton,
          {
            active: [MODE_IDLE].includes(mode),
            tooltip: translator.t('2D View'),
            onClick: function onClick(event) {
              return projectActions.rollback();
            } },
          [MODE_3D_FIRST_PERSON, MODE_3D_VIEW].includes(mode) ? React.createElement(MdGridOn, null) : React.createElement(MdGridOn, null)
        )
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
        index: 7, condition: true, dom: React.createElement(
          ToolbarButton,
          {
            active: false,
            tooltip: translator.t('Undo (CTRL-Z)'),
            onClick: function onClick(event) {
              return projectActions.undo();
            } },
          React.createElement(MdUndo, null)
        )
      }, {
        index: 8, condition: true, dom: React.createElement(
          ToolbarButton,
          {
            active: [MODE_CONFIGURING_PROJECT].includes(mode),
            tooltip: translator.t('Configure project'),
            onClick: function onClick(event) {
              return projectActions.openProjectConfigurator();
            } },
          React.createElement(MdSettingsApplications, null)
        )
      }, {
        index: 9, condition: true, dom: React.createElement(
          ToolbarButton,
          {
            active: [MODE_AGENTS_VIEWER].includes(mode),
            tooltip: translator.t('View agents'),
            onClick: function onClick(event) {
              return projectActions.openAgentsVIew();
            } },
          React.createElement(MdPeople, null)
        )
      }];

      sorter = sorter.concat(toolbarButtons.map(function (Component, key) {
        return Component.prototype ? //if is a react component
        {
          condition: true,
          dom: React.createElement(Component, { mode: mode, state: state, key: key })
        } : { //else is a sortable toolbar button
          index: Component.index,
          condition: Component.condition,
          dom: React.createElement(Component.dom, { mode: mode, state: state, key: key })
        };
      }));

      return (
        // <aside style={{ ...ASIDE_STYLE, maxWidth: width, maxHeight: height }} className='toolbar'>
        //   {sorter.sort(sortButtonsCb).map(mapButtonsCb)}
        // </aside>
        React.createElement(
          Paper,
          { style: { maxWidth: width, maxHeight: height } },
          React.createElement(
            MenuList,
            null,
            React.createElement(
              MenuItem,
              { className: classes.menuItem, onClick: uploadAction },
              React.createElement(
                ListItemIcon,
                { className: classes.icon },
                React.createElement(SaveIcon, null)
              ),
              React.createElement(ListItemText, { classes: { primary: classes.primary }, inset: true, primary: '\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C' })
            ),
            React.createElement(
              MenuItem,
              { className: classes.menuItem, onClick: function onClick() {
                  return _this2.props.onInvertCatalog();
                } },
              React.createElement(
                ListItemIcon,
                { className: classes.icon },
                React.createElement(DraftsIcon, null)
              ),
              React.createElement(ListItemText, { classes: { primary: classes.primary }, inset: true, primary: '\u041A\u0430\u0442\u0430\u043B\u043E\u0433' })
            ),
            React.createElement(
              MenuItem,
              { className: classes.menuItem, onClick: function onClick(event) {
                  return projectActions.rollback();
                } },
              React.createElement(
                ListItemIcon,
                { className: classes.icon },
                React.createElement(GridOnIcon, null)
              ),
              React.createElement(ListItemText, { classes: { primary: classes.primary }, inset: true, primary: '\u0421\u0445\u0435\u043C\u0430' })
            ),
            React.createElement(
              MenuItem,
              { className: classes.menuItem, onClick: function onClick(event) {
                  return projectActions.undo();
                } },
              React.createElement(
                ListItemIcon,
                { className: classes.icon },
                React.createElement(BackIcon, null)
              ),
              React.createElement(ListItemText, { classes: { primary: classes.primary }, inset: true, primary: '\u041D\u0430\u0437\u0430\u0434' })
            ),
            React.createElement(
              MenuItem,
              { className: classes.menuItem, onClick: function onClick() {
                  return _this2.props.onInvertSettings();
                } },
              React.createElement(
                ListItemIcon,
                { className: classes.icon },
                React.createElement(SettingsIcon, null)
              ),
              React.createElement(ListItemText, { classes: { primary: classes.primary }, inset: true, primary: '\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438' })
            ),
            React.createElement(
              MenuItem,
              { className: classes.menuItem, onClick: function onClick(event) {
                  return projectActions.openAgentsVIew();
                } },
              React.createElement(
                ListItemIcon,
                { className: classes.icon },
                React.createElement(AgentsIcon, null)
              ),
              React.createElement(ListItemText, { classes: { primary: classes.primary }, inset: true, primary: '\u0410\u0433\u0435\u043D\u0442\u044B' })
            )
          ),
          React.createElement(Listmenu, { checked: this.props.checked,
            tabValue: this.props.tabValue,
            ontabValueChanged: function ontabValueChanged() {
              return _this2.props.ontabValueChanged();
            },
            state: state }),
          React.createElement(AlertDialogSlide, { state: state, dialogIsOpen: this.props.dialogIsOpen, onInvertSettings: function onInvertSettings() {
              return _this2.props.onInvertSettings();
            } })
        )
      );
    }
  }]);

  return Toolbar;
}(Component);

export default Toolbar;


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
  translator: PropTypes.object.isRequired
};