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

const {Toolbar} = ToolbarComponents;
const {Sidebar} = SidebarComponents;
const {FooterBar} = FooterBarComponents;

const toolbarW = 50;
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
    };
  }

   componentDidMount(){
     let {projectActions} = this.props;

    // projectActions.newProject();
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
    let {width, height, state, stateExtractor, ...props} = this.props;


    let toolbarH = height - footerBarH;
    let contentH = height - footerBarH;
    let contentW = width - toolbarW;
    let extractedState = stateExtractor(state);

    return (

           <div style={{...wrapperStyle, height}}>
             <SimpleBottomNavigation classes={{
               root: 'classes-state-root',
               disabled: 'disabled', }
             }/>
      <Toolbar width={toolbarW} height={toolbarH} state={extractedState} {...props} />
        <Content width={contentW} height={contentH} state={extractedState}
                sidebarH={sidebarH} updateData={this.updateData} updateCoordinats={this.updateCoordinats} {...props} onWheel={event => event.preventDefault()} />
       <Sidebar width={sidebarW} height={sidebarH} state={extractedState} selectedObject={selectedObject} {...props} />
       <FooterBar width={width} height={footerBarH} state={extractedState} {...props} />
      </div>

 //     <div style={{...wrapperStyle, height}}>
 //     <Content width={contentW + toolbarW} height={contentH + footerBarH} state={extractedState}
 //             sidebarH={sidebarH} updateData={this.updateData} updateCoordinats={this.updateCoordinats} {...props} onWheel={event => event.preventDefault()} />
 //    <RoomAdditionalPanel width={roomInfoW} height={roomInfoH} state={extractedState} selectedObject={selectedObject} x={X} y={Y} {...props} />
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
