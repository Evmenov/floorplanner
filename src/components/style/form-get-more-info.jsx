import React from 'react';
import Button from './button';
import * as SharedStyle from '../../shared-style';

const STYLE = {
  borderColor: "#415375",
  backgroundColor: "#9799ac",
  color: SharedStyle.COLORS.white,
  padding: '5px 15px 8px 15px',
};

const STYLE_HOVER = {
  borderColor: "#1f3149",
  backgroundColor: "#787a8e",
  color: SharedStyle.COLORS.white,
  padding: '5px 15px 8px 15px',
  };

export default function FormGetMoreInfoButton({children, ...rest}) {
  return <Button type="submit" style={STYLE} styleHover={STYLE_HOVER} {...rest}>{children}</Button>
}
