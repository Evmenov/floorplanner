'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _md = require('react-icons/lib/md');

var _fa = require('react-icons/lib/fa');

var _toolbarButton = require('./toolbar-button');

var _toolbarButton2 = _interopRequireDefault(_toolbarButton);

var _toolbarSaveButton = require('./toolbar-save-button');

var _toolbarSaveButton2 = _interopRequireDefault(_toolbarSaveButton);

var _toolbarLoadButton = require('./toolbar-load-button');

var _toolbarLoadButton2 = _interopRequireDefault(_toolbarLoadButton);

var _reactIf = require('../../utils/react-if');

var _reactIf2 = _interopRequireDefault(_reactIf);

var _constants = require('../../constants');

var _sharedStyle = require('../../shared-style');

var SharedStyle = _interopRequireWildcard(_sharedStyle);

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

var _GridOn = require('@material-ui/icons/GridOn');

var _GridOn2 = _interopRequireDefault(_GridOn);

var _Replay = require('@material-ui/icons/Replay');

var _Replay2 = _interopRequireDefault(_Replay);

var _SettingsApplicationsOutlined = require('@material-ui/icons/SettingsApplicationsOutlined');

var _SettingsApplicationsOutlined2 = _interopRequireDefault(_SettingsApplicationsOutlined);

var _Group = require('@material-ui/icons/Group');

var _Group2 = _interopRequireDefault(_Group);

var _KeyboardArrowRight = require('@material-ui/icons/KeyboardArrowRight');

var _KeyboardArrowRight2 = _interopRequireDefault(_KeyboardArrowRight);

var _Save = require('@material-ui/icons/Save');

var _Save2 = _interopRequireDefault(_Save);

var _layerOperations = require('../../utils/layer-operations');

var _Catalog = require('../modal-window/Catalog');

var _Catalog2 = _interopRequireDefault(_Catalog);

var _SettingsDialog = require('../modal-window/SettingsDialog');

var _SettingsDialog2 = _interopRequireDefault(_SettingsDialog);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var iconTextStyle = {
  fontSize: '19px',
  textDecoration: 'none',
  fontWeight: 'bold',
  userSelect: 'none'
};

var Icon2D = function Icon2D() {
  return _react2.default.createElement(
    'p',
    { style: iconTextStyle },
    '2D'
  );
};
var Icon3D = function Icon3D() {
  return _react2.default.createElement(
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
  return _react2.default.createElement(
    _reactIf2.default,
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
            return (0, _layerOperations.unselectAll)(layer);
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
        index: 0, condition: allowProjectFileSupport, dom: _react2.default.createElement(
          _toolbarButton2.default,
          {
            active: false,
            tooltip: translator.t('New project'),
            onClick: function onClick(event) {
              return confirm(translator.t('Would you want to start a new Project?')) ? projectActions.newProject() : null;
            } },
          _react2.default.createElement(_md.MdAddCircleOutline, null)
        )
      }, {
        index: 1, condition: allowProjectFileSupport,
        dom: _react2.default.createElement(_toolbarSaveButton2.default, { state: state })
      }, {
        index: 2, condition: allowProjectFileSupport,
        dom: _react2.default.createElement(_toolbarLoadButton2.default, { state: state })
      }, {
        index: 3, condition: true,
        dom: _react2.default.createElement(
          _toolbarButton2.default,
          {
            active: [_constants.MODE_VIEWING_CATALOG].includes(mode),
            tooltip: translator.t('Open catalog'),
            onClick: function onClick(event) {
              return projectActions.openCatalog();
            } },
          _react2.default.createElement(_md.MdKeyboardArrowRight, null)
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
        index: 5, condition: true, dom: _react2.default.createElement(
          _toolbarButton2.default,
          {
            active: [_constants.MODE_IDLE].includes(mode),
            tooltip: translator.t('2D View'),
            onClick: function onClick(event) {
              return projectActions.rollback();
            } },
          [_constants.MODE_3D_FIRST_PERSON, _constants.MODE_3D_VIEW].includes(mode) ? _react2.default.createElement(_md.MdGridOn, null) : _react2.default.createElement(_md.MdGridOn, null)
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
        index: 7, condition: true, dom: _react2.default.createElement(
          _toolbarButton2.default,
          {
            active: false,
            tooltip: translator.t('Undo (CTRL-Z)'),
            onClick: function onClick(event) {
              return projectActions.undo();
            } },
          _react2.default.createElement(_md.MdUndo, null)
        )
      }, {
        index: 8, condition: true, dom: _react2.default.createElement(
          _toolbarButton2.default,
          {
            active: [_constants.MODE_CONFIGURING_PROJECT].includes(mode),
            tooltip: translator.t('Configure project'),
            onClick: function onClick(event) {
              return projectActions.openProjectConfigurator();
            } },
          _react2.default.createElement(_md.MdSettingsApplications, null)
        )
      }, {
        index: 9, condition: true, dom: _react2.default.createElement(
          _toolbarButton2.default,
          {
            active: [_constants.MODE_AGENTS_VIEWER].includes(mode),
            tooltip: translator.t('View agents'),
            onClick: function onClick(event) {
              return projectActions.openAgentsVIew();
            } },
          _react2.default.createElement(_md.MdPeople, null)
        )
      }];

      sorter = sorter.concat(toolbarButtons.map(function (Component, key) {
        return Component.prototype ? //if is a react component
        {
          condition: true,
          dom: _react2.default.createElement(Component, { mode: mode, state: state, key: key })
        } : { //else is a sortable toolbar button
          index: Component.index,
          condition: Component.condition,
          dom: _react2.default.createElement(Component.dom, { mode: mode, state: state, key: key })
        };
      }));

      return (
        // <aside style={{ ...ASIDE_STYLE, maxWidth: width, maxHeight: height }} className='toolbar'>
        //   {sorter.sort(sortButtonsCb).map(mapButtonsCb)}
        // </aside>
        _react2.default.createElement(
          _Paper2.default,
          { style: { maxWidth: width, maxHeight: height } },
          _react2.default.createElement(
            _MenuList2.default,
            null,
            _react2.default.createElement(
              _MenuItem2.default,
              { className: classes.menuItem, onClick: uploadAction },
              _react2.default.createElement(
                _ListItemIcon2.default,
                { className: classes.icon },
                _react2.default.createElement(_Save2.default, null)
              ),
              _react2.default.createElement(_ListItemText2.default, { classes: { primary: classes.primary }, inset: true, primary: '\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C' })
            ),
            _react2.default.createElement(
              _MenuItem2.default,
              { className: classes.menuItem, onClick: function onClick() {
                  return _this2.props.onInvertCatalog();
                } },
              _react2.default.createElement(
                _ListItemIcon2.default,
                { className: classes.icon },
                _react2.default.createElement(_KeyboardArrowRight2.default, null)
              ),
              _react2.default.createElement(_ListItemText2.default, { classes: { primary: classes.primary }, inset: true, primary: '\u041A\u0430\u0442\u0430\u043B\u043E\u0433' })
            ),
            _react2.default.createElement(
              _MenuItem2.default,
              { className: classes.menuItem, onClick: function onClick(event) {
                  return projectActions.rollback();
                } },
              _react2.default.createElement(
                _ListItemIcon2.default,
                { className: classes.icon },
                _react2.default.createElement(_GridOn2.default, null)
              ),
              _react2.default.createElement(_ListItemText2.default, { classes: { primary: classes.primary }, inset: true, primary: '\u0421\u0445\u0435\u043C\u0430' })
            ),
            _react2.default.createElement(
              _MenuItem2.default,
              { className: classes.menuItem, onClick: function onClick(event) {
                  return projectActions.undo();
                } },
              _react2.default.createElement(
                _ListItemIcon2.default,
                { className: classes.icon },
                _react2.default.createElement(_Replay2.default, null)
              ),
              _react2.default.createElement(_ListItemText2.default, { classes: { primary: classes.primary }, inset: true, primary: '\u041D\u0430\u0437\u0430\u0434' })
            ),
            _react2.default.createElement(
              _MenuItem2.default,
              { className: classes.menuItem, onClick: function onClick() {
                  return _this2.props.onInvertSettings();
                } },
              _react2.default.createElement(
                _ListItemIcon2.default,
                { className: classes.icon },
                _react2.default.createElement(_SettingsApplicationsOutlined2.default, null)
              ),
              _react2.default.createElement(_ListItemText2.default, { classes: { primary: classes.primary }, inset: true, primary: '\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438' })
            ),
            _react2.default.createElement(
              _MenuItem2.default,
              { className: classes.menuItem, onClick: function onClick(event) {
                  return projectActions.openAgentsVIew();
                } },
              _react2.default.createElement(
                _ListItemIcon2.default,
                { className: classes.icon },
                _react2.default.createElement(_Group2.default, null)
              ),
              _react2.default.createElement(_ListItemText2.default, { classes: { primary: classes.primary }, inset: true, primary: '\u0410\u0433\u0435\u043D\u0442\u044B' })
            )
          ),
          _react2.default.createElement(_Catalog2.default, { checked: this.props.checked,
            tabValue: this.props.tabValue,
            ontabValueChanged: function ontabValueChanged() {
              return _this2.props.ontabValueChanged();
            },
            state: state }),
          _react2.default.createElement(_SettingsDialog2.default, { state: state, dialogIsOpen: this.props.dialogIsOpen, onInvertSettings: function onInvertSettings() {
              return _this2.props.onInvertSettings();
            } })
        )
      );
    }
  }]);

  return Toolbar;
}(_react.Component);

exports.default = Toolbar;


Toolbar.propTypes = {
  state: _propTypes2.default.object.isRequired,
  width: _propTypes2.default.number.isRequired,
  height: _propTypes2.default.number.isRequired,
  allowProjectFileSupport: _propTypes2.default.bool.isRequired,
  toolbarButtons: _propTypes2.default.array
};

Toolbar.contextTypes = {
  projectActions: _propTypes2.default.object.isRequired,
  viewer2DActions: _propTypes2.default.object.isRequired,
  viewer3DActions: _propTypes2.default.object.isRequired,
  linesActions: _propTypes2.default.object.isRequired,
  holesActions: _propTypes2.default.object.isRequired,
  itemsActions: _propTypes2.default.object.isRequired,
  translator: _propTypes2.default.object.isRequired
};