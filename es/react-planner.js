var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import jsonTest from './jsonTest';

import Translator from './translator/translator';
import Catalog from './catalog/catalog';
import actions from './actions/export';
import { objectsMap } from './utils/objects-utils';
import { ToolbarComponents, Content, SidebarComponents, FooterBarComponents } from './components/export';
import { VERSION } from './version';
import RoomAdditionalPanel from './components/room-additional/room-additional';
import { browserUpload } from "./utils/browser";
import SimpleBottomNavigation from "./components/modal-window/menu";
import MiniDrawer from "./components/modal-window/Drawer";
import SimpleCard from "./components/modal-window/ToolbarMaterial";
import RoomInfo from "./components/modal-window/RoomInfo";
import Listmenu from "./components/modal-window/Catalog";
import AlertDialogSlide from "./components/modal-window/SettingsDialog";

var Toolbar = ToolbarComponents.Toolbar;
var Sidebar = SidebarComponents.Sidebar;
var FooterBar = FooterBarComponents.FooterBar;


var toolbarW = 270;
var sidebarH = 400;
var sidebarW = 300;
var footerBarH = 20;
var roomInfoH = 240;
var roomInfoW = 400;

var selectedObject = null;
var X = 0;
var Y = 0;

var wrapperStyle = {
  display: 'flex',
  flexFlow: 'row nowrap'
};
function getMoviesFromApiAsync(path) {
  console.log("sdfs");
}

var ReactPlanner = function (_Component) {
  _inherits(ReactPlanner, _Component);

  function ReactPlanner(props) {
    _classCallCheck(this, ReactPlanner);

    var _this = _possibleConstructorReturn(this, (ReactPlanner.__proto__ || Object.getPrototypeOf(ReactPlanner)).call(this, props));

    _this.state = {
      error: null,
      isLoaded: false,
      items: [],
      checked: false,
      dialogIsOpen: false,
      tabValue: 0,
      X: 0,
      Y: 0
    };
    return _this;
  }

  _createClass(ReactPlanner, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var projectActions = this.props.projectActions;


      projectActions.newProject();
      var searchParams = new URLSearchParams(location.search);
      var id = { curlid: searchParams.get('curlid') || '' };

      var url = 'http://rentservice.getwider.com/corpsget/';
      var request = new Request(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain;charset=UTF-8'
        },
        body: JSON.stringify({
          curlid: id.curlid
        })
      });
      ///index.html?curlid=50237c98-720c-4753-9d62-c9d294ad121c
      fetch(request).then(function (response) {
        if (response.status !== 200) {
          console.log('There was a problem. Status code: ' + response.status);
          return;
        }

        response.json().then(function (data) {

          projectActions.loadProject(data);
        });
      });
    }
  }, {
    key: 'getChildContext',
    value: function getChildContext() {
      var _this2 = this;

      return _extends({}, objectsMap(actions, function (actionNamespace) {
        return _this2.props[actionNamespace];
      }), {
        translator: this.props.translator,
        catalog: this.props.catalog,
        agents: jsonTest
      });
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      var store = this.context.store;
      var _props = this.props,
          projectActions = _props.projectActions,
          catalog = _props.catalog,
          stateExtractor = _props.stateExtractor,
          plugins = _props.plugins;

      plugins.forEach(function (plugin) {
        return plugin(store, stateExtractor);
      });
      projectActions.initCatalog(catalog);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var stateExtractor = nextProps.stateExtractor,
          state = nextProps.state,
          projectActions = nextProps.projectActions,
          catalog = nextProps.catalog;

      var plannerState = stateExtractor(state);
      var catalogReady = plannerState.getIn(['catalog', 'ready']);
      if (!catalogReady) {
        projectActions.initCatalog(catalog);
      }
    }
  }, {
    key: 'updateData',
    value: function updateData(value) {
      selectedObject = value;
    }
  }, {
    key: 'updateCoordinats',
    value: function updateCoordinats(x, y) {
      X = x;
      Y = y;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _props2 = this.props,
          width = _props2.width,
          height = _props2.height,
          state = _props2.state,
          stateExtractor = _props2.stateExtractor,
          prop = _objectWithoutProperties(_props2, ['width', 'height', 'state', 'stateExtractor']);

      this.state.X = X;
      this.state.Y = Y;

      var toolbarH = height - footerBarH;
      var contentH = height - footerBarH;
      var contentW = width - toolbarW;
      var extractedState = stateExtractor(state);

      return React.createElement(
        'div',
        { style: _extends({}, wrapperStyle, { height: height }) },
        React.createElement(Toolbar, _extends({ checked: this.state.checked,
          onInvertCatalog: function onInvertCatalog() {
            return _this3.setState({ checked: !_this3.state.checked });
          },
          dialogIsOpen: this.state.dialogIsOpen,
          onInvertSettings: function onInvertSettings() {
            return _this3.setState({ dialogIsOpen: !_this3.state.dialogIsOpen });
          },
          tabValue: this.state.tabValue,
          ontabValueChanged: function ontabValueChanged(value) {
            return _this3.setState({ tabValue: value });
          },
          width: toolbarW, height: toolbarH, state: extractedState }, prop)),
        React.createElement(Content, _extends({ width: contentW, height: contentH, state: extractedState,
          sidebarH: sidebarH, updateData: this.updateData,
          updateCoordinats: this.updateCoordinats }, prop, {
          onWheel: function onWheel(event) {
            return event.preventDefault();
          } })),
        React.createElement(SimpleCard, _extends({ width: sidebarW, height: sidebarH, state: extractedState,
          selectedObject: selectedObject }, prop)),
        React.createElement(FooterBar, _extends({ width: width, height: footerBarH, state: extractedState }, prop))
      )

      // <div style={{...wrapperStyle, height}}>
      //    <Content width={contentW + toolbarW} height={contentH + footerBarH} state={extractedState}
      //            sidebarH={sidebarH} updateData={this.updateData} updateCoordinats={this.updateCoordinats} {...prop} onWheel={event => event.preventDefault()} />
      //   <RoomInfo width={roomInfoW}
      //                        height={roomInfoH}
      //                        state={extractedState}
      //                        selectedObject={selectedObject}
      //                        x={this.state.X} y={this.state.Y} {...prop} />
      // </div>
      ;
    }
  }]);

  return ReactPlanner;
}(Component);

ReactPlanner.propTypes = {
  translator: PropTypes.instanceOf(Translator),
  catalog: PropTypes.instanceOf(Catalog),
  allowProjectFileSupport: PropTypes.bool,
  plugins: PropTypes.arrayOf(PropTypes.func),
  autosaveKey: PropTypes.string,
  autosaveDelay: PropTypes.number,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  stateExtractor: PropTypes.func.isRequired,
  toolbarButtons: PropTypes.array,
  sidebarComponents: PropTypes.array,
  footerbarComponents: PropTypes.array,
  customContents: PropTypes.object,
  softwareSignature: PropTypes.string
};

ReactPlanner.contextTypes = {
  store: PropTypes.object.isRequired
};

ReactPlanner.childContextTypes = _extends({}, objectsMap(actions, function () {
  return PropTypes.object;
}), {
  translator: PropTypes.object,
  catalog: PropTypes.object,
  agents: PropTypes.array
});

ReactPlanner.defaultProps = {
  translator: new Translator(),
  catalog: new Catalog(),
  plugins: [],
  allowProjectFileSupport: true,
  softwareSignature: 'React-Planner ' + VERSION,
  toolbarButtons: [],
  sidebarComponents: [],
  footerbarComponents: [],
  customContents: {}

};

//redux connect
function mapStateToProps(reduxState) {
  return {
    state: reduxState
  };
}

function mapDispatchToProps(dispatch) {
  return objectsMap(actions, function (actionNamespace) {
    return bindActionCreators(actions[actionNamespace], dispatch);
  });
}

export default connect(mapStateToProps, mapDispatchToProps)(ReactPlanner);