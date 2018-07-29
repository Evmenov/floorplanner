import { MODE_IDLE, MODE_3D_FIRST_PERSON, MODE_3D_VIEW, MODE_SNAPPING, SELECT_HOLE, SELECT_AREA, SELECT_ITEM, SELECT_LINE } from '../constants';
import { rollback, undo, remove, toggleSnap, copyProperties, pasteProperties } from '../actions/project-actions';
import { SNAP_POINT, SNAP_LINE, SNAP_SEGMENT, SNAP_MASK } from '../utils/snap';

var KEY_DELETE = 46;
var KEY_BACKSPACE = 8;
var KEY_ESC = 27;
var KEY_Z = 90;
var KEY_ALT = 18;
var KEY_C = 67;
var KEY_V = 86;

export default function keyboard() {

  return function (store, stateExtractor) {

    window.addEventListener('keydown', function (event) {

      var state = stateExtractor(store.getState());
      var mode = state.get('mode');

      switch (event.keyCode) {
        case KEY_BACKSPACE:
        case KEY_DELETE:
          {
            if ([MODE_IDLE, MODE_3D_FIRST_PERSON, MODE_3D_VIEW].includes(mode)) store.dispatch(remove());
            break;
          }
        case KEY_ESC:
          {
            store.dispatch(rollback());
            break;
          }
        case KEY_Z:
          {
            if (event.getModifierState('Control') || event.getModifierState('Meta')) store.dispatch(undo());
            break;
          }
        case KEY_ALT:
          {
            if (MODE_SNAPPING.includes(mode)) store.dispatch(toggleSnap(state.snapMask.merge({ SNAP_POINT: false, SNAP_LINE: false, SNAP_SEGMENT: false, tempSnapConfiguartion: state.snapMask.toJS() })));
            break;
          }
        case KEY_C:
          {
            var selectedLayer = state.getIn(['scene', 'selectedLayer']);
            var selected = state.getIn(['scene', 'layers', selectedLayer, 'selected']);

            if ((mode === MODE_IDLE || mode === MODE_3D_VIEW) && (selected.holes.size || selected.areas.size || selected.items.size || selected.lines.size)) {
              if (selected.holes.size) {
                var hole = state.getIn(['scene', 'layers', selectedLayer, 'holes', selected.holes.get(0)]);
                store.dispatch(copyProperties(hole.get('properties')));
              } else if (selected.areas.size) {
                var area = state.getIn(['scene', 'layers', selectedLayer, 'areas', selected.areas.get(0)]);
                store.dispatch(copyProperties(area.properties));
              } else if (selected.items.size) {
                var item = state.getIn(['scene', 'layers', selectedLayer, 'items', selected.items.get(0)]);
                store.dispatch(copyProperties(item.properties));
              } else if (selected.lines.size) {
                var line = state.getIn(['scene', 'layers', selectedLayer, 'lines', selected.lines.get(0)]);
                store.dispatch(copyProperties(line.properties));
              }
            }
            break;
          }
        case KEY_V:
          {
            store.dispatch(pasteProperties());
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
            if (MODE_SNAPPING.includes(mode)) store.dispatch(toggleSnap(state.snapMask.merge(state.snapMask.get('tempSnapConfiguartion'))));
            break;
          }
      }
    });
  };
}