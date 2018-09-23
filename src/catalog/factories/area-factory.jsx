import { createArea, updatedArea } from './area-factory-3d';
import React from 'react';

let isConnectionAvability = true;

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
      square:{
        label:'Площадь',
        type: 'string',
        defaultValue: '0'
      },
      type:{
        label:'Тип помещения',
        type:'enum',
        defaultValue: 'none',

      },
      avability:{
        label:'Пригодность',
        type:'enum',
        defaultValue: 'none',
      },
      condition:{
        label:'Состояние',
        type:'enum',
        defaultValue: 'none',
      },
    },



    render2D: function (element, layer, agents, square, scene) {

    let url = 'http://rentservice.getwider.com/roomget/';

    let additionalData;

      let types = {
        'Stock' : 'Склад',
        'Office' : 'Офис',
        'Trading' : 'Торговое'
      };
      areaElement.properties.type = {
        label:'Тип помещения',
        type:'enum',
        defaultValue: 'none',
        values: types,
      };

      let avabilitys = {
        'Usefull' : 'Полезное',
        'Technical' : 'Техническое',
        'Common' : 'Общего пользования',
        'Potential' : 'Потенциальное',
      };
      areaElement.properties.avability = {
        label:'Пригодность',
        type:'enum',
        defaultValue: 'none',
        values: avabilitys,
      };

      let conditions = {
        'Unsuitable' : 'Непригодное',
        'Finite' : 'Чистовая',
        'NeedsRepair' : 'Требует ремонта'
      };
      areaElement.properties.condition = {
        label:'Состояние',
        type:'enum',
        defaultValue: 'none',
        values: conditions,
      };

      if(square != null){
        element.properties.square = {
          label:'Площадь',
          type: 'string',
          defaultValue: 'ue',
          values: square
        };
      }

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

           var request = new Request(url, {
       method: 'POST',
       headers: {
         'Content-Type': 'text/plain;charset=UTF-8',
       },
       body: JSON.stringify({
         curlid: element.id,
       }),
     });

      if(additionalData == null && isConnectionAvability){
       fetch(request)
         .then(function(response) {
           if (response.status !== 200) {
            isConnectionAvability = false;
             console.log('There was a problem. Status code: ' +
               response.status);
             return;
           }

           response.json().then(function(data) {
             additionalData = data;
           });
         });
      }

      let fill;
      if(additionalData != null)
      {
        if(additionalData.status) fill = '#ff7990';
        else {
          if(element.properties.get('condition') == "NeedsRepair") fill = '#828cf6';
         else{
            if(element.properties.get('avability') == "Technical") fill = '#b5b5b5';
            else {
              if(element.properties.get('avability') == "Common") fill = '#ededed';
              else {
                if(element.properties.get('avability') == "Usefull") fill = '#71ff3f';
                else fill = '#f5f4f4';
              }
           }
         }
       }
      }
      else fill = '#71ff3f';
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

