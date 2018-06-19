import React, {Component} from 'react';
import PropTypes from "prop-types";
import Panel from "../../../es/components/sidebar/panel";
import InfoPanel from "./InfoPanel";

let STYLE = {
  position: 'absolute',
  right: 100,
  bottom: 100,
  visibility: 'visible',
};



export default class RoomAdditionalPanel extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {};
  }

  render() {

    let {
      props: {state, width, height, selectedObject},
      context: {projectActions, viewer3DActions, translator}
    } = this;

    if(selectedObject == null){
      STYLE.visibility = 'hidden';
    }
    else if(selectedObject.prototype == 'areas'){
      STYLE.visibility = 'visible';
    }
    else{
      STYLE.visibility = 'hidden';
    }

    return (
      <div style={{width, height, ...STYLE}}>
        <InfoPanel width={width} height={height/3} opened={true}>
          <h2>Test</h2>
        </InfoPanel>
        <InfoPanel width={width} height={height/3} opened={true}>
          <h2>Test</h2>
        </InfoPanel>
        <InfoPanel width={width} height={height/3} opened={true}>
          <h2>Test</h2>
        </InfoPanel>
      </div>

    );
  }
}
RoomAdditionalPanel.propTypes = {
  state: PropTypes.object.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  allowProjectFileSupport: PropTypes.bool.isRequired,
  toolbarButtons: PropTypes.array
};

RoomAdditionalPanel.contextTypes = {
  projectActions: PropTypes.object.isRequired,
  viewer2DActions: PropTypes.object.isRequired,
  viewer3DActions: PropTypes.object.isRequired,
  linesActions: PropTypes.object.isRequired,
  holesActions: PropTypes.object.isRequired,
  itemsActions: PropTypes.object.isRequired,
  translator: PropTypes.object.isRequired,
};
