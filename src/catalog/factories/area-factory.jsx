import {createArea, updatedArea} from './area-factory-3d';
import React from 'react';

let url = 'http://rentservice.getwider.com/roomget/';

export default function AreaFactory(name, info, textures) {

  let types = {
    'Office': 'Офис',
    'Stock': 'Склад',
    'Trading': 'Торговое'
  };
  let avabilitys = {
    'Usefull': 'Полезное',
    'Technical': 'Техническое',
    'Common': 'Общего пользования',
    'Potential': 'Потенциальное',
  };
  let conditions = {
    'Unsuitable': 'Непригодное',
    'Finite': 'Чистовая',
    'NeedsRepair': 'Требует ремонта'
  };

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
      square: {
        label: 'Площадь',
        type: 'number',
        defaultValue: '0'
      },
      type: {
        label: 'Тип помещения',
        type: 'enum',
        defaultValue: 'Office',
        values: types,

      },
      avability: {
        label: 'Пригодность',
        type: 'enum',
        defaultValue: 'Usefull',
        values: avabilitys,
      },
      condition: {
        label: 'Состояние',
        type: 'enum',
        defaultValue: 'Unsuitable',
        values: conditions,
      },
    },

    render2D: function (element, layer, agents, roomInfo) {

      let path = '';
      ///print area path
      element.vertices.forEach((vertexID, ind) => {
        let vertex = layer.vertices.get(vertexID);
        path += (ind ? 'L' : 'M') + vertex.x + ' ' + vertex.y + ' ';
      });

      //add holes
      element.holes.forEach(areaID => {
        let area = layer.areas.get(areaID);

        area.vertices.reverse().forEach((vertexID, ind) => {
          let vertex = layer.vertices.get(vertexID);
          path += (ind ? 'L' : 'M') + vertex.x + ' ' + vertex.y + ' ';
        });

      });
      // console.log(roomInfo)
      let fill;
      let additionalData = roomInfo[element.id];
      if (!element.selected) {
        if (additionalData != null) {
          if (additionalData.status) fill = '#ff7990';
        }
        if (fill !== '#ff7990') {
          if (element.properties.get('condition') == "NeedsRepair") fill = '#828cf6';
          else {
            if (element.properties.get('avability') == "Technical") fill = '#b5b5b5';
            else {
              if (element.properties.get('avability') == "Common") fill = '#ededed';
              else {
                if (element.properties.get('avability') == "Usefull") fill = '#71ff3f';
                else fill = '#f5f4f4';
              }
            }
          }
        }
      }
      else {
        fill = '#657d53'
      }

      return (<path d={path} fill={fill}/>);
    },

    render3D: function (element, layer, scene) {
      return createArea(element, layer, scene, textures)
    },

    updateRender3D: (element, layer, scene, mesh, oldElement, differences, selfDestroy, selfBuild) => {
      return updatedArea(element, layer, scene, textures, mesh, oldElement, differences, selfDestroy, selfBuild);
    }

  };

  return areaElement

}

