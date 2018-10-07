import {
  UPDATE_2D_CAMERA,
  SELECT_TOOL_PAN,
  SELECT_TOOL_ZOOM_IN,
  SELECT_TOOL_ZOOM_OUT,
  MODE_IDLE,
  MODE_2D_PAN,
  MODE_2D_ZOOM_IN,
  MODE_2D_ZOOM_OUT,
  MODE_2D_FIT_TO_VIEW,
  SELECT_FIT_TO_VIEWER
} from '../constants';
import {fromJS} from 'immutable';
import {TOOL_NONE, TOOL_ZOOM_OUT, TOOL_ZOOM_IN, TOOL_PAN, fitToViewer} from 'react-svg-pan-zoom';

const TOOL2MODE = {
  [TOOL_NONE]: MODE_IDLE,
  [TOOL_ZOOM_IN]: MODE_2D_ZOOM_IN,
  [TOOL_ZOOM_OUT]: MODE_2D_ZOOM_OUT,
  [TOOL_PAN]: MODE_2D_PAN,
  //[fromJS(fitToViewer(viewerValue))]: MODE_2D_FIT_TO_VIEW,
};

export default function (state, action) {

  let viewerValue = state.get('viewer2D') ? state.get('viewer2D').toJS() : null;
  //console.log(viewerValue);
  switch (action.type) {

    case UPDATE_2D_CAMERA:

      return state.merge({
        viewer2D: fromJS(action.value)
      });
     // return state.set('viewer2D', fromJS(action.value));

    case SELECT_TOOL_PAN:
      return state.set('mode', MODE_2D_PAN);

    case SELECT_TOOL_ZOOM_IN:
      return state.set('mode', MODE_2D_ZOOM_IN);

    case SELECT_TOOL_ZOOM_OUT:
      return state.set('mode', MODE_2D_ZOOM_OUT);

    case SELECT_FIT_TO_VIEWER:
      console.log('SELECT_FIT_TO_VIEWER')
      return state.set('viewer2D', fromJS(fitToViewer(viewerValue)));
  }
}
