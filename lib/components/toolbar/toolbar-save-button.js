'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ToolbarSaveButton;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _floppyO = require('react-icons/lib/fa/floppy-o');

var _floppyO2 = _interopRequireDefault(_floppyO);

var _toolbarButton = require('./toolbar-button');

var _toolbarButton2 = _interopRequireDefault(_toolbarButton);

var _browser = require('../../utils/browser');

var _layerOperations = require('../../utils/layer-operations');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ToolbarSaveButton(_ref, _ref2) {
  var state = _ref.state;
  var translator = _ref2.translator,
      projectActions = _ref2.projectActions;


  var saveProjectToFile = function saveProjectToFile(event) {

    event.preventDefault();
    var scene = state.get('scene').update('layers', function (layers) {
      return layers.map(function (layer) {
        return (0, _layerOperations.unselectAll)(layer);
      });
    }).toJS();

    (0, _browser.browserDownload)(scene);
  };

  //   function save() {
  //     setTimeout(setopenCatalog, 1000);
  //
  //     setTimeout(setrollback, 2000);
  //
  //     setTimeout(setSave, 3000);
  //
  //   }
  //
  // function setopenCatalog() {
  //   projectActions.openCatalog();
  // }
  //
  // function setrollback() {
  //   projectActions.rollback();
  // }
  //
  // function setSave() {
  //   let scene = state
  //     .get('scene')
  //     .update('layers', layers => layers.map(layer => unselectAll(layer)))
  //     .toJS();
  //
  //   browserDownload(scene);
  //   }


  return _react2.default.createElement(
    _toolbarButton2.default,
    { active: false, tooltip: translator.t("Save project"), onClick: saveProjectToFile },
    _react2.default.createElement(_floppyO2.default, null)
  );
}

ToolbarSaveButton.propTypes = {
  state: _propTypes2.default.object.isRequired
};

ToolbarSaveButton.contextTypes = {
  projectActions: _propTypes2.default.object.isRequired,
  translator: _propTypes2.default.object.isRequired
};