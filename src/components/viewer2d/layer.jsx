import React from 'react';
import PropTypes from 'prop-types';
import Line from './line';
import Area from './area';
import Vertex from './vertex';
import Item from './item';

export default function Layer({layer, scene, catalog}) {
  let {unit} = scene;
  let {lines, areas, vertices, holes, id: layerID, items, opacity} = layer;
  return (
    <g opacity={opacity}>
      {areas.entrySeq().map(([areaID, area]) => <Area key={areaID} layer={layer} area={area}
                                                      unit={unit} catalog={catalog}/>)}
      {lines.entrySeq().map(([lineID, line]) => <Line key={lineID} layer={layer} line={line}
                                                      scene={scene} catalog={catalog}/>)}
      {items.entrySeq().map(([itemID, item]) => <Item key={itemID} layer={layer} item={item}
                                                      scene={scene} catalog={catalog}/>)}
      {vertices.entrySeq()
        .filter(([vertexID, vertex]) => vertex.selected)
        .map(([vertexID, vertex]) => <Vertex key={vertexID} layer={layer} vertex={vertex} />)}
    </g>
  );

}

Layer.propTypes = {
  layer: PropTypes.object.isRequired,
  scene: PropTypes.object.isRequired,
  catalog: PropTypes.object.isRequired,
};

