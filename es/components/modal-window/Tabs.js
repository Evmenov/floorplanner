var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

function TabContainer(props) {
  return React.createElement(
    Typography,
    { component: 'div', style: { padding: 8 * 3 } },
    props.children
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired
};

var styles = function styles(theme) {
  return {
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper
    }
  };
};

var SimpleTabs = function (_React$Component) {
  _inherits(SimpleTabs, _React$Component);

  function SimpleTabs() {
    _classCallCheck(this, SimpleTabs);

    return _possibleConstructorReturn(this, (SimpleTabs.__proto__ || Object.getPrototypeOf(SimpleTabs)).apply(this, arguments));
  }

  _createClass(SimpleTabs, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      if (nextProps.tabValue === this.props.tabValue) {
        return false;
      } else return true;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var classes = this.props.classes;
      // const { value } = this.state;

      var handleChange = function handleChange(event, value) {
        _this2.setState({ value: value });
      };

      return React.createElement(
        'div',
        { className: classes.root },
        React.createElement(
          AppBar,
          { position: 'static' },
          React.createElement(
            Tabs,
            { value: this.props.tabValue, onChange: handleChange },
            React.createElement(Tab, { label: 'Item One' }),
            React.createElement(Tab, { label: 'Item Two' }),
            React.createElement(Tab, { label: 'Item Three', href: '#basic-tabs' })
          )
        ),
        this.props.tabValue === 0 && React.createElement(
          TabContainer,
          null,
          'Item One'
        ),
        this.props.tabValue === 1 && React.createElement(
          TabContainer,
          null,
          'Item Two'
        ),
        this.props.tabValue === 2 && React.createElement(
          TabContainer,
          null,
          'Item Three'
        )
      );
    }
  }]);

  return SimpleTabs;
}(React.Component);

SimpleTabs.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleTabs);