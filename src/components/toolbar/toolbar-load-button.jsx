import React from 'react';
import PropTypes from 'prop-types';
import {MdFolderOpen } from 'react-icons/lib/md';
import IconLoad from 'react-icons/lib/fa/folder-open-o';
import ToolbarButton from './toolbar-button';
import {browserUpload}  from '../../utils/browser';

export default function ToolbarLoadButton({state}, {translator, projectActions}) {

  let loadProjectFromFile = event => {
    event.preventDefault();
    browserUpload().then((data) => {
      let parsed = JSON.parse(data);
      projectActions.loadProject(parsed);
      // console.log(parsed.layers[0].ID);
    });
  };

  return (
    <ToolbarButton active={false} tooltip={translator.t("Load project")} onClick={loadProjectFromFile}>
      <MdFolderOpen />
    </ToolbarButton>
  );
}

ToolbarLoadButton.propTypes = {
  state: PropTypes.object.isRequired,
};

ToolbarLoadButton.contextTypes = {
  projectActions: PropTypes.object.isRequired,
  translator: PropTypes.object.isRequired,
};
