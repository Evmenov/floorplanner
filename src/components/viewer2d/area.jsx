import React from 'react';
import PropTypes from 'prop-types';
import polylabel from 'polylabel';
import areapolygon from 'area-polygon';

let types = {
  'Stock': 'Склад',
  'Office': 'Офис',
  'Trading': 'Торговое'
}

  const STYLE_TEXT_TYPE = {
  textAnchor: 'middle',
  fontSize: '20px',
  fontFamily: '"Courier New", Courier, monospace',
  pointerEvents: 'none',
  fontWeight: 'bold',

  //http://stackoverflow.com/questions/826782/how-to-disable-text-selection-highlighting-using-css
  WebkitTouchCallout: 'none', /* iOS Safari */
  WebkitUserSelect: 'none', /* Chrome/Safari/Opera */
  MozUserSelect: 'none', /* Firefox */
  MsUserSelect: 'none', /* Internet Explorer/Edge */
  userSelect: 'none'
};

const STYLE_TEXT = {
  textAnchor: 'middle',
  fontSize: '12px',
  fontFamily: '"Courier New", Courier, monospace',
  pointerEvents: 'none',
  fontWeight: 'bold',

  //http://stackoverflow.com/questions/826782/how-to-disable-text-selection-highlighting-using-css
  WebkitTouchCallout: 'none', /* iOS Safari */
  WebkitUserSelect: 'none', /* Chrome/Safari/Opera */
  MozUserSelect: 'none', /* Firefox */
  MsUserSelect: 'none', /* Internet Explorer/Edge */
  userSelect: 'none'
};

export default function Area({layer, area, catalog}, {projectActions, agents, roomInfo}) {

  let rendered = catalog.getElement(area.type).render2D(area, layer, agents, roomInfo);

  let renderedAreaSize = null;
  let areaType = null;

  //if (area.selected) {
  if (true) {
    let polygon = area.vertices.toArray().map(vertexID => {
      let {x, y} = layer.vertices.get(vertexID);
      return [x, y];
    });

    let polygonWithHoles = polygon;

    area.holes.forEach(holeID => {

      let polygonHole = layer.areas.get(holeID).vertices.toArray().map(vertexID => {
        let {x, y} = layer.vertices.get(vertexID);
        return [x, y];
      });

      polygonWithHoles = polygonWithHoles.concat(polygonHole.reverse());
    });

    let center = polylabel([polygonWithHoles], 1.0);
    let areaSize = areapolygon(polygon, false);

    //subtract holes area
    area.holes.forEach(areaID => {
      let hole = layer.areas.get(areaID);
      let holePolygon = hole.vertices.toArray().map(vertexID => {
        let {x, y} = layer.vertices.get(vertexID);
        return [x, y];
      });
      areaSize -= areapolygon(holePolygon, false);
    });

    if (roomInfo[area.id] != null) {
      let type;
      if(roomInfo[area.id].typeroom == area.properties.get('type')){
        type = roomInfo[area.id].typeroom;
      }
      else {
        type = types[area.properties.get('type')];
      }
      areaType = (
        <text x="0" y="-20" transform={`translate(${center[0]} ${center[1]}) scale(1, -1)`} style={STYLE_TEXT_TYPE}>
          {type}
        </text>
      )
    }

    renderedAreaSize = (
      <text x="0" y="0" transform={`translate(${center[0]} ${center[1]}) scale(1, -1)`} style={STYLE_TEXT}>
        {((areaSize) / 10000).toFixed(2)} m{String.fromCharCode(0xb2)}
      </text>
    )

    let square = renderedAreaSize.props.children[0] + renderedAreaSize.props.children[1] + renderedAreaSize.props.children[2];
    //let rendered = catalog.getElement(area.type).render2D(area, layer, agents);
    if (area.properties.get('square') != square) {
      projectActions.setAreaSquareProperty(area.id, square);
    }

  }

  return (
    <g
      data-element-root
      data-prototype={area.prototype}
      data-id={area.id}
      data-selected={area.selected}
      data-layer={layer.id}
    >
      {rendered}
      {areaType}
      {renderedAreaSize}
    </g>
  )

}

Area.propTypes = {
  area: PropTypes.object.isRequired,
  layer: PropTypes.object.isRequired,
  catalog: PropTypes.object.isRequired
};

Area.contextTypes = {
  projectActions: PropTypes.object.isRequired,
  agents: PropTypes.array.isRequired,
  roomInfo: PropTypes.object.isRequired
}
