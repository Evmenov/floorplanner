import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  ContentTitle,
  ContentContainer,
  FormLabel,
  FormBlock,
  FormNumberInput,
  FormSubmitButton,
  CancelButton
} from '../style/export';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

export default class ProjectConfigurator extends Component {

  constructor(props, context) {
    super(props, context);

    let scene = props.state.scene;

    this.state = {
      dataWidth: scene.width,
      dataHeight: scene.height,
    };
  }

  onSubmit(event) {
    event.preventDefault();

    let {projectActions} = this.context;

    let {dataWidth, dataHeight} = this.state;
    dataWidth = parseInt(dataWidth);
    dataHeight = parseInt(dataHeight);
    if (dataWidth <= 100 || dataHeight <= 100) {
      alert('Scene size too small');
    } else {
      projectActions.setProjectProperties({width: dataWidth, height: dataHeight});
    }
  }


  render() {
    let {width, height, sidebarH} = this.props;
    let {dataWidth, dataHeight} = this.state;
    let {projectActions, translator} = this.context;

    const Style = {
      width: width,
      height: height,
      position: 'relative',
      top: sidebarH,
    };

    return (
      <ContentContainer width={width} height={height} style={Style}>
        {/*<ContentTitle>{translator.t('Project config')}</ContentTitle>*/}

        <form onSubmit={e => this.onSubmit(e)}>
          <FormBlock>
            <Typography htmlFor='width'>{translator.t('width')}</Typography>
            <FormNumberInput
              id='width'
              placeholder='width'
              value={dataWidth}
              onChange={e => this.setState({dataWidth: e.target.value})}
            />
          </FormBlock>

          <FormBlock>
            <Typography htmlFor='height'>{translator.t('height')}</Typography>
            <FormNumberInput
              id='height'
              placeholder='height'
              value={dataHeight}
              onChange={e => this.setState({dataHeight: e.target.value})}
            />
          </FormBlock>

          <table style={{float: 'right'}}>
            <tbody>
            <tr>
              <td>
                <Button onClick={e => {
                  projectActions.rollback();
                  this.props.onInvertSettings();
                  }}>{translator.t('Cancel')}</Button>
              </td>
              <td>
                <Button  type="submit" onClick={e => {

                }}>{translator.t('Save')}</Button>
              </td>
            </tr>
            </tbody>
          </table>
        </form>
      </ContentContainer>
    )
  }
}

ProjectConfigurator.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  state: PropTypes.object.isRequired,
};

ProjectConfigurator.contextTypes = {
  projectActions: PropTypes.object.isRequired,
  translator: PropTypes.object.isRequired,
};
