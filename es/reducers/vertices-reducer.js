import { BEGIN_DRAGGING_VERTEX, UPDATE_DRAGGING_VERTEX, END_DRAGGING_VERTEX, MODE_DRAGGING_VERTEX, MODE_IDLE } from '../constants';
import { Map, List } from 'immutable';
import { LayerOperations, SnapSceneUtils, SnapUtils, GeometryUtils, history } from '../utils/export';

export default function (state, action) {
  switch (action.type) {
    case BEGIN_DRAGGING_VERTEX:
      return beginDraggingVertex(state, action.layerID, action.vertexID, action.x, action.y);

    case UPDATE_DRAGGING_VERTEX:
      return updateDraggingVertex(state, action.x, action.y);

    case END_DRAGGING_VERTEX:
      return endDraggingVertex(state, action.x, action.y);

    default:
      return state;
  }
}

function beginDraggingVertex(state, layerID, vertexID, x, y) {

  var snapElements = SnapSceneUtils.sceneSnapElements(state.scene, new List(), state.snapMask);

  return state.merge({
    mode: MODE_DRAGGING_VERTEX,
    snapElements: snapElements,
    draggingSupport: Map({
      layerID: layerID, vertexID: vertexID
    })
  });
}

function updateDraggingVertex(state, x, y) {
  var draggingSupport = state.draggingSupport,
      snapElements = state.snapElements,
      scene = state.scene;


  var snap = null;
  if (state.snapMask && !state.snapMask.isEmpty()) {
    snap = SnapUtils.nearestSnap(snapElements, x, y, state.snapMask);
    if (snap) {
      ;
      var _snap$point = snap.point;
      x = _snap$point.x;
      y = _snap$point.y;
    }
  }

  var layerID = draggingSupport.get('layerID');
  var vertexID = draggingSupport.get('vertexID');
  return state.merge({
    activeSnapElement: snap ? snap.snap : null,
    scene: scene.mergeIn(['layers', layerID, 'vertices', vertexID], { x: x, y: y })
  });
}

function endDraggingVertex(state, x, y) {
  var catalog = state.catalog;

  var draggingSupport = state.draggingSupport;

  var layerID = draggingSupport.get('layerID');
  var vertexID = draggingSupport.get('vertexID');
  var lineIDs = state.scene.layers.get(layerID).vertices.get(vertexID).lines;

  var scene = state.scene.updateIn(['layers', layerID], function (layer) {
    return layer.withMutations(function (layer) {

      lineIDs.forEach(function (lineID) {
        var line = layer.lines.get(lineID);

        if (line) {

          var oldVertexID = void 0;

          if (line.vertices.get(0) === vertexID) {
            // I need to invert vertices
            oldVertexID = line.vertices.get(1);
          } else {
            oldVertexID = line.vertices.get(0);
          }

          var oldVertex = layer.vertices.get(oldVertexID);
          var vertex = layer.vertices.get(vertexID);

          var oldHoles = [];

          var orderedVertices = GeometryUtils.orderVertices([oldVertex, vertex]);

          line.holes.forEach(function (holeID) {
            var hole = layer.holes.get(holeID);
            var oldLineLength = GeometryUtils.pointsDistance(oldVertex.x, oldVertex.y, vertex.x, vertex.y);

            var alpha = Math.atan2(orderedVertices[1].y - orderedVertices[0].y, orderedVertices[1].x - orderedVertices[0].x);

            var offset = hole.offset;

            if (orderedVertices[1].x === line.vertices.get(1).x && orderedVertices[1].y === line.vertices(1).y) {
              offset = 1 - offset;
            }

            var xp = oldLineLength * offset * Math.cos(alpha) + orderedVertices[0].x;
            var yp = oldLineLength * offset * Math.sin(alpha) + orderedVertices[0].y;

            oldHoles.push({ hole: hole, offsetPosition: { x: xp, y: yp } });
          });

          LayerOperations.mergeEqualsVertices(layer, vertexID);
          LayerOperations.removeLine(layer, lineID);

          if (!GeometryUtils.samePoints(oldVertex, vertex)) {
            LayerOperations.addLineAvoidingIntersections(layer, line.type, oldVertex.x, oldVertex.y, vertex.x, vertex.y, catalog, line.properties, oldHoles);
          }
        }
      });

      LayerOperations.detectAndUpdateAreas(layer, catalog);
    });
  });

  return state.merge({
    mode: MODE_IDLE,
    draggingSupport: null,
    scene: scene,

    activeSnapElement: null,
    snapElements: new List(),
    sceneHistory: history.historyPush(state.sceneHistory, scene)
  });
}