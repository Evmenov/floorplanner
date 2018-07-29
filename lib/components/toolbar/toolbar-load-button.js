'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ToolbarLoadButton;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _md = require('react-icons/lib/md');

var _folderOpenO = require('react-icons/lib/fa/folder-open-o');

var _folderOpenO2 = _interopRequireDefault(_folderOpenO);

var _toolbarButton = require('./toolbar-button');

var _toolbarButton2 = _interopRequireDefault(_toolbarButton);

var _browser = require('../../utils/browser');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ToolbarLoadButton(_ref, _ref2) {
  var state = _ref.state;
  var translator = _ref2.translator,
      projectActions = _ref2.projectActions;


  var loadProjectFromFile = function loadProjectFromFile(event) {
    // event.preventDefault();
    // browserUpload().then((data) => {
    //   let parsed = JSON.parse(data);
    //projectActions.loadProject(jss.jsonstring);
    // console.log(parsed.layers[0].ID);
    // });
  };

  return _react2.default.createElement(
    _toolbarButton2.default,
    { active: false, tooltip: translator.t("Load project"), onClick: loadProjectFromFile },
    _react2.default.createElement(_md.MdFolderOpen, null)
  );
}

ToolbarLoadButton.propTypes = {
  state: _propTypes2.default.object.isRequired
};

ToolbarLoadButton.contextTypes = {
  projectActions: _propTypes2.default.object.isRequired,
  translator: _propTypes2.default.object.isRequired
};