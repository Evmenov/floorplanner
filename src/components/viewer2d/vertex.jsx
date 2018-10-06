import React from 'react';
import PropTypes from 'prop-types';
import * as SharedStyle from '../../shared-style';

const STYLE = {fill: "#006dfd", strokeWidth: 0, stroke: SharedStyle.COLORS.black, cursor: "move"};

export default function Vertex({vertex, layer}, {isAdminMode}) {
  let {x, y} = vertex;
  let circle;
  if (isAdminMode) {
    circle = (
      <circle cx="0" cy="0" r="7" style={STYLE}/>
    )
  }
  else circle = null;

  return (
    <g
      transform={`translate(${x}, ${y})`}
      data-element-root
      data-prototype={vertex.prototype}
      data-id={vertex.id}
      data-selected={vertex.selected}
      data-layer={layer.id}
    >
      {circle}
    </g>
  );
}

Vertex.propTypes = {
  vertex: PropTypes.object.isRequired,
  layer: PropTypes.object.isRequired,
};

Vertex.contextTypes = {
  isAdminMode: PropTypes.object.isRequired,
};
