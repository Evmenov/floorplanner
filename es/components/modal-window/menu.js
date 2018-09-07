var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';

var styles = {
  root: {
    width: 500
  }
};

var SimpleBottomNavigation = function (_React$Component) {
  _inherits(SimpleBottomNavigation, _React$Component);

  function SimpleBottomNavigation() {
    _classCallCheck(this, SimpleBottomNavigation);

    return _possibleConstructorReturn(this, (SimpleBottomNavigation.__proto__ || Object.getPrototypeOf(SimpleBottomNavigation)).apply(this, arguments));
  }

  _createClass(SimpleBottomNavigation, [{
    key: 'render',


    // handleChange = (event, value) => {
    //   this.setState({ value });
    // };

    value: function render() {
      var classes = this.props.classes;


      return React.createElement(
        BottomNavigation,
        {
          value: 3
          //onChange={this.handleChange}
          , showLabels: true,
          className: classes.root
        },
        React.createElement(BottomNavigationAction, { label: 'Recents', icon: React.createElement(RestoreIcon, null) }),
        React.createElement(BottomNavigationAction, { label: 'Favorites', icon: React.createElement(FavoriteIcon, null) }),
        React.createElement(BottomNavigationAction, { label: 'Nearby', icon: React.createElement(LocationOnIcon, null) })
      );
    }
  }]);

  return SimpleBottomNavigation;
}(React.Component);

SimpleBottomNavigation.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleBottomNavigation);