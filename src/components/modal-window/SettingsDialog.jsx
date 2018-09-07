import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import ProjectConfigurator from "../configurator/project-configurator";

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class AlertDialogSlide extends React.Component {

  shouldComponentUpdate(nextProps){
    if(nextProps.dialogIsOpen === this.props.dialogIsOpen){
      return false;
    }
    else return true;
  }

  render() {
    let {props: { state }} = this;

    return (
      <div>
       <Dialog
          open={this.props.dialogIsOpen}
          TransitionComponent={Transition}
          keepMounted
          onClose={() => {this.props.onInvertSettings()}}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            {"Настройки размера карты"}
          </DialogTitle>
          <DialogContent>
            <ProjectConfigurator state={state} onInvertSettings={() => this.props.onInvertSettings()}/>
          </DialogContent>
          <DialogActions>
            {/*<Button onClick={() => {this.props.onInvertSettings()}} color="primary">*/}
              {/*Disagree*/}
            {/*</Button>*/}
            {/*<Button onClick={this.handleClose} color="primary">*/}
              {/*Agree*/}
            {/*</Button>*/}
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default AlertDialogSlide;
