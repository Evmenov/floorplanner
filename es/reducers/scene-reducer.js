import { ADD_LAYER, SELECT_LAYER, SET_LAYER_PROPERTIES, MODE_IDLE, REMOVE_LAYER } from '../constants';
import { Layer, Scene } from '../models';
import { IDBroker, LayerOperations, history } from '../utils/export';

export default function (state, action) {
  switch (action.type) {
    case ADD_LAYER:
      return addLayer(state, action.name, action.altitude);

    case SELECT_LAYER:
      return selectLayer(state, action.layerID);

    case SET_LAYER_PROPERTIES:
      return setLayerProperties(state, action.layerID, action.properties);

    case REMOVE_LAYER:
      return removeLayer(state, action.layerID);

    default:
      return state;
  }
}

function addLayer(state, name, altitude) {
  var layerID = IDBroker.acquireID();
  name = name || 'layer ' + layerID;
  altitude = altitude || 0;

  var layer = new Layer({ id: layerID, name: name, altitude: altitude });
  var scene = state.scene;
  scene = scene.merge({
    selectedLayer: layerID,
    layers: scene.layers.set(layerID, layer)
  });

  return state.merge({
    scene: scene,
    sceneHistory: history.historyPush(state.sceneHistory, scene)
  });
}

function selectLayer(state, layerID) {
  var scene = state.scene;
  scene = scene.merge({
    selectedLayer: layerID,
    layers: scene.layers.map(function (layer) {
      return LayerOperations.unselectAll(layer);
    })
  });

  return state.merge({
    scene: scene,
    sceneHistory: history.historyPush(state.sceneHistory, scene)
  });
}

function setLayerProperties(state, layerID, properties) {
  var scene = state.scene;

  var layers = scene.layers.mergeIn([layerID], properties);
  layers = layers.sort(function (layerA, layerB) {
    return layerA.altitude !== layerB.altitude ? layerB.altitude - layerA.altitude : layerA.order - layerB.order;
  });

  scene = scene.set('layers', layers);

  return state.merge({
    scene: scene,
    sceneHistory: history.historyPush(state.sceneHistory, scene)
  });
}

function removeLayer(state, layerID) {
  var scene = state.scene;
  var layers = scene.layers.delete(layerID);

  if (layers.isEmpty()) {
    scene = new Scene();
  } else {
    scene = scene.merge({
      selectedLayer: scene.selectedLayer !== layerID ? scene.selectedLayer : layers.first().id,
      layers: layers
    });
  }

  return state.merge({
    scene: scene,
    sceneHistory: history.historyPush(state.sceneHistory, scene)
  });
}