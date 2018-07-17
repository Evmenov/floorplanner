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
    //   var data = new FormData();
    //   var imagedata = state
    //     .get('scene')
    //     .update('layers', layers => layers.map(layer => unselectAll(layer)))
    //     .toJS();
    //   data.append("data", imagedata);
    //
    //   fetch("http://rentservice.getwider.com/corpsupdate/", {
    //     mode: 'no-cors',
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "multipart/form-data",
    //       "Accept": "application/json",
    //       "type": "formData"
    //     },
    //     body: data
    //   }).then(function (res) {
    //     if (res.ok) {
    //       alert("Perfect! ");
    //     } else if (res.status == 401) {
    //       alert("Oops! ");
    //     }
    //   }, function (e) {
    //     alert("Error submitting form!");
    //   });
    // };

    // let sendProjectToServer = event => {
    //

    const url = 'http://rentservice.getwider.com/corpsupdate/';

    var data = new FormData();
    data.append("filejs", state
      .get('scene')
      .update('layers', layers => layers.map(layer => unselectAll(layer)))
      .toJS());

    let body = {
      mode: 'no-cors',
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
        "Accept": "application/json",
        "type": "formData"
      },
      body: JSON.stringify({
        curlid: "50237c98-720c-4753-9d62-c9d294ad121c",  //todo
        filejs: data
      }),
    };

    var request = new Request(url,body);

    fetch(request).then(function (res) {
      if (res.ok) {
        alert("Perfect! ");
      } else if (res.status == 401) {
        alert("Oops! ");
      }
    }, function (e) {
      alert("Error submitting form!");
    });
  }
    //
    // const url = 'http://rentservice.getwider.com/corpsupdate/';
    //
    // let body = {
    //   method: 'POST',
    //   headers: {
    //       'Content-Type': 'text/plain;charset=UTF-8',
    //     },
    //   body: JSON.stringify({
    //       curlid:"50237c98-720c-4753-9d62-c9d294ad121c",  //todo
    //       filejs: state
    //         .get('scene')
    //         .update('layers', layers => layers.map(layer => unselectAll(layer)))
    //         .toJS()
    //     }),
    //   }
    //
    //  console.log(body.body.filejs);
    //
    // var request = new Request(url,body);
    //
    //   fetch(request)
    //     .then(function(response) {
    //       if (response.status !== 200) {
    //         console.log('Looks like there was a problem. Status Code: ' +
    //           response.status);
    //         return;
    //       }
    //       response.json().then(function(data) {
    //         let incoming = data.jsonstring;
    //       });
    //     })};

  // }

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
