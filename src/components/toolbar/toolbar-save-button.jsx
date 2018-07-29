import React from 'react';
import PropTypes from 'prop-types';
import {MdSave } from 'react-icons/lib/md';
import IconSave from 'react-icons/lib/fa/floppy-o';
import ToolbarButton from './toolbar-button';
import {browserDownload}  from '../../utils/browser';
import {unselectAll} from '../../utils/layer-operations';

export default function ToolbarSaveButton({state}, {translator, projectActions}) {

  let saveProjectToFile = event => {

    event.preventDefault();
    let scene = state
      .get('scene')
      .update('layers', layers => layers.map(layer => unselectAll(layer)))
      .toJS();

    browserDownload(scene);
  };

  let uploadAction = event => {
    const url = 'http://rentservice.getwider.com/corpsupdate/';

    let scene = state
      .get('scene')
      .update('layers', layers => layers.map(layer => unselectAll(layer)))
      .toJS();

      event.preventDefault();
      const datas = new FormData(event.target);

      const searchParams = new URLSearchParams(location.search);
      let id = {curlid: searchParams.get('curlid') || ''};

      datas.set('curlid', id.curlid);
      datas.set('jsstring', JSON.stringify(scene));

      var request = new Request(url,{
      method: 'POST',
      body: datas,
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
  }

  return (
    <ToolbarButton active={false} tooltip={translator.t("Save project")} onClick={uploadAction}>
      <MdSave />
    </ToolbarButton>
  );
}

ToolbarSaveButton.propTypes = {
  state: PropTypes.object.isRequired,
};

ToolbarSaveButton.contextTypes = {
  projectActions: PropTypes.object.isRequired,
  translator: PropTypes.object.isRequired,
};
