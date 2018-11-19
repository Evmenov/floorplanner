import React from 'react';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuList from '@material-ui/core/MenuList';
import PropTypes from "prop-types";
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import DeleteIcon from '@material-ui/icons/Delete';

class SelectedItemContextMenu extends React.Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.selectedItemContextIsVisible === this.props.selectedItemContextIsVisible) {
      return false;
    }
    else return true;
  }

  render() {
    let {projectActions} = this.props;

    let positionStyle = {
      position: 'absolute',
      top: 0,
      left: 0,
      visibility: 'hidden',
      background: 'transparent'
    };

    if (this.props.selectedObject == null) {
      positionStyle.visibility = 'hidden';
      return null;
    }
    else {
      positionStyle.left = this.props.x + 25;
      positionStyle.top = this.props.y + 25;
      positionStyle.visibility = 'visible';
    }

    let deleteEvent = event => {
      projectActions.remove();
      this.props.resetSelectedObject();
    };

    return (
      <div style={positionStyle}>
        <Popper open={this.props.selectedItemContextIsVisible} transition disablePortal>
          {({TransitionProps, placement}) => (
            <Grow
              {...TransitionProps}
              id="menu-list-grow"
              style={{
                background: 'transparent',
                boxShadow: "none",
                transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom'
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={() => {
                  this.props.invertSelectedItemContextMenuVisibility()
                }}>
                  <MenuList>
                    <Tooltip title="Удалить">
                      <Button onClick={deleteEvent} variant="fab" color="secondary">
                        <DeleteIcon/>
                      </Button>
                    </Tooltip>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    );
  }
}

SelectedItemContextMenu.contextTypes = {
  projectActions: PropTypes.object.isRequired,
};

export default SelectedItemContextMenu;
