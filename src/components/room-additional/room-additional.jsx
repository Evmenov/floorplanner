import React, {Component} from 'react';
import PropTypes from "prop-types";
import InfoPanel from "./InfoPanel";

let style = {
  position: 'absolute',
  top: 0,
  left: 0,
  visibility: 'visible',
};

let headerTextStyle ={
  fontSize: '20px',
  color: '#000000',
  padding: '20px 15px 8px 15px',
  margin: '0px',
};
let contentTextStyle ={
  fontSize: '15px',
  color: '#000000',
  padding: '15px 35px 8px 15px',
  margin: '0px',
};


export default class RoomAdditionalPanel extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {};
  }

  render() {

    let {
      props: {state, width, height, selectedObject},
      context: {projectActions, viewer3DActions, translator, agents}
    } = this;



    if(selectedObject == null){
      style.visibility = 'hidden';
    }
    else if(selectedObject.prototype == 'areas'){
      style.visibility = 'visible';
    }
    else{
      style.visibility = 'hidden';
    }

    return (
      <div style={{width, height, ...style}}>
        <InfoPanel width={width} height={height/3} opened={true}>
          <div>
            <h2 style={headerTextStyle}>Офис 347</h2>
            <i style={contentTextStyle}>офисное помещение</i>
          </div>

          <div style={{
            height: height/3,
            left: 200,
            right:0,
            border: '1px solid #32394f',
            top:0,
            bottom: 0,
            position: 'absolute',
            background:'#9283d4'}}>
            <h2 style={headerTextStyle}>311 кв. м.</h2>
          </div>
        </InfoPanel>

        <InfoPanel width={width} height={height/3} opened={true}>
          <div>
            <h2 style={headerTextStyle}>Би Лайн</h2>
            <i style={contentTextStyle}>сеть мобильной связи</i>
          </div>
          <div style={{
            height: height/3,
            left: 200,
            border: '1px solid #32394f',
            right:0,
            top:height/3,
            position: 'absolute',
            background:'#fad36c'}}>
            <h2 style={headerTextStyle}>446 400 р.</h2>
            <i style={contentTextStyle}>1 200 р/кв. м.</i>
          </div>
        </InfoPanel>

        <InfoPanel width={width} height={height/3} opened={true}>
          <div style={{
            height: height/3,
            width: width
          }}>
            <h2 style={headerTextStyle}>ООО "Таттелеком Россия"<br/></h2>
            <i style={contentTextStyle}>срок до 23.2023 года<br/></i>
            <i style={contentTextStyle}>контакт: Наталья +7 (967) 351 28 61 </i>
          </div>
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
  agents: PropTypes.array.isRequired,
};
