import React from 'react';
import PropTypes from 'prop-types';
import { MdSave } from 'react-icons/lib/md';
import IconSave from 'react-icons/lib/fa/floppy-o';
import ToolbarButton from './toolbar-button';
import { browserDownload } from '../../utils/browser';
import { unselectAll } from '../../utils/layer-operations';

export default function ToolbarSaveButton(_ref, _ref2) {
  var state = _ref.state;
  var translator = _ref2.translator,
      projectActions = _ref2.projectActions;


  var saveProjectToFile = function saveProjectToFile(event) {

    event.preventDefault();
    var scene = state.get('scene').update('layers', function (layers) {
      return layers.map(function (layer) {
        return unselectAll(layer);
      });
    }).toJS();

    browserDownload(scene);
  };

  var uploadAction = function uploadAction(event) {
    var url = 'http://rentservice.getwider.com/corpsupdate/';

    var scene = state.get('scene').update('layers', function (layers) {
      return layers.map(function (layer) {
        return unselectAll(layer);
      });
    }).toJS();

    event.preventDefault();
    var datas = new FormData(event.target);

    var searchParams = new URLSearchParams(location.search);
    var id = { curlid: searchParams.get('curlid') || '' };

    datas.set('curlid', id.curlid);
    datas.set('jsstring', JSON.stringify(scene));
    console.log(scene);

    var request = new Request(url, {
      method: 'POST',
      body: datas
    });

    fetch(request).then(function (res) {
      if (res.ok) {
        alert("Сохранение прошло успешно!");
        window.location.href = 'http://rentservice.getwider.com/company/objects/?curlid={' + id.curlid + '}';
      } else if (res.status == 401) {
        alert("Сервер отклонил сохранение. Код ошибки " + res.status);
      }
    }, function (e) {
      alert("Error submitting form!");
    });
  };

  return React.createElement(
    ToolbarButton,
    { active: false, tooltip: translator.t("Save project"), onClick: uploadAction },
    React.createElement(MdSave, null)
  );
}

ToolbarSaveButton.propTypes = {
  state: PropTypes.object.isRequired
};

ToolbarSaveButton.contextTypes = {
  projectActions: PropTypes.object.isRequired,
  translator: PropTypes.object.isRequired
};