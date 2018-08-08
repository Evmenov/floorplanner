import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
});

class SimpleTabs extends React.Component {

   shouldComponentUpdate(nextProps){
    if(nextProps.tabValue === this.props.tabValue){
      return false;
    }
    else return true;
  }

  render() {
    const { classes } = this.props;
    // const { value } = this.state;

    let handleChange = (event, value) => {
      this.setState( {value} );
    };

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs value={this.props.tabValue} onChange={handleChange}>
            <Tab label="Item One" />
            <Tab label="Item Two" />
            <Tab label="Item Three" href="#basic-tabs" />
          </Tabs>
        </AppBar>
        {this.props.tabValue === 0 && <TabContainer>Item One</TabContainer>}
        {this.props.tabValue === 1 && <TabContainer>Item Two</TabContainer>}
        {this.props.tabValue === 2 && <TabContainer>Item Three</TabContainer>}
      </div>
    );
  }
}

SimpleTabs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTabs);
