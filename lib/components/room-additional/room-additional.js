"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _InfoPanel = require("./InfoPanel");

var _InfoPanel2 = _interopRequireDefault(_InfoPanel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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

      return _react2.default.createElement(
        "div",
        { style: _extends({ width: width, height: height }, style) },
        _react2.default.createElement(
          _InfoPanel2.default,
          { width: width, height: height / 3, opened: true },
          _react2.default.createElement(
            "div",
            null,
            _react2.default.createElement(
              "h2",
              { style: headerTextStyle },
              "\u041E\u0444\u0438\u0441 347"
            ),
            _react2.default.createElement(
              "i",
              { style: contentTextStyle },
              "\u043E\u0444\u0438\u0441\u043D\u043E\u0435 \u043F\u043E\u043C\u0435\u0449\u0435\u043D\u0438\u0435"
            )
          ),
          _react2.default.createElement(
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
            _react2.default.createElement(
              "h2",
              { style: headerTextStyle },
              "311 \u043A\u0432. \u043C."
            )
          )
        ),
        _react2.default.createElement(
          _InfoPanel2.default,
          { width: width, height: height / 3, opened: true },
          _react2.default.createElement(
            "div",
            null,
            _react2.default.createElement(
              "h2",
              { style: headerTextStyle },
              "\u0411\u0438 \u041B\u0430\u0439\u043D"
            ),
            _react2.default.createElement(
              "i",
              { style: contentTextStyle },
              "\u0441\u0435\u0442\u044C \u043C\u043E\u0431\u0438\u043B\u044C\u043D\u043E\u0439 \u0441\u0432\u044F\u0437\u0438"
            )
          ),
          _react2.default.createElement(
            "div",
            { style: {
                height: height / 3,
                left: 200,
                border: '1px solid #32394f',
                right: 0,
                top: height / 3,
                position: 'absolute',
                background: '#fad36c' } },
            _react2.default.createElement(
              "h2",
              { style: headerTextStyle },
              "446 400 \u0440."
            ),
            _react2.default.createElement(
              "i",
              { style: contentTextStyle },
              "1 200 \u0440/\u043A\u0432. \u043C."
            )
          )
        ),
        _react2.default.createElement(
          _InfoPanel2.default,
          { width: width, height: height / 3, opened: true },
          _react2.default.createElement(
            "div",
            { style: {
                height: height / 3,
                width: width
              } },
            _react2.default.createElement(
              "h2",
              { style: headerTextStyle },
              "\u041E\u041E\u041E \"\u0422\u0430\u0442\u0442\u0435\u043B\u0435\u043A\u043E\u043C \u0420\u043E\u0441\u0441\u0438\u044F\"",
              _react2.default.createElement("br", null)
            ),
            _react2.default.createElement(
              "i",
              { style: contentTextStyle },
              "\u0441\u0440\u043E\u043A \u0434\u043E 23.2023 \u0433\u043E\u0434\u0430",
              _react2.default.createElement("br", null)
            ),
            _react2.default.createElement(
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
}(_react.Component);

exports.default = RoomAdditionalPanel;

RoomAdditionalPanel.propTypes = {
  state: _propTypes2.default.object.isRequired,
  width: _propTypes2.default.number.isRequired,
  height: _propTypes2.default.number.isRequired,
  allowProjectFileSupport: _propTypes2.default.bool.isRequired,
  toolbarButtons: _propTypes2.default.array
};

RoomAdditionalPanel.contextTypes = {
  projectActions: _propTypes2.default.object.isRequired,
  viewer2DActions: _propTypes2.default.object.isRequired,
  viewer3DActions: _propTypes2.default.object.isRequired,
  linesActions: _propTypes2.default.object.isRequired,
  holesActions: _propTypes2.default.object.isRequired,
  itemsActions: _propTypes2.default.object.isRequired,
  translator: _propTypes2.default.object.isRequired,
  agents: _propTypes2.default.array.isRequired
};