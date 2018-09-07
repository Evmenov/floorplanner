import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import PanelElementEditor from '../sidebar/panel-element-editor/panel-element-editor';
import If from '../../utils/react-if';
var positionStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  visibility: 'visible'
};
var styles = {
  card: {
    minWidth: 275,
    minHeight: 275,
    position: 'absolute'

  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)'
  },
  title: {
    marginBottom: 13,
    fontSize: 18
  },
  pos: {
    marginBottom: 12
  }
};

function SimpleCard(props) {
  var classes = props.classes;

  // if(props.selectedObject == null){
  //   positionStyle.visibility = 'hidden';
  //   return null;
  // }
  // else if(props.selectedObject.prototype == 'areas'){
  //   positionStyle.top = props.y;
  //   positionStyle.left = props.x;
  //   positionStyle.visibility = 'visible';
  // }
  // else{
  //   positionStyle.visibility = 'hidden';
  //   return null;
  // }

  var body = void 0;
  if (props.selectedObject != null) {

    positionStyle.left = props.y;
    body = React.createElement(
      Card,
      { className: classes.card, style: styles },
      React.createElement(
        CardContent,
        null,
        React.createElement(
          Typography,
          { className: classes.title },
          props.translator.t('Settings')
        ),
        React.createElement(
          Typography,
          { component: 'h3' },
          'sdgfsd'
        )
      )
    );
  } else {}

  return React.createElement(
    'div',
    { style: positionStyle },
    body
  );
}

SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleCard);