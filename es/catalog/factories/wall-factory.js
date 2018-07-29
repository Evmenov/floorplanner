import { buildWall, updatedWall } from './wall-factory-3d';
import React from 'react';
import * as SharedStyle from '../../shared-style';
import * as Geometry from '../../utils/geometry';
// const epsilon = 3;
var STYLE_BASE = { stroke: '#010101', strokeWidth: '1px', fill: '#010101' };
var STYLE_SELECTED = { stroke: '#99c3fb', strokeWidth: '5px', fill: SharedStyle.COLORS.black };
var STYLE_TEXT = { textAnchor: 'middle' };
var STYLE_LINE = { stroke: '#99c3fb' };

export default function WallFactory(name, info, textures) {

  var wallElement = {
    name: name,
    prototype: 'lines',
    info: info,
    properties: {
      // height: {
      //   label: 'Height',
      //   type: 'length-measure',
      //   defaultValue: {
      //     length: 300,
      //   }
      // },
      thickness: {
        label: 'Толщина',
        type: 'length-measure',
        defaultValue: {
          length: 3
        }
      }
    },

    render2D: function render2D(element, layer, scene) {
      var _layer$vertices$get = layer.vertices.get(element.vertices.get(0)),
          x1 = _layer$vertices$get.x,
          y1 = _layer$vertices$get.y;

      var _layer$vertices$get2 = layer.vertices.get(element.vertices.get(1)),
          x2 = _layer$vertices$get2.x,
          y2 = _layer$vertices$get2.y;

      var thickness = element.properties.getIn(['thickness', 'length']);
      var epsilon = thickness;

      var length = Geometry.pointsDistance(x1, y1, x2, y2);
      var path = 'M' + 0 + ' ' + -thickness + '  L' + length + ' ' + -thickness + '  L' + length + ' ' + thickness + '  L' + 0 + ' ' + thickness + '  z';
      var length_5 = length / 5;

      return element.selected ? React.createElement(
        'g',
        null,
        React.createElement('path', { d: path, style: element.selected ? STYLE_SELECTED : STYLE_BASE }),
        React.createElement('line', { x1: length_5, y1: -39, x2: length_5, y2: 38, style: STYLE_LINE }),
        React.createElement(
          'text',
          { x: length_5, y: 50, style: STYLE_TEXT },
          'A'
        ),
        ',',
        React.createElement(
          'text',
          { x: length_5, y: -40, style: STYLE_TEXT },
          'B'
        )
      ) : React.createElement('path', { d: path, style: element.selected ? STYLE_SELECTED : STYLE_BASE });
    },

    render3D: function render3D(element, layer, scene) {
      return buildWall(element, layer, scene, textures);
    },

    updateRender3D: function updateRender3D(element, layer, scene, mesh, oldElement, differences, selfDestroy, selfBuild) {
      return updatedWall(element, layer, scene, textures, mesh, oldElement, differences, selfDestroy, selfBuild);
    }

  };

  // if (textures && textures !== {}) {
  //
  //   let textureValues = {
  //     'none': 'None'
  //   };
  //
  //   for (let textureName in textures) {
  //     textureValues[textureName] = textures[textureName].name
  //   }
  //
  //   wallElement.properties.textureA = {
  //     label: 'Covering A',
  //     type: 'enum',
  //     defaultValue: 'none',
  //     values: textureValues
  //   };
  //
  //   wallElement.properties.textureB = {
  //     label: 'Covering B',
  //     type: 'enum',
  //     defaultValue: 'none',
  //     values: textureValues
  //};

  // }

  return wallElement;
}