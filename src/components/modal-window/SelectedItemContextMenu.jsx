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
    let {projectActions, linesActions} = this.props;

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

      if (this.props.selectedObject.prototype == 'areas') {
        let walls = this.props.state.get('scene').get('layers').get('layer-1').get('areas').get(this.props.selectedObject.id).get('vertices');
        let list = Object.values(walls.toArray());
        let removedArray = [];
        if (list.length != 0) {

          for (let i = 0; i < list.length; i++) {

            let vertice = this.props.state.get('scene').get('layers').get('layer-1').get('vertices').get(list[i]);
            let areas = vertice.get('areas').toArray();
            if (areas.length > 1) continue;
            let lines = vertice.get('lines').toArray();

            let verticeLines = Object.values(lines);
            for (let i = 0; i < verticeLines.length; i++) {
              let isExist = false;

              if (removedArray.length != 0) for (let y = 0; y < removedArray.length; y++) {
                if (removedArray[y] == verticeLines[i]) {
                  isExist = true;
                  break;
                }
              }

              if (!isExist) removedArray.push(verticeLines[i]);
            }
          }
          for (let i = 0; i < removedArray.length; i++) {
            linesActions.selectLine('layer-1', removedArray[i]);
            projectActions.remove();
          }
          this.props.resetSelectedObject();
        }
      }
      else {
        projectActions.remove();
        this.props.resetSelectedObject();
      }
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
  linesActions: PropTypes.object.isRequired,
};

export default SelectedItemContextMenu;
