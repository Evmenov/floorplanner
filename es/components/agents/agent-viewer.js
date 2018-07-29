var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ContentTitle, ContentContainer, CancelButton } from '../style/export';
import AgentsList from "./agents-list";

var AgentViewer = function (_Component) {
  _inherits(AgentViewer, _Component);

  function AgentViewer(props, context) {
    _classCallCheck(this, AgentViewer);

    var _this = _possibleConstructorReturn(this, (AgentViewer.__proto__ || Object.getPrototypeOf(AgentViewer)).call(this, props, context));

    var scene = props.state.scene;

    _this.state = {
      dataWidth: scene.width,
      dataHeight: scene.height,
      isOpen: true
    };
    return _this;
  }

  _createClass(AgentViewer, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          width = _props.width,
          height = _props.height,
          sidebarH = _props.sidebarH;
      var _state = this.state,
          dataWidth = _state.dataWidth,
          dataHeight = _state.dataHeight;
      var _context = this.context,
          projectActions = _context.projectActions,
          translator = _context.translator,
          agents = _context.agents;


      var Style = {
        width: width,
        height: height,
        position: 'relative',
        top: sidebarH
      };
      var body = this.state.isOpen && React.createElement(
        ContentContainer,
        { width: width, height: height, style: Style },
        React.createElement(
          ContentTitle,
          null,
          translator.t('Agents list')
        ),
        React.createElement(AgentsList, { agents: agents }),
        React.createElement(
          'table',
          { style: { float: 'right' } },
          React.createElement(
            'tbody',
            null,
            React.createElement(
              'tr',
              null,
              React.createElement(
                'td',
                null,
                React.createElement(
                  CancelButton,
                  { size: 'large',
                    onClick: function onClick(e) {
                      return projectActions.rollback();
                    } },
                  translator.t('Close')
                )
              )
            )
          )
        )
      );
      return body;
    }
  }]);

  return AgentViewer;
}(Component);

export default AgentViewer;


AgentViewer.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  state: PropTypes.object.isRequired
};

AgentViewer.contextTypes = {
  projectActions: PropTypes.object.isRequired,
  translator: PropTypes.object.isRequired,
  agents: PropTypes.array.isRequired
};