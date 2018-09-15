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
import RoomAdditionalPanel from './components/room-additional/room-additional';
import {browserUpload} from "./utils/browser";
import SimpleBottomNavigation from "./components/modal-window/menu";
import MiniDrawer from "./components/modal-window/Drawer";
import SimpleCard from "./components/modal-window/ToolbarMaterial";
import RoomInfo from "./components/modal-window/RoomInfo";
import Listmenu from "./components/modal-window/Catalog";
import AlertDialogSlide from "./components/modal-window/SettingsDialog";

const {Toolbar} = ToolbarComponents;
const {Sidebar} = SidebarComponents;
const {FooterBar} = FooterBarComponents;

const toolbarW = 270;
const sidebarH = 400;
const sidebarW = 300;
const footerBarH= 20;
const roomInfoH= 240;
const roomInfoW= 400;

let selectedObject = null;
let X = 0;
let Y = 0;

const wrapperStyle = {
  display: 'flex',
  flexFlow: 'row nowrap'
};
function getMoviesFromApiAsync(path) {
  console.log("sdfs")

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
      tabValue: 0,
      X:0,
      Y:0
    };
  }

   componentDidMount(){
     let {projectActions} = this.props;

     //projectActions.newProject();
     const searchParams = new URLSearchParams(location.search);
     let id = {curlid: searchParams.get('curlid') || ''};

     const url = 'http://rentservice.getwider.com/corpsget/';
     var request = new Request(url, {
        method: 'POST',
       headers: {
         'Content-Type': 'text/plain;charset=UTF-8',
       },
         body: JSON.stringify({
           curlid: id.curlid,
         }),
     });
///index.html?curlid=50237c98-720c-4753-9d62-c9d294ad121c
     fetch(request)
       .then(function(response) {
         if (response.status !== 200) {
           console.log('There was a problem. Status code: ' +
             response.status);
           return;
         }

         response.json().then(function(data) {

           projectActions.loadProject(data);
          });
       })}


  getChildContext() {
    return {
      ...objectsMap(actions, actionNamespace => this.props[actionNamespace]),
      translator: this.props.translator,
      catalog: this.props.catalog,
      agents: jsonTest,
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


  updateData (value)
  {
    selectedObject = value;
  };

  updateCoordinats (x, y){
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

    return (


    <div style={{...wrapperStyle, height}}>
   <Toolbar checked={this.state.checked}
   onInvertCatalog={() => this.setState({ checked: !this.state.checked})}
   dialogIsOpen={this.state.dialogIsOpen}
   onInvertSettings={() => this.setState({ dialogIsOpen: !this.state.dialogIsOpen})}
   tabValue={this.state.tabValue}
   ontabValueChanged={(value) => this.setState({ tabValue: value})}
   width={toolbarW} height={toolbarH} state={extractedState}  {...prop} />
   <Content width={contentW} height={contentH} state={extractedState}
            sidebarH={sidebarH} updateData={this.updateData}
            updateCoordinats={this.updateCoordinats} {...prop}
            onWheel={event => event.preventDefault()} />
   <SimpleCard  width={sidebarW} height={sidebarH} state={extractedState}
   selectedObject={selectedObject} {...prop}  />
   <FooterBar width={width} height={footerBarH} state={extractedState} {...prop} />
   </div>


 //  <div style={{...wrapperStyle, height}}>
 //     <Content width={contentW + toolbarW} height={contentH + footerBarH} state={extractedState}
 //             sidebarH={sidebarH} updateData={this.updateData} updateCoordinats={this.updateCoordinats} {...prop} onWheel={event => event.preventDefault()} />
 //    <RoomInfo width={roomInfoW}
 //                         height={roomInfoH}
 //                         state={extractedState}
 //                         selectedObject={selectedObject}
 //                         x={this.state.X} y={this.state.Y} {...prop} />
 //  </div>
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
