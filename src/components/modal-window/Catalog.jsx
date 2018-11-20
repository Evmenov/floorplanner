import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Slide from '@material-ui/core/Slide';
import CatalogList from "../catalog-view/catalog-list";

const styles = theme => ({
  root: {
    height: 300,
  },
  wrapper: {
    width: 250 + theme.spacing.unit * 2,
  },
  paper: {
    zIndex: 1,
    position: 'relative',
    margin: theme.spacing.unit,
  },
  svg: {
    height: 600,
  },
  polygon: {
    fill: theme.palette.common.white,
    stroke: theme.palette.divider,
    strokeWidth: 1,
  },
});

class SimpleSlide extends React.Component {

  shouldComponentUpdate(nextProps){
    if(nextProps.checked === this.props.checked){
      return false;
    }
    else return true;
  }

  render() {
    let {props: { state }} = this;
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <div className={classes.wrapper}>
          <Slide direction="right" in={this.props.checked} mountOnEnter unmountOnExit>
            <Paper elevation={4} className={classes.paper}>
             <CatalogList state={state} width={250} height={600}/>
              <svg className={classes.svg}>
              </svg>
            </Paper>
          </Slide>
        </div>
      </div>
    );
  }
}

SimpleSlide.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleSlide);
