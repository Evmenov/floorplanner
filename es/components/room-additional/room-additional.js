var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import PropTypes from "prop-types";
import InfoPanel from "./InfoPanel";

var style = {
  position: 'absolute',
  top: 0,
  left: 0,
  visibility: 'visible'
};

var headerTextStyle = {
  fontSize: '20px',
  color: '#000000',
  padding: '10px 15px 8px 15px',
  margin: '0px'
};
var contentTextStyle = {
  fontSize: '15px',
  color: '#000000',
  padding: '15px 35px 8px 15px',
  margin: '0px'
};

var RoomAdditionalPanel = function (_Component) {
  _inherits(RoomAdditionalPanel, _Component);

  function RoomAdditionalPanel(props, context) {
    _classCallCheck(this, RoomAdditionalPanel);

    var _this = _possibleConstructorReturn(this, (RoomAdditionalPanel.__proto__ || Object.getPrototypeOf(RoomAdditionalPanel)).call(this, props, context));

    _this.state = {};
    return _this;
  }

  _createClass(RoomAdditionalPanel, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          state = _props.state,
          width = _props.width,
          height = _props.height,
          selectedObject = _props.selectedObject,
          x = _props.x,
          y = _props.y,
          _context = this.context,
          projectActions = _context.projectActions,
          viewer3DActions = _context.viewer3DActions,
          translator = _context.translator,
          agents = _context.agents;


      if (selectedObject == null) {
        style.visibility = 'hidden';
      } else if (selectedObject.prototype == 'areas') {
        // if(style.visibility == 'hidden'){
        style.top = y;
        style.left = x;
        // }

        style.visibility = 'visible';
      } else {
        style.visibility = 'hidden';
      }

      return React.createElement(
        "div",
        { style: _extends({ width: width, height: height }, style) },
        React.createElement(
          InfoPanel,
          { width: width, height: height / 3, opened: true },
          React.createElement(
            "div",
            null,
            React.createElement(
              "h2",
              { style: headerTextStyle },
              "\u041E\u0444\u0438\u0441 347"
            ),
            React.createElement(
              "i",
              { style: contentTextStyle },
              "\u043E\u0444\u0438\u0441\u043D\u043E\u0435 \u043F\u043E\u043C\u0435\u0449\u0435\u043D\u0438\u0435"
            )
          ),
          React.createElement(
            "div",
            { style: {
                height: height / 3,
                left: 200,
                right: 0,
                border: '1px solid #32394f',
                top: 0,
                bottom: 0,
                position: 'absolute',
                background: '#9283d4' } },
            React.createElement(
              "h2",
              { style: headerTextStyle },
              "311 \u043A\u0432. \u043C."
            )
          )
        ),
        React.createElement(
          InfoPanel,
          { width: width, height: height / 3, opened: true },
          React.createElement(
            "div",
            null,
            React.createElement(
              "h2",
              { style: headerTextStyle },
              "\u0411\u0438 \u041B\u0430\u0439\u043D"
            ),
            React.createElement(
              "i",
              { style: contentTextStyle },
              "\u0441\u0435\u0442\u044C \u043C\u043E\u0431\u0438\u043B\u044C\u043D\u043E\u0439 \u0441\u0432\u044F\u0437\u0438"
            )
          ),
          React.createElement(
            "div",
            { style: {
                height: height / 3,
                left: 200,
                border: '1px solid #32394f',
                right: 0,
                top: height / 3,
                position: 'absolute',
                background: '#fad36c' } },
            React.createElement(
              "h2",
              { style: headerTextStyle },
              "446 400 \u0440."
            ),
            React.createElement(
              "i",
              { style: contentTextStyle },
              "1 200 \u0440/\u043A\u0432. \u043C."
            )
          )
        ),
        React.createElement(
          InfoPanel,
          { width: width, height: height / 3, opened: true },
          React.createElement(
            "div",
            { style: {
                height: height / 3,
                width: width
              } },
            React.createElement(
              "h2",
              { style: headerTextStyle },
              "\u041E\u041E\u041E \"\u0422\u0430\u0442\u0442\u0435\u043B\u0435\u043A\u043E\u043C \u0420\u043E\u0441\u0441\u0438\u044F\"",
              React.createElement("br", null)
            ),
            React.createElement(
              "i",
              { style: contentTextStyle },
              "\u0441\u0440\u043E\u043A \u0434\u043E 23.2023 \u0433\u043E\u0434\u0430",
              React.createElement("br", null)
            ),
            React.createElement(
              "i",
              { style: contentTextStyle },
              "\u043A\u043E\u043D\u0442\u0430\u043A\u0442: \u041D\u0430\u0442\u0430\u043B\u044C\u044F +7 (967) 351 28 61 "
            )
          )
        )
      );
    }
  }]);

  return RoomAdditionalPanel;
}(Component);

export default RoomAdditionalPanel;

RoomAdditionalPanel.propTypes = {
  state: PropTypes.object.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  allowProjectFileSupport: PropTypes.bool.isRequired,
  toolbarButtons: PropTypes.array
};

RoomAdditionalPanel.contextTypes = {
  projectActions: PropTypes.object.isRequired,
  viewer2DActions: PropTypes.object.isRequired,
  viewer3DActions: PropTypes.object.isRequired,
  linesActions: PropTypes.object.isRequired,
  holesActions: PropTypes.object.isRequired,
  itemsActions: PropTypes.object.isRequired,
  translator: PropTypes.object.isRequired,
  agents: PropTypes.array.isRequired
};