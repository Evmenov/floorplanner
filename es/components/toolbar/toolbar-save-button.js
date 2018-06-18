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


  return React.createElement(
    ToolbarButton,
    { active: false, tooltip: translator.t("Save project"), onClick: saveProjectToFile },
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