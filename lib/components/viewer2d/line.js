'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Line;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _geometry = require('../../utils/geometry');

var _ruler = require('./ruler');

var _ruler2 = _interopRequireDefault(_ruler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Line(_ref) {
  var line = _ref.line,
      layer = _ref.layer,
      scene = _ref.scene,
      catalog = _ref.catalog;


  var vertex0 = layer.vertices.get(line.vertices.get(0));
  var vertex1 = layer.vertices.get(line.vertices.get(1));

  if (vertex0.id === vertex1.id) return null; //avoid 0-length lines
  if (vertex0.x === vertex1.x && vertex0.y === vertex1.y) return null;

  var x1 = vertex0.x,
      y1 = vertex0.y;
  var x2 = vertex1.x,
      y2 = vertex1.y;


  if (x1 > x2) {
    x1 = vertex1.x;
    y1 = vertex1.y;
    x2 = vertex0.x;
    y2 = vertex0.y;
  }

  var length = (0, _geometry.pointsDistance)(x1, y1, x2, y2);
  var angle = (0, _geometry.angleBetweenTwoPointsAndOrigin)(x1, y1, x2, y2);

  var renderedHoles = line.holes.map(function (holeID) {
    var hole = layer.holes.get(holeID);
    var startAt = length * hole.offset;
    var renderedHole = catalog.getElement(hole.type).render2D(hole, layer, scene);

    return _react2.default.createElement(
      'g',
      {
        key: holeID,
        transform: 'translate(' + startAt + ', 0)',
        'data-element-root': true,
        'data-prototype': hole.prototype,
        'data-id': hole.id,
        'data-selected': hole.selected,
        'data-layer': layer.id
      },
      ' ',
      renderedHole,
      ' '
    );
  });

  var unit = scene.unit;


  var renderedLine = catalog.getElement(line.type).render2D(line, layer);

  var renderedRuler = line.selected ? _react2.default.createElement(_ruler2.default, { unit: unit, length: length, transform: 'translate(0, 15)' }) : null;

  return _react2.default.createElement(
    'g',
    {
      transform: 'translate(' + x1 + ', ' + y1 + ') rotate(' + angle + ', 0, 0)',
      'data-element-root': true,
      'data-prototype': line.prototype,
      'data-id': line.id,
      'data-selected': line.selected,
      'data-layer': layer.id,
      style: line.selected ? { cursor: "move" } : {}
    },
    renderedRuler,
    renderedLine,
    renderedHoles
  );
}

Line.propTypes = {
  line: _propTypes2.default.object.isRequired,
  layer: _propTypes2.default.object.isRequired,
  scene: _propTypes2.default.object.isRequired,
  catalog: _propTypes2.default.object.isRequired
};