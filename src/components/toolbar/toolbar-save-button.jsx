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

  let sendProjectToServer = event => {

    const url = 'http://rentservice.getwider.com/corpsupdate/';

    let body = {
      method: 'POST',
      headers: {
          'Content-Type': 'text/plain;charset=UTF-8',
        },
      body: JSON.stringify({
          curlid:"50237c98-720c-4753-9d62-c9d294ad121c",  //todo
          jsonstring: state
            .get('scene')
            .update('layers', layers => layers.map(layer => unselectAll(layer)))
            .toJS()
        }),
      }

    // console.log(body.body.jsonstring);

    var request = new Request(url,body);

      fetch(request)
        .then(function(response) {
          if (response.status !== 200) {
            console.log('Looks like there was a problem. Status Code: ' +
              response.status);
            return;
          }
          response.json().then(function(data) {
            let incoming = data.jsonstring;
          });
        })

  }

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
    <ToolbarButton active={false} tooltip={translator.t("Save project")} onClick={sendProjectToServer}>
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
