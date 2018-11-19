import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import jsonTest from './jsonTest'

import Translator from './translator/translator';
import Catalog from './catalog/catalog';
import actions from './actions/export';
import {objectsMap} from './utils/objects-utils';
import {
  ToolbarComponents,
  Content,
  SidebarComponents,
  FooterBarComponents
} from './components/export';
import {VERSION} from './version';
import SimpleCard from "./components/modal-window/ToolbarMaterial";
import RoomInfo from "./components/modal-window/RoomInfo";
import SelectedItemContextMenu from "./components/modal-window/SelectedItemContextMenu";

const {Toolbar} = ToolbarComponents;
const {Sidebar} = SidebarComponents;
const {FooterBar} = FooterBarComponents;

const toolbarW = 270;
const sidebarH = 400;
const sidebarW = 300;
const footerBarH = 20;
const roomInfoH = 240;
const roomInfoW = 400;

let selectedObject = null;
let X = 0;
let Y = 0;

const wrapperStyle = {
  display: 'flex',
  flexFlow: 'row nowrap'
};

let additionalDataDictionary = {};
let currentElement = 0;
let isAdmin = true;
let isFittingTime = false;

function getAllRoomInfo(id, count, projectActions, map, viewer2DActions, domen) {
  currentElement = currentElement + 1;
  if (additionalDataDictionary[id] == null) {
    const url = domen + '/roomget/';
    var request = new Request(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=UTF-8',
      },
      body: JSON.stringify({
        curlid: id,
      }),
    });

    fetch(request)
      .then(function (response) {
        if (response.status !== 200) {
          console.log('Room info: there was a problem. Status code: ' +
            response.status);
          return;
        }

        response.json().then(function (data) {
          additionalDataDictionary[id] = data;
          if (currentElement == count) {

            projectActions.loadProject(map);
            projectActions.openProjectConfigurator();
            isFittingTime = true;
            projectActions.rollback();
          }
        });
      });
  }
}

class ReactPlanner extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      checked: false,
      dialogIsOpen: false,
      selectedItemContextIsVisible: false,
      tabValue: 0,
      X: 0,
      Y: 0
    };
  }

  componentDidMount() {
    let {projectActions, viewer2DActions} = this.props;
    projectActions.newProject();

    const searchParams = new URLSearchParams(location.search);

    let id = {curlid: searchParams.get('curlid') || ''};
    let path = {domen: searchParams.get('domen') || ''};
    const url = path.domen + '/corpsget/';

    var request = new Request(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=UTF-8',
      },
      body: JSON.stringify({
        curlid: id.curlid,
      }),
    });

    fetch(request)
      .then(function (response) {
        if (response.status !== 200) {

          console.log('React planner: there was a problem. Status code: ' + response.status);
          return;
        }

        response.json().then(function (data) {

          if (data.height == null) {
            isFittingTime = true;
            projectActions.newProject();
          }
          else {

            let items = data.layers['layer-1']['areas'];
            let list = Object.values(items);

            if (list.length != 0) {
              list.forEach(function (item) {
                getAllRoomInfo(item.id, list.length, projectActions, data, viewer2DActions, path.domen);
              });
            }
            else {
              projectActions.loadProject(data);
              projectActions.openProjectConfigurator();
              isFittingTime = true;
              projectActions.rollback();
            }
          }
        });
      })
  }


  getChildContext() {
    return {
      ...objectsMap(actions, actionNamespace => this.props[actionNamespace]),
      translator: this.props.translator,
      catalog: this.props.catalog,
      agents: jsonTest,
      roomInfo: additionalDataDictionary,
      isAdminMode: isAdmin,
      isFittingMode: isFittingTime
    }
  }

  componentWillMount() {
    let {store} = this.context;
    let {projectActions, catalog, stateExtractor, plugins} = this.props;
    plugins.forEach(plugin => plugin(store, stateExtractor));
    projectActions.initCatalog(catalog);
  }

  componentWillReceiveProps(nextProps) {
    let {stateExtractor, state, projectActions, catalog} = nextProps;
    let plannerState = stateExtractor(state);
    let catalogReady = plannerState.getIn(['catalog', 'ready']);
    if (!catalogReady) {
      projectActions.initCatalog(catalog);
    }
  }

  updateData(value) {
    selectedObject = value;
  };

  updateCoordinats(x, y) {
    X = x;
    Y = y;
  };

  render() {
    let {width, height, state, stateExtractor, ...prop} = this.props;
    this.state.X = X;
    this.state.Y = Y;

    let toolbarH = height - footerBarH;
    let contentH = height - footerBarH;
    let contentW = width - toolbarW;
    let extractedState = stateExtractor(state);

    this.state.selectedItemContextIsVisible = selectedObject != null;

    console.log(selectedObject)

    let body;
    if (isAdmin) {
      body = <div style={{...wrapperStyle, height}}>
        <Toolbar
          checked={this.state.checked}
          onInvertCatalog={() => this.setState({checked: !this.state.checked})}
          dialogIsOpen={this.state.dialogIsOpen}
          onInvertSettings={() => this.setState({dialogIsOpen: !this.state.dialogIsOpen})}
          tabValue={this.state.tabValue}
          ontabValueChanged={(value) => this.setState({tabValue: value})}
          width={toolbarW} height={toolbarH} state={extractedState}  {...prop}
        />

        <Content
          width={contentW} height={contentH} state={extractedState}
          sidebarH={sidebarH} updateData={this.updateData}
          updateCoordinats={this.updateCoordinats}
          isAdmin={isAdmin}
          isFittingTime={isFittingTime}
          selectedObject={selectedObject}
          {...prop} onWheel={event => event.preventDefault()}
        />

        <SelectedItemContextMenu
          selectedItemContextIsVisible={this.state.selectedItemContextIsVisible}
          invertSelectedItemContextMenuVisibility={() => this.setState({selectedItemContextIsVisible: !this.state.selectedItemContextIsVisible})}
          resetSelectedObject={() => selectedObject = null}
          selectedItem={selectedObject}
          selectedObject={selectedObject}
          x={this.state.X} y={this.state.Y}
          {...prop}
        />

        <SimpleCard
          width={sidebarW} height={sidebarH} state={extractedState}
          selectedObject={selectedObject} projectActions={prop.projectActions} {...prop}
        />

        <FooterBar
          width={width} height={footerBarH}
          state={extractedState} {...prop}
        />
      </div>
    }

    else {
      body =
        <div style={{...wrapperStyle, height}}>
          <Content
            width={contentW + toolbarW} height={contentH + footerBarH}
            state={extractedState} sidebarH={sidebarH} updateData={this.updateData}
            updateCoordinats={this.updateCoordinats}
            isAdmin={isAdmin}
            isFittingTime={isFittingTime}
            {...prop} onWheel={event => event.preventDefault()}
          />
          <RoomInfo
            width={roomInfoW}
            height={roomInfoH}
            state={extractedState}
            selectedObject={selectedObject}
            additionalDataDictionary={additionalDataDictionary}
            x={this.state.X} y={this.state.Y} {...prop}
          />
        </div>
    }
    return (body

    );
  }
}

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
  softwareSignature: PropTypes.string,
};

ReactPlanner.contextTypes = {
  store: PropTypes.object.isRequired,
};

ReactPlanner.childContextTypes = {
  ...objectsMap(actions, () => PropTypes.object),
  translator: PropTypes.object,
  catalog: PropTypes.object,
  agents: PropTypes.array,
  roomInfo: PropTypes.object,
  isAdminMode: PropTypes.bool,
  isFittingMode: PropTypes.bool,
};

ReactPlanner.defaultProps = {
  translator: new Translator(),
  catalog: new Catalog(),
  plugins: [],
  allowProjectFileSupport: true,
  softwareSignature: `React-Planner ${VERSION}`,
  toolbarButtons: [],
  sidebarComponents: [],
  footerbarComponents: [],
  customContents: {},

};

//redux connect
function mapStateToProps(reduxState) {
  return {
    state: reduxState
  }
}

function mapDispatchToProps(dispatch) {
  return objectsMap(actions, actionNamespace => bindActionCreators(actions[actionNamespace], dispatch));
}

export default connect(mapStateToProps, mapDispatchToProps)(ReactPlanner);
