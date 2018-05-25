'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = keyboard;

var _constants = require('../constants');

var _projectActions = require('../actions/project-actions');

var _snap = require('../utils/snap');

var KEY_DELETE = 46;
var KEY_BACKSPACE = 8;
var KEY_ESC = 27;
var KEY_Z = 90;
var KEY_ALT = 18;
var KEY_C = 67;
var KEY_V = 86;

function keyboard() {

  return function (store, stateExtractor) {

    window.addEventListener('keydown', function (event) {

      var state = stateExtractor(store.getState());
      var mode = state.get('mode');

      switch (event.keyCode) {
        case KEY_BACKSPACE:
        case KEY_DELETE:
          {
            if ([_constants.MODE_IDLE, _constants.MODE_3D_FIRST_PERSON, _constants.MODE_3D_VIEW].includes(mode)) store.dispatch((0, _projectActions.remove)());
            break;
          }
        case KEY_ESC:
          {
            store.dispatch((0, _projectActions.rollback)());
            break;
          }
        case KEY_Z:
          {
            if (event.getModifierState('Control') || event.getModifierState('Meta')) store.dispatch((0, _projectActions.undo)());
            break;
          }
        case KEY_ALT:
          {
            if (_constants.MODE_SNAPPING.includes(mode)) store.dispatch((0, _projectActions.toggleSnap)(state.snapMask.merge({ SNAP_POINT: false, SNAP_LINE: false, SNAP_SEGMENT: false, tempSnapConfiguartion: state.snapMask.toJS() })));
            break;
          }
        case KEY_C:
          {
            var selectedLayer = state.getIn(['scene', 'selectedLayer']);
            var selected = state.getIn(['scene', 'layers', selectedLayer, 'selected']);

            if ((mode === _constants.MODE_IDLE || mode === _constants.MODE_3D_VIEW) && (selected.holes.size || selected.areas.size || selected.items.size || selected.lines.size)) {
              if (selected.holes.size) {
                var hole = state.getIn(['scene', 'layers', selectedLayer, 'holes', selected.holes.get(0)]);
                store.dispatch((0, _projectActions.copyProperties)(hole.get('properties')));
              } else if (selected.areas.size) {
                var area = state.getIn(['scene', 'layers', selectedLayer, 'areas', selected.areas.get(0)]);
                store.dispatch((0, _projectActions.copyProperties)(area.properties));
              } else if (selected.items.size) {
                var item = state.getIn(['scene', 'layers', selectedLayer, 'items', selected.items.get(0)]);
                store.dispatch((0, _projectActions.copyProperties)(item.properties));
              } else if (selected.lines.size) {
                var line = state.getIn(['scene', 'layers', selectedLayer, 'lines', selected.lines.get(0)]);
                store.dispatch((0, _projectActions.copyProperties)(line.properties));
              }
            }
            break;
          }
        case KEY_V:
          {
            store.dispatch((0, _projectActions.pasteProperties)());
            break;
          }
      }
    });

    window.addEventListener('keyup', function (event) {

      var state = stateExtractor(store.getState());
      var mode = state.get('mode');

      switch (event.keyCode) {
        case KEY_ALT:
          {
            if (_constants.MODE_SNAPPING.includes(mode)) store.dispatch((0, _projectActions.toggleSnap)(state.snapMask.merge(state.snapMask.get('tempSnapConfiguartion'))));
            break;
          }
      }
    });
  };
}