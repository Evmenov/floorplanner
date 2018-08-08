import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as SharedStyle from '../../shared-style';
import { FaAngleDown, FaAngleUp } from 'react-icons/lib/fa';
import Typography from '@material-ui/core/Typography';

const STYLE = {
  userSelect: 'none',
  background:'#ffffff',
  backgroundColor: '#ffffff',
};
const STYLE_TITLE = {
  fontSize: '13px',
  backgroundColor: '#ffffff',
  margin: '0px',
  cursor: 'pointer'
};
const STYLE_CONTENT = {
  fontSize: '15px',
  padding: '0px',
  backgroundColor: '#ffffff',
};
const STYLE_ARROW = {
  float: 'right'
};

export default class Panel extends Component {

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

    let { name, headComponents, children } = this.props;
    let { opened, hover } = this.state;

    return (
      <div style={STYLE}>
        <Typography  color="textSecondary"
           onMouseEnter={() => this.toggleHover()}
          onMouseLeave={() => this.toggleHover()}
        >
          {name}
          {headComponents}
        </Typography>

        <Typography  color="textSecondary" style={{...STYLE_CONTENT, display: opened ? 'block' : 'none'}}>
          {children}
        </Typography>
      </div>
    )
  }
}

Panel.propTypes = {
  name: PropTypes.string.isRequired,
  headComponents: PropTypes.array,
  opened: PropTypes.bool
};
