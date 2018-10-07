import {UPDATE_2D_CAMERA, SELECT_TOOL_PAN, SELECT_TOOL_ZOOM_IN, SELECT_TOOL_ZOOM_OUT, SELECT_FIT_TO_VIEWER} from '../constants';

export function updateCameraView(value) {
  return {
    type: UPDATE_2D_CAMERA,
    value
  }
}

export function selectToolPan() {
  return {
    type: SELECT_TOOL_PAN
  };
}

export function selectToolZoomOut() {
  return {
    type: SELECT_TOOL_ZOOM_OUT
  };
}

export function selectToolZoomIn() {
  return {
    type: SELECT_TOOL_ZOOM_IN
  };
}

export function fitToViewer() {
  return {
    type: SELECT_FIT_TO_VIEWER
  };
}
