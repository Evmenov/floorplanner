import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as SharedStyle from '../../shared-style';
import { FaAngleDown, FaAngleUp } from 'react-icons/lib/fa';

const STYLE = {
  borderTop: '1px solid #32394f',
  borderBottom: '1px solid #32394f',
  userSelect: 'none',
  background:'#ffffff',
};
const STYLE_TITLE = {
  fontSize: '13px',
  color: '#000000',
  padding: '5px 15px 8px 15px',
  backgroundColor: '#32394f',
  textShadow: '-1px -1px 2px rgba(0, 0, 0, 1)',
  boxShadow: 'inset 0px -3px 19px 0px rgba(0,0,0,0.5)',
  margin: '0px',
  cursor: 'pointer'
};
const STYLE_CONTENT = {
  fontSize: '13px',
  color: '#000000',
  border: '1px solid #222',
  padding: '0px',
  height: 120,
  backgroundColor: '#ffffff',
};
const STYLE_ARROW = {
  float: 'right'
};

export default class InfoPanel extends Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      opened: props.hasOwnProperty('opened') ? props.opened : false,
      hover: false
    };
  }

  toggleOpen() {
    this.setState({opened: !this.state.opened});
  }

  toggleHover() {
    this.setState({hover: !this.state.hover});
  }

  render() {

    let { children, width, height } = this.props;
    let { opened } = this.state;

    return (
      <div style={{width, height, ...STYLE}}>

        <div style={{...STYLE_CONTENT, display: opened ? 'block' : 'none'}}>
          {children}
        </div>
      </div>
    )
  }
}

InfoPanel.propTypes = {
  name: PropTypes.string.isRequired,
  headComponents: PropTypes.array,
  opened: PropTypes.bool
};
