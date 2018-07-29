var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import React from 'react';
import Button from './button';
import * as SharedStyle from '../../shared-style';

var STYLE = {
  borderColor: "#415375",
  backgroundColor: "#9799ac",
  color: SharedStyle.COLORS.white,
  padding: '5px 15px 8px 15px'
};

var STYLE_HOVER = {
  fontSize: 15,
  borderColor: "#1f3149",
  backgroundColor: "#787a8e",
  color: SharedStyle.COLORS.white
};

export default function FormSubmitButton(_ref) {
  var children = _ref.children,
      rest = _objectWithoutProperties(_ref, ['children']);

  return React.createElement(
    Button,
    _extends({ type: 'submit', style: STYLE, styleHover: STYLE_HOVER }, rest),
    children
  );
}