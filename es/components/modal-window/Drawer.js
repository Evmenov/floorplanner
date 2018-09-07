import React from 'react';
import PropTypes from 'prop-types';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';

var styles = function styles(theme) {
  return {
    menuItem: {
      '&:focus': {
        backgroundColor: theme.palette.primary.main,
        '& $primary, & $icon': {
          color: theme.palette.common.white
        }
      }
    },
    primary: {},
    icon: {}
  };
};

function ListItemComposition(props) {
  var classes = props.classes;


  return React.createElement(
    Paper,
    null,
    React.createElement(
      MenuList,
      null,
      React.createElement(
        MenuItem,
        { className: classes.menuItem },
        React.createElement(
          ListItemIcon,
          { className: classes.icon },
          React.createElement(SendIcon, null)
        ),
        React.createElement(ListItemText, { classes: { primary: classes.primary }, inset: true, primary: 'Sent mail' })
      ),
      React.createElement(
        MenuItem,
        { className: classes.menuItem },
        React.createElement(
          ListItemIcon,
          { className: classes.icon },
          React.createElement(DraftsIcon, null)
        ),
        React.createElement(ListItemText, { classes: { primary: classes.primary }, inset: true, primary: 'Drafts' })
      ),
      React.createElement(
        MenuItem,
        { className: classes.menuItem },
        React.createElement(
          ListItemIcon,
          { className: classes.icon },
          React.createElement(InboxIcon, null)
        ),
        React.createElement(ListItemText, { classes: { primary: classes.primary }, inset: true, primary: 'Inbox' })
      ),
      React.createElement(
        MenuItem,
        { className: classes.menuItem },
        React.createElement(
          ListItemIcon,
          { className: classes.icon },
          React.createElement(InboxIcon, null)
        ),
        React.createElement(ListItemText, { classes: { primary: classes.primary }, inset: true, primary: 'Inbox' })
      )
    )
  );
}

ListItemComposition.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ListItemComposition);