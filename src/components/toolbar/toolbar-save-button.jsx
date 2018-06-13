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


  return (
    <ToolbarButton active={false} tooltip={translator.t("Save project")} onClick={saveProjectToFile}>
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
