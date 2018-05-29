var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import { createArea, updatedArea } from './area-factory-3d';
import React from 'react';

export default function AreaFactory(name, info, textures) {

  var areaElement = {
    name: name,
    prototype: 'areas',
    info: _extends({}, info, {
      visibility: {
        catalog: false,
        layerElementsVisible: false
      }
    }),
    properties: {
      patternColor: {
        label: 'Color',
        type: 'color',
        defaultValue: '#f5f4f4'
      },
      thickness: {
        label: 'Thickness',
        type: 'length-measure',
        defaultValue: {
          length: 0
        }
      },
      agent: {
        label: 'Текущий агент',
        type: 'enum',
        defaultValue: 'none'

      }
    },

    render2D: function render2D(element, layer, agents, scene) {

      var agentsValues = {
        'none': 'None'
      };

      for (var agentName in agents) {
        agentsValues[agentName] = agents[agentName].name + ' ' + agents[agentName].surname;
      }

      areaElement.properties.agent = {
        label: 'Текущий агент',
        type: 'enum',
        defaultValue: 'none',
        values: agentsValues
      };

      var path = '';
      ///print area path
      element.vertices.forEach(function (vertexID, ind) {
        var vertex = layer.vertices.get(vertexID);
        path += (ind ? 'L' : 'M') + vertex.x + ' ' + vertex.y + ' ';
      });

      //add holes
      element.holes.forEach(function (areaID) {
        var area = layer.areas.get(areaID);

        area.vertices.reverse().forEach(function (vertexID, ind) {
          var vertex = layer.vertices.get(vertexID);
          path += (ind ? 'L' : 'M') + vertex.x + ' ' + vertex.y + ' ';
        });
      });

      var fill = element.selected ? '#99c3fb' : element.properties.get('patternColor');

      return React.createElement('path', { d: path, fill: fill });
    },

    render3D: function render3D(element, layer, scene) {
      return createArea(element, layer, scene, textures);
    },

    updateRender3D: function updateRender3D(element, layer, scene, mesh, oldElement, differences, selfDestroy, selfBuild) {
      return updatedArea(element, layer, scene, textures, mesh, oldElement, differences, selfDestroy, selfBuild);
    }

  };

  if (textures && textures !== {}) {

    var textureValues = {
      'none': 'None'
    };

    for (var textureName in textures) {
      textureValues[textureName] = textures[textureName].name;
    }

    areaElement.properties.texture = {
      label: 'Floor',
      type: 'enum',
      defaultValue: 'none',
      values: textureValues
    };
  }

  return areaElement;
}