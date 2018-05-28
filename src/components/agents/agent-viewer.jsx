import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Agent from './agent'
import {
  ContentTitle,
  ContentContainer,
  CancelButton
} from '../style/export';

export default class AgentViewer extends Component {

  constructor(props, context) {
    super(props, context);

    let scene = props.state.scene;

    this.state = {
      dataWidth: scene.width,
      dataHeight: scene.height,
      isOpen: true
    };
  }

  render() {
    let {width, height} = this.props;
    let {dataWidth, dataHeight} = this.state;
    let {projectActions, translator, agents} = this.context;
const body = this.state.isOpen &&
  <ContentContainer width={width} height={height}>
  <ContentTitle>{translator.t('Agents list')}</ContentTitle>
    <li>
      <Agent agent={agents[0]}></Agent>
    </li>

    <table style={{float: 'right'}}>
      <tbody>
      <tr>
        <td>
          <CancelButton size='large'
                        onClick={e => projectActions.rollback()}>{translator.t('Close')}</CancelButton>
        </td>
      </tr>
      </tbody>
    </table>
</ContentContainer>
    return ( body

    )
  }
}


AgentViewer.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  state: PropTypes.object.isRequired,
};

AgentViewer.contextTypes = {
  projectActions: PropTypes.object.isRequired,
  translator: PropTypes.object.isRequired,
};
