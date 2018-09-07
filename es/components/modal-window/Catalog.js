var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import Paper from '@material-ui/core/Paper';
import Slide from '@material-ui/core/Slide';
import CatalogList from "../catalog-view/catalog-list";
import SimpleTabs from "../modal-window/Tabs";

var styles = function styles(theme) {
  return {
    root: {
      height: 300
    },
    wrapper: {
      width: 250 + theme.spacing.unit * 2
    },
    paper: {
      zIndex: 1,
      position: 'relative',
      margin: theme.spacing.unit
    },
    svg: {
      height: 600
    },
    polygon: {
      fill: theme.palette.common.white,
      stroke: theme.palette.divider,
      strokeWidth: 1
    }
  };
};

var SimpleSlide = function (_React$Component) {
  _inherits(SimpleSlide, _React$Component);

  function SimpleSlide() {
    _classCallCheck(this, SimpleSlide);

    return _possibleConstructorReturn(this, (SimpleSlide.__proto__ || Object.getPrototypeOf(SimpleSlide)).apply(this, arguments));
  }

  _createClass(SimpleSlide, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      if (nextProps.checked === this.props.checked) {
        return false;
      } else return true;
    }
  }, {
    key: 'render',
    value: function render() {
      var state = this.props.state;
      var classes = this.props.classes;


      return React.createElement(
        'div',
        { className: classes.root },
        React.createElement(
          'div',
          { className: classes.wrapper },
          React.createElement(
            Slide,
            { direction: 'right', 'in': this.props.checked, mountOnEnter: true, unmountOnExit: true },
            React.createElement(
              Paper,
              { elevation: 4, className: classes.paper },
              React.createElement(CatalogList, { state: state, width: 250, height: 600 }),
              React.createElement('svg', { className: classes.svg })
            )
          )
        )
      );
    }
  }]);

  return SimpleSlide;
}(React.Component);

SimpleSlide.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleSlide);