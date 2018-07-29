'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ToolbarSaveButton;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _md = require('react-icons/lib/md');

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

  var uploadAction = function uploadAction(event) {
    var url = 'http://rentservice.getwider.com/corpsupdate/';

    var scene = state.get('scene').update('layers', function (layers) {
      return layers.map(function (layer) {
        return (0, _layerOperations.unselectAll)(layer);
      });
    }).toJS();

    event.preventDefault();
    var datas = new FormData(event.target);

    var searchParams = new URLSearchParams(location.search);
    var id = { curlid: searchParams.get('curlid') || '' };

    datas.set('curlid', id.curlid);
    datas.set('jsstring', JSON.stringify(scene));

    var request = new Request(url, {
      method: 'POST',
      body: datas
    });

    fetch(request).then(function (res) {
      if (res.ok) {
        alert("Сохранение прошло успешно!");
      } else if (res.status == 401) {
        alert("Сервер отклонил сохранение. Код ошибки " + res.status);
      }
    }, function (e) {
      alert("Error submitting form!");
    });
  };

  return _react2.default.createElement(
    _toolbarButton2.default,
    { active: false, tooltip: translator.t("Save project"), onClick: uploadAction },
    _react2.default.createElement(_md.MdSave, null)
  );
}

ToolbarSaveButton.propTypes = {
  state: _propTypes2.default.object.isRequired
};

ToolbarSaveButton.contextTypes = {
  projectActions: _propTypes2.default.object.isRequired,
  translator: _propTypes2.default.object.isRequired
};