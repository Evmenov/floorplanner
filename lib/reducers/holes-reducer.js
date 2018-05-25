'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (state, action) {
  switch (action.type) {
    case _constants.SELECT_TOOL_DRAWING_HOLE:
      return selectToolDrawingHole(state, action.sceneComponentType);

    case _constants.UPDATE_DRAWING_HOLE:
      return updateDrawingHole(state, action.layerID, action.x, action.y);

    case _constants.END_DRAWING_HOLE:
      return endDrawingHole(state, action.layerID, action.x, action.y);

    case _constants.BEGIN_DRAGGING_HOLE:
      return beginDraggingHole(state, action.layerID, action.holeID, action.x, action.y);

    case _constants.UPDATE_DRAGGING_HOLE:
      return updateDraggingHole(state, action.x, action.y);

    case _constants.END_DRAGGING_HOLE:
      return endDraggingHole(state, action.x, action.y);

    case _constants.SELECT_HOLE:
      return selectHole(state, action.layerID, action.holeID);

    default:
      return state;
  }
};

var _immutable = require('immutable');

var _constants = require('../constants');

var _export = require('../utils/export');

var _layerOperations = require('../utils/layer-operations');

var _snap = require('../utils/snap');

function selectToolDrawingHole(state, sceneComponentType) {

  var snapElements = new _immutable.List().withMutations(function (snapElements) {
    var _state$getIn = state.getIn(['scene', 'layers', state.scene.selectedLayer]),
        lines = _state$getIn.lines,
        vertices = _state$getIn.vertices;

    lines.forEach(function (line) {
      var _vertices$get = vertices.get(line.vertices.get(0)),
          x1 = _vertices$get.x,
          y1 = _vertices$get.y;

      var _vertices$get2 = vertices.get(line.vertices.get(1)),
          x2 = _vertices$get2.x,
          y2 = _vertices$get2.y;

      (0, _snap.addLineSegmentSnap)(snapElements, x1, y1, x2, y2, 20, 1, line.id);
    });
  });

  return state.merge({
    mode: _constants.MODE_DRAWING_HOLE,
    snapElements: snapElements,
    drawingSupport: (0, _immutable.Map)({
      type: sceneComponentType
    })
  });
}

/** holes operations **/
function updateDrawingHole(state, layerID, x, y) {
  var catalog = state.catalog;

  //calculate snap and overwrite coords if needed
  //force snap to segment
  var snap = (0, _snap.nearestSnap)(state.snapElements, x, y, state.snapMask.merge({ SNAP_SEGMENT: true }));
  if (snap) {
    ;

    var _snap$point = snap.point;
    x = _snap$point.x;
    y = _snap$point.y;
  }var scene = state.scene.updateIn(['layers', layerID], function (layer) {
    return layer.withMutations(function (layer) {
      var selectedHole = layer.getIn(['selected', 'holes']).first();

      if (snap) {
        var lineID = snap.snap.related.get(0);
        var line = layer.getIn(['lines', lineID]);

        var _layer$vertices$get = layer.vertices.get(line.vertices.get(0)),
            x1 = _layer$vertices$get.x,
            y1 = _layer$vertices$get.y;

        var _layer$vertices$get2 = layer.vertices.get(line.vertices.get(1)),
            x2 = _layer$vertices$get2.x,
            y2 = _layer$vertices$get2.y;

        // I need min and max vertices on this line segment


        var minVertex = _export.GeometryUtils.minVertex({ x: x1, y: y1 }, { x: x2, y: y2 });
        var maxVertex = _export.GeometryUtils.maxVertex({ x: x1, y: y1 }, { x: x2, y: y2 });
        var width = catalog.factoryElement(state.drawingSupport.get('type')).properties.getIn(['width', 'length']);

        // Now I need min and max possible coordinates for the hole on the line. They depend on the width of the hole

        var lineLength = _export.GeometryUtils.pointsDistance(x1, y1, x2, y2);
        var alpha = Math.atan2(Math.abs(y2 - y1), Math.abs(x2 - x1));

        var cosWithThreshold = function cosWithThreshold(alpha) {
          var cos = Math.cos(alpha);
          return cos < 0.0000001 ? 0 : cos;
        };

        var sinWithThreshold = function sinWithThreshold(alpha) {
          var sin = Math.sin(alpha);
          return sin < 0.0000001 ? 0 : sin;
        };

        var cosAlpha = cosWithThreshold(alpha);
        var sinAlpha = sinWithThreshold(alpha);

        var minLeftVertexHole = {
          x: minVertex.x + width / 2 * cosAlpha,
          y: minVertex.y + width / 2 * sinAlpha
        };

        var maxRightVertexHole = {
          x: minVertex.x + lineLength * cosAlpha - width / 2 * cosAlpha,
          y: minVertex.y + lineLength * sinAlpha - width / 2 * sinAlpha
        };

        var offset = void 0;
        if (x < minLeftVertexHole.x) {
          offset = _export.GeometryUtils.pointPositionOnLineSegment(minVertex.x, minVertex.y, maxVertex.x, maxVertex.y, minLeftVertexHole.x, minLeftVertexHole.y);
        } else if (x > maxRightVertexHole.x) {
          offset = _export.GeometryUtils.pointPositionOnLineSegment(minVertex.x, minVertex.y, maxVertex.x, maxVertex.y, maxRightVertexHole.x, maxRightVertexHole.y);
        } else {

          if (x === minLeftVertexHole.x && x === maxRightVertexHole.x) {

            if (y < minLeftVertexHole.y) {
              offset = _export.GeometryUtils.pointPositionOnLineSegment(minVertex.x, minVertex.y, maxVertex.x, maxVertex.y, minLeftVertexHole.x, minLeftVertexHole.y);
              offset = minVertex.x === x1 && minVertex.y === y1 ? offset : 1 - offset;
            } else if (y > maxRightVertexHole.y) {
              offset = _export.GeometryUtils.pointPositionOnLineSegment(minVertex.x, minVertex.y, maxVertex.x, maxVertex.y, maxRightVertexHole.x, maxRightVertexHole.y);
              offset = minVertex.x === x1 && minVertex.y === y1 ? offset : 1 - offset;
            } else {
              offset = _export.GeometryUtils.pointPositionOnLineSegment(x1, y1, x2, y2, x, y);
            }
          } else {
            offset = _export.GeometryUtils.pointPositionOnLineSegment(x1, y1, x2, y2, x, y);
          }
        }

        //if hole does exist, update
        if (selectedHole && snap) {
          layer = layer.mergeIn(['holes', selectedHole], { offset: offset, line: lineID });

          //remove from old line ( if present )
          var index = layer.get('lines').findEntry(function (line) {
            return line.id !== lineID && line.get('holes').contains(selectedHole);
          });

          if (index) {
            var removed = index[1].get('holes').filter(function (hl) {
              return hl !== selectedHole;
            });
            layer = layer.setIn(['lines', index[0], 'holes'], removed);
          }

          //add to line
          var line_holes = layer.getIn(['lines', lineID, 'holes']);
          if (!line_holes.contains(selectedHole)) {
            layer = layer.setIn(['lines', lineID, 'holes'], line_holes.push(selectedHole));
          }
        }
        //if hole does not exist, create
        else if (!selectedHole && snap) {
            var _addHole = (0, _layerOperations.addHole)(layer, state.drawingSupport.get('type'), lineID, offset, catalog),
                hole = _addHole.hole;

            (0, _layerOperations.select)(layer, 'holes', hole.id);
          }
      }
      //i've lost the snap while trying to drop the hole
      else if (false && selectedHole) //think if enable
          {
            (0, _layerOperations.unselect)(layer, 'holes', selectedHole);
            (0, _layerOperations.removeHole)(layer, selectedHole);
          }
    });
  });

  return state.set('scene', scene);
}

function endDrawingHole(state, layerID, x, y) {
  var catalog = state.catalog;

  state = updateDrawingHole(state, layerID, x, y, catalog);
  var scene = state.scene.updateIn(['layers', layerID], function (layer) {
    return (0, _layerOperations.unselectAll)(layer);
  });
  return state.merge({
    scene: scene,
    sceneHistory: _export.history.historyPush(state.sceneHistory, scene)
  });
}

function beginDraggingHole(state, layerID, holeID, x, y) {
  var layer = state.getIn(['scene', 'layers', layerID]);
  var hole = layer.getIn(['holes', holeID]);
  var line = layer.getIn(['lines', hole.line]);
  var v0 = layer.getIn(['vertices', line.vertices.get(0)]);
  var v1 = layer.getIn(['vertices', line.vertices.get(1)]);

  var snapElements = (0, _snap.addLineSegmentSnap)((0, _immutable.List)(), v0.x, v0.y, v1.x, v1.y, 9999999, 1, null);

  return state.merge({
    mode: _constants.MODE_DRAGGING_HOLE,
    snapElements: snapElements,
    draggingSupport: (0, _immutable.Map)({
      layerID: layerID,
      holeID: holeID,
      startPointX: x,
      startPointY: y
    })
  });
}

function updateDraggingHole(state, x, y) {

  //calculate snap and overwrite coords if needed
  //force snap to segment
  var snap = (0, _snap.nearestSnap)(state.snapElements, x, y, state.snapMask.merge({ SNAP_SEGMENT: true }));
  if (!snap) return state;

  var draggingSupport = state.draggingSupport,
      scene = state.scene;


  var layerID = draggingSupport.get('layerID');
  var holeID = draggingSupport.get('holeID');
  var startPointX = draggingSupport.get('startPointX');
  var startPointY = draggingSupport.get('startPointY');

  var layer = state.getIn(['scene', 'layers', layerID]);
  var hole = layer.getIn(['holes', holeID]);
  var line = layer.getIn(['lines', hole.line]);
  var v0 = layer.getIn(['vertices', line.vertices.get(0)]);
  var v1 = layer.getIn(['vertices', line.vertices.get(1)]);

  // I need min and max vertices on this line segment
  var _snap$point2 = snap.point;
  x = _snap$point2.x;
  y = _snap$point2.y;
  var minVertex = _export.GeometryUtils.minVertex(v0, v1);
  var maxVertex = _export.GeometryUtils.maxVertex(v0, v1);

  // Now I need min and max possible coordinates for the hole on the line. They depend on the width of the hole

  var width = hole.properties.get('width').get('length');
  var lineLength = _export.GeometryUtils.pointsDistance(v0.x, v0.y, v1.x, v1.y);
  var alpha = Math.atan2(Math.abs(v1.y - v0.y), Math.abs(v1.x - v0.x));

  var cosWithThreshold = function cosWithThreshold(alpha) {
    var cos = Math.cos(alpha);
    return cos < 0.0000001 ? 0 : cos;
  };

  var sinWithThreshold = function sinWithThreshold(alpha) {
    var sin = Math.sin(alpha);
    return sin < 0.0000001 ? 0 : sin;
  };

  var cosAlpha = cosWithThreshold(alpha);
  var sinAlpha = sinWithThreshold(alpha);

  var minLeftVertexHole = {
    x: minVertex.x + width / 2 * cosAlpha,
    y: minVertex.y + width / 2 * sinAlpha
  };

  var maxRightVertexHole = {
    x: minVertex.x + lineLength * cosAlpha - width / 2 * cosAlpha,
    y: minVertex.y + lineLength * sinAlpha - width / 2 * sinAlpha
  };

  // Now I need to verify if the snap vertex (with coordinates x and y) is on the line segment

  var offset = void 0;

  if (x < minLeftVertexHole.x) {
    // Snap point is previous the the line
    offset = _export.GeometryUtils.pointPositionOnLineSegment(minVertex.x, minVertex.y, maxVertex.x, maxVertex.y, minLeftVertexHole.x, minLeftVertexHole.y);
  } else {
    // Snap point is after the line or on the line
    if (x > maxRightVertexHole.x) {
      offset = _export.GeometryUtils.pointPositionOnLineSegment(minVertex.x, minVertex.y, maxVertex.x, maxVertex.y, maxRightVertexHole.x, maxRightVertexHole.y);
    } else if (x === minLeftVertexHole.x && x === maxRightVertexHole.x) {
      // I am on a vertical line, I need to check y coordinates
      if (y < minLeftVertexHole.y) {
        offset = _export.GeometryUtils.pointPositionOnLineSegment(minVertex.x, minVertex.y, maxVertex.x, maxVertex.y, minLeftVertexHole.x, minLeftVertexHole.y);

        offset = minVertex === v0 ? offset : 1 - offset;
      } else if (y > maxRightVertexHole.y) {
        offset = _export.GeometryUtils.pointPositionOnLineSegment(minVertex.x, minVertex.y, maxVertex.x, maxVertex.y, maxRightVertexHole.x, maxRightVertexHole.y);

        offset = minVertex === v0 ? offset : 1 - offset;
      } else {
        offset = _export.GeometryUtils.pointPositionOnLineSegment(minVertex.x, minVertex.y, maxVertex.x, maxVertex.y, x, y);

        offset = minVertex === v0 ? offset : 1 - offset;
      }
    } else {
      offset = _export.GeometryUtils.pointPositionOnLineSegment(minVertex.x, minVertex.y, maxVertex.x, maxVertex.y, x, y);
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
    mode: _constants.MODE_IDLE,
    sceneHistory: _export.history.historyPush(state.sceneHistory, state.scene)
  });
}

function selectHole(state, layerID, holeID) {
  var scene = state.scene;

  scene = scene.merge({
    layers: scene.layers.map(_layerOperations.unselectAll),
    selectedLayer: layerID
  });

  scene = scene.updateIn(['layers', layerID], function (layer) {
    return layer.withMutations(function (layer) {
      (0, _layerOperations.select)(layer, 'holes', holeID);
    });
  });

  return state.merge({
    scene: scene,
    sceneHistory: _export.history.historyPush(state.sceneHistory, scene)
  });
}