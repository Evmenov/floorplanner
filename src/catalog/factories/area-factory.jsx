import { createArea, updatedArea } from './area-factory-3d';
import React from 'react';

export default function AreaFactory (name, info, textures) {


  let areaElement = {
    name,
    prototype: 'areas',
    info: {
      ...info,
      visibility: {
        catalog: false,
        layerElementsVisible: false
      }
    },
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
          length: 0,
        }
      },
      agent:{
        label:'Текущий агент',
        type:'enum',
        defaultValue: 'none',


      }
    },

    render2D: function (element, layer, agents, scene) {

      let agentsValues = {
        'none': 'None'
      };

      for (let agentName in agents) {
        agentsValues[agentName] = agents[agentName].name +' ' + agents[agentName].surname
      }

      areaElement.properties.agent = {
        label: 'Текущий агент',
        type: 'enum',
        defaultValue: 'none',
        values: agentsValues
      };

//console.log(element.properties.getIn(['agent']).name)
console.log("пытался вывести имя агента класс ареа и фактори")
      let path = '';
      ///print area path
      element.vertices.forEach((vertexID, ind) => {
        let vertex = layer.vertices.get(vertexID);
        path += ( ind ? 'L' : 'M' ) + vertex.x + ' ' + vertex.y + ' ';
      });

      //add holes
      element.holes.forEach(areaID => {
        let area = layer.areas.get( areaID );

        area.vertices.reverse().forEach((vertexID, ind) => {
          let vertex = layer.vertices.get(vertexID);
          path += ( ind ? 'L' : 'M' ) + vertex.x + ' ' + vertex.y + ' ';
        });

      });

      let fill = element.selected ? '#99c3fb' : element.properties.get('patternColor');

      return (<path d={path} fill={fill}/>);
    },

    render3D: function (element, layer, scene) {
      return createArea(element, layer, scene, textures)
    },

    updateRender3D: (element, layer, scene, mesh, oldElement, differences, selfDestroy, selfBuild) => {
      return updatedArea(element, layer, scene, textures, mesh, oldElement, differences, selfDestroy, selfBuild);
    }

  };

  if (textures && textures !== {}) {

    let textureValues = {
      'none': 'None'
    };

    for (let textureName in textures) {
      textureValues[textureName] = textures[textureName].name
    }

    areaElement.properties.texture = {
      label: 'Floor',
      type: 'enum',
      defaultValue: 'none',
      values: textureValues
    };



  }

  return areaElement

}

