import React from 'react';
import PropTypes from 'prop-types';
import { MdFolderOpen } from 'react-icons/lib/md';
import IconLoad from 'react-icons/lib/fa/folder-open-o';
import ToolbarButton from './toolbar-button';
import { browserUpload } from '../../utils/browser';

export default function ToolbarLoadButton(_ref, _ref2) {
  var state = _ref.state;
  var translator = _ref2.translator,
      projectActions = _ref2.projectActions;


  var loadProjectFromFile = function loadProjectFromFile(event) {
    event.preventDefault();
    browserUpload().then(function (data) {
      var parsed = JSON.parse(data);
      projectActions.loadProject(parsed);
      // console.log(parsed.layers[0].ID);
    });
  };

  return React.createElement(
    ToolbarButton,
    { active: false, tooltip: translator.t("Load project"), onClick: loadProjectFromFile },
    React.createElement(MdFolderOpen, null)
  );
}

ToolbarLoadButton.propTypes = {
  state: PropTypes.object.isRequired
};

ToolbarLoadButton.contextTypes = {
  projectActions: PropTypes.object.isRequired,
  translator: PropTypes.object.isRequired
};