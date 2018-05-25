import {List, Map} from 'immutable';

import {
  SELECT_TOOL_DRAWING_HOLE,
  UPDATE_DRAWING_HOLE,
  END_DRAWING_HOLE,
  BEGIN_DRAGGING_HOLE,
  UPDATE_DRAGGING_HOLE,
  END_DRAGGING_HOLE,
  SELECT_HOLE,

  MODE_IDLE,
  MODE_DRAWING_HOLE,
  MODE_DRAGGING_HOLE,
} from '../constants';

import {
  history,
  GeometryUtils
} from '../utils/export';

import {
  select,
  unselect,
  unselectAll,
  addHole,
  removeHole,
} from '../utils/layer-operations';

import {
  nearestSnap,
  addPointSnap,
  addLineSnap,
  addLineSegmentSnap,
  SNAP_POINT,
  SNAP_LINE,
  SNAP_SEGMENT
} from '../utils/snap';

export default function (state, action) {
  switch (action.type) {
    case SELECT_TOOL_DRAWING_HOLE:
      return selectToolDrawingHole(state, action.sceneComponentType);

    case UPDATE_DRAWING_HOLE:
      return updateDrawingHole(state, action.layerID, action.x, action.y);

    case END_DRAWING_HOLE:
      return endDrawingHole(state, action.layerID, action.x, action.y);

    case BEGIN_DRAGGING_HOLE:
      return beginDraggingHole(state, action.layerID, action.holeID, action.x, action.y);

    case UPDATE_DRAGGING_HOLE:
      return updateDraggingHole(state, action.x, action.y);

    case END_DRAGGING_HOLE:
      return endDraggingHole(state, action.x, action.y);

    case SELECT_HOLE:
      return selectHole(state, action.layerID, action.holeID);

    default:
      return state;
  }
}

function selectToolDrawingHole(state, sceneComponentType) {

  let snapElements = (new List()).withMutations(snapElements => {
    let {lines, vertices} = state.getIn(['scene', 'layers', state.scene.selectedLayer]);

    lines.forEach(line => {
      let {x: x1, y: y1} = vertices.get(line.vertices.get(0));
      let {x: x2, y: y2} = vertices.get(line.vertices.get(1));

      addLineSegmentSnap(snapElements, x1, y1, x2, y2, 20, 1, line.id);
    })
  });

  return state.merge({
    mode: MODE_DRAWING_HOLE,
    snapElements,
    drawingSupport: Map({
      type: sceneComponentType
    })
  });
}

/** holes operations **/
function updateDrawingHole(state, layerID, x, y) {
  let catalog = state.catalog;

  //calculate snap and overwrite coords if needed
  //force snap to segment
  let snap = nearestSnap(state.snapElements, x, y, state.snapMask.merge({SNAP_SEGMENT: true}));
  if (snap) ({x, y} = snap.point);

  let scene = state.scene.updateIn(['layers', layerID], layer => layer.withMutations(layer => {
    let selectedHole = layer.getIn(['selected', 'holes']).first();

    if (snap) {
      let lineID = snap.snap.related.get(0);
      let line = layer.getIn(['lines', lineID]);
      let {x: x1, y: y1} = layer.vertices.get(line.vertices.get(0));
      let {x: x2, y: y2} = layer.vertices.get(line.vertices.get(1));

      // I need min and max vertices on this line segment
      let minVertex = GeometryUtils.minVertex({x: x1, y: y1}, {x: x2, y: y2});
      let maxVertex = GeometryUtils.maxVertex({x: x1, y: y1}, {x: x2, y: y2});
      let width = catalog.factoryElement(state.drawingSupport.get('type')).properties.getIn(['width','length']);

      // Now I need min and max possible coordinates for the hole on the line. They depend on the width of the hole

      let lineLength = GeometryUtils.pointsDistance(x1, y1, x2, y2);
      let alpha = Math.atan2(Math.abs(y2 - y1), Math.abs(x2 - x1));

      let cosWithThreshold = (alpha) => {
        let cos = Math.cos(alpha);
        return cos < 0.0000001 ? 0 : cos;
      };

      let sinWithThreshold = (alpha) => {
        let sin = Math.sin(alpha);
        return sin < 0.0000001 ? 0 : sin;
      };

      let cosAlpha = cosWithThreshold(alpha);
      let sinAlpha = sinWithThreshold(alpha);

      let minLeftVertexHole = {
        x: minVertex.x + width / 2 * cosAlpha,
        y: minVertex.y + width / 2 * sinAlpha
      };

      let maxRightVertexHole = {
        x: minVertex.x + lineLength * cosAlpha - width / 2 * cosAlpha,
        y: minVertex.y + lineLength * sinAlpha - width / 2 * sinAlpha
      };

      let offset;
      if (x < minLeftVertexHole.x) {
        offset = GeometryUtils.pointPositionOnLineSegment(minVertex.x, minVertex.y,
          maxVertex.x, maxVertex.y,
          minLeftVertexHole.x, minLeftVertexHole.y);
      } else if (x > maxRightVertexHole.x) {
        offset = GeometryUtils.pointPositionOnLineSegment(minVertex.x, minVertex.y,
          maxVertex.x, maxVertex.y,
          maxRightVertexHole.x, maxRightVertexHole.y);
      } else {

        if (x === minLeftVertexHole.x && x === maxRightVertexHole.x) {

          if (y < minLeftVertexHole.y) {
            offset = GeometryUtils.pointPositionOnLineSegment(minVertex.x, minVertex.y,
              maxVertex.x, maxVertex.y,
              minLeftVertexHole.x, minLeftVertexHole.y);
            offset = minVertex.x === x1 && minVertex.y === y1 ? offset : 1 - offset;
          } else if (y > maxRightVertexHole.y) {
            offset = GeometryUtils.pointPositionOnLineSegment(minVertex.x, minVertex.y,
              maxVertex.x, maxVertex.y,
              maxRightVertexHole.x, maxRightVertexHole.y);
            offset = minVertex.x === x1 && minVertex.y === y1 ? offset : 1 - offset;
          } else {
            offset = GeometryUtils.pointPositionOnLineSegment(x1, y1, x2, y2, x, y);
          }
        } else {
          offset = GeometryUtils.pointPositionOnLineSegment(x1, y1, x2, y2, x, y);
        }
      }

      //if hole does exist, update
      if( selectedHole && snap ) {
        layer = layer.mergeIn(['holes', selectedHole], { offset, line: lineID } );

        //remove from old line ( if present )
        let index = layer.get('lines').findEntry( line => {
          return line.id !== lineID && line.get('holes').contains( selectedHole );
        } );

        if( index ) {
          let removed = index[1].get('holes').filter( hl => hl !== selectedHole );
          layer = layer.setIn(['lines', index[0], 'holes'], removed );
        }

        //add to line
        let line_holes = layer.getIn(['lines', lineID, 'holes']);
        if( !line_holes.contains( selectedHole ) ) {
          layer = layer.setIn(['lines', lineID, 'holes'], line_holes.push( selectedHole ) );
        }
      }
      //if hole does not exist, create
      else if( !selectedHole && snap ){
        let { hole } = addHole(layer, state.drawingSupport.get('type'), lineID, offset, catalog);
        select(layer, 'holes', hole.id);
      }
    }
    //i've lost the snap while trying to drop the hole
    else if( false && selectedHole )  //think if enable
    {
      unselect(layer, 'holes', selectedHole);
      removeHole(layer, selectedHole);
    }
  }));

  return state.set('scene', scene);
}

function endDrawingHole(state, layerID, x, y) {
  let catalog = state.catalog;

  state = updateDrawingHole(state, layerID, x, y, catalog);
  let scene = state.scene.updateIn(['layers', layerID], layer => unselectAll(layer));
  return state.merge({
    scene,
    sceneHistory: history.historyPush( state.sceneHistory, scene )
  });
}

function beginDraggingHole(state, layerID, holeID, x, y) {
  let layer = state.getIn(['scene', 'layers', layerID]);
  let hole = layer.getIn(['holes', holeID]);
  let line = layer.getIn(['lines', hole.line]);
  let v0 = layer.getIn(['vertices', line.vertices.get(0)]);
  let v1 = layer.getIn(['vertices', line.vertices.get(1)]);

  let snapElements = addLineSegmentSnap(List(), v0.x, v0.y, v1.x, v1.y, 9999999, 1, null);

  return state.merge({
    mode: MODE_DRAGGING_HOLE,
    snapElements,
    draggingSupport: Map({
      layerID,
      holeID,
      startPointX: x,
      startPointY: y,
    })
  });
}

function updateDraggingHole(state, x, y) {

  //calculate snap and overwrite coords if needed
  //force snap to segment
  let snap = nearestSnap(state.snapElements, x, y, state.snapMask.merge({SNAP_SEGMENT: true}));
  if (!snap) return state;

  let {draggingSupport, scene} = state;

  let layerID = draggingSupport.get('layerID');
  let holeID = draggingSupport.get('holeID');
  let startPointX = draggingSupport.get('startPointX');
  let startPointY = draggingSupport.get('startPointY');

  let layer = state.getIn(['scene', 'layers', layerID]);
  let hole = layer.getIn(['holes', holeID]);
  let line = layer.getIn(['lines', hole.line]);
  let v0 = layer.getIn(['vertices', line.vertices.get(0)]);
  let v1 = layer.getIn(['vertices', line.vertices.get(1)]);

  ({x, y} = snap.point);

  // I need min and max vertices on this line segment
  let minVertex = GeometryUtils.minVertex(v0, v1);
  let maxVertex = GeometryUtils.maxVertex(v0, v1);

  // Now I need min and max possible coordinates for the hole on the line. They depend on the width of the hole

  let width = hole.properties.get('width').get('length');
  let lineLength = GeometryUtils.pointsDistance(v0.x, v0.y, v1.x, v1.y);
  let alpha = Math.atan2(Math.abs(v1.y - v0.y), Math.abs(v1.x - v0.x));

  let cosWithThreshold = (alpha) => {
    let cos = Math.cos(alpha);
    return cos < 0.0000001 ? 0 : cos;
  };

  let sinWithThreshold = (alpha) => {
    let sin = Math.sin(alpha);
    return sin < 0.0000001 ? 0 : sin;
  };

  let cosAlpha = cosWithThreshold(alpha);
  let sinAlpha = sinWithThreshold(alpha);

  let minLeftVertexHole = {
    x: minVertex.x + width / 2 * cosAlpha,
    y: minVertex.y + width / 2 * sinAlpha
  };

  let maxRightVertexHole = {
    x: minVertex.x + lineLength * cosAlpha - width / 2 * cosAlpha,
    y: minVertex.y + lineLength * sinAlpha - width / 2 * sinAlpha
  };

  // Now I need to verify if the snap vertex (with coordinates x and y) is on the line segment

  let offset;

  if (x < minLeftVertexHole.x) {
    // Snap point is previous the the line
    offset = GeometryUtils.pointPositionOnLineSegment(minVertex.x, minVertex.y,
      maxVertex.x, maxVertex.y,
      minLeftVertexHole.x, minLeftVertexHole.y);
  } else {
    // Snap point is after the line or on the line
    if (x > maxRightVertexHole.x) {
      offset = GeometryUtils.pointPositionOnLineSegment(minVertex.x, minVertex.y,
        maxVertex.x, maxVertex.y,
        maxRightVertexHole.x, maxRightVertexHole.y);
    } else if (x === minLeftVertexHole.x && x === maxRightVertexHole.x) {
      // I am on a vertical line, I need to check y coordinates
      if (y < minLeftVertexHole.y) {
        offset = GeometryUtils.pointPositionOnLineSegment(minVertex.x, minVertex.y,
          maxVertex.x, maxVertex.y,
          minLeftVertexHole.x, minLeftVertexHole.y);

        offset = minVertex === v0 ? offset : 1 - offset;

      } else if (y > maxRightVertexHole.y) {
        offset = GeometryUtils.pointPositionOnLineSegment(minVertex.x, minVertex.y,
          maxVertex.x, maxVertex.y,
          maxRightVertexHole.x, maxRightVertexHole.y);

        offset = minVertex === v0 ? offset : 1 - offset;

      } else {
        offset = GeometryUtils.pointPositionOnLineSegment(minVertex.x, minVertex.y,
          maxVertex.x, maxVertex.y,
          x, y);

        offset = minVertex === v0 ? offset : 1 - offset;
      }
    } else {
      offset = GeometryUtils.pointPositionOnLineSegment(minVertex.x, minVertex.y,
        maxVertex.x, maxVertex.y,
        x, y);
    }
  }

  hole = hole.set('offset', offset);

  return state.merge({
    scene: scene.mergeIn(['layers', layerID, 'holes', holeID], hole)
  });

}

function endDraggingHole(state, x, y) {
  state = updateDraggingHole(state, x, y);
  return state.merge({
    mode: MODE_IDLE,
    sceneHistory: history.historyPush( state.sceneHistory, state.scene )
  });
}

function selectHole(state, layerID, holeID) {
  let scene = state.scene;

  scene = scene.merge({
    layers: scene.layers.map(unselectAll),
    selectedLayer: layerID
  });

  scene = scene.updateIn(['layers', layerID], layer => layer.withMutations(layer => {
    select(layer, 'holes', holeID);
  }));

  return state.merge({
    scene,
    sceneHistory: history.historyPush( state.sceneHistory, scene )
  })
}
