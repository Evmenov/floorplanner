import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import PanelElementEditor from '../sidebar/panel-element-editor/panel-element-editor';
import If from '../../utils/react-if';

var styles = {
  card: {
    minWidth: 275,
    position: 'absolute',
    right: 50,
    top: 5
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)'
  },
  title: {
    marginBottom: 13,
    fontSize: 18
  },
  pos: {
    marginBottom: 12
  }
};

var sortButtonsCb = function sortButtonsCb(a, b) {
  if (a.index === undefined || a.index === null) {
    a.index = Number.MAX_SAFE_INTEGER;
  }

  if (b.index === undefined || b.index === null) {
    b.index = Number.MAX_SAFE_INTEGER;
  }

  return a.index - b.index;
};

var mapButtonsCb = function mapButtonsCb(el, ind) {
  return React.createElement(
    If,
    { key: ind, condition: el.condition, style: { position: 'relative' } },
    el.dom
  );
};

function SimpleCard(props) {
  var classes = props.classes;

  var bull = React.createElement(
    'span',
    { className: classes.bullet },
    '\u2022'
  );

  if (props.selectedObject == null) {
    //STYLE.visibility = 'hidden';
  } else {} //STYLE.visibility = 'visible';

  var elements = React.createElement(PanelElementEditor, { state: props.state });
  var sorter = [{ index: 2, condition: true, dom: elements }];
  sorter = sorter.concat(props.sidebarComponents.map(function (Component, key) {
    return Component.prototype ? //if is a react component
    {
      condition: true,
      dom: React.createElement(Component, { state: state, key: key })
    } : { //else is a sortable toolbar button
      index: Component.index,
      condition: Component.condition,
      dom: React.createElement(Component.dom, { state: state, key: key })
    };
  }));

  var save = function save(event) {
    props.viewer3DActions.selectTool3DView();
    setTimeout(st, 1);
  };
  function st() {
    props.projectActions.rollback();
  }

  var redirectUrl = void 0;
  if (props.selectedObject != null) {
    var searchParams = new URLSearchParams(location.search);
    var id = { curlid: searchParams.get('curlid') || '' };
    redirectUrl = "http://rentservice.getwider.com/edit_room/?curlid={" + id.curlid + "}&id_room={" + props.selectedObject.id + "}";
  }

  var body = void 0;
  if (props.selectedObject == null) {
    body = React.createElement(
      Card,
      { className: classes.card },
      React.createElement(
        CardContent,
        null,
        React.createElement(
          Typography,
          { className: classes.title },
          props.translator.t('Settings')
        ),
        React.createElement(
          Typography,
          { component: 'h3' },
          '\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043E\u0431\u044A\u0435\u043A\u0442 \u0434\u043B\u044F \u0440\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u044F'
        )
      )
    );
  } else {
    body = React.createElement(
      Card,
      { className: classes.card },
      React.createElement(
        CardContent,
        null,
        React.createElement(
          Typography,
          { className: classes.title },
          props.translator.t('Settings')
        ),
        React.createElement(
          Typography,
          { variant: 'headline', component: 'h2' },
          sorter.sort(sortButtonsCb).map(mapButtonsCb)
        )
      ),
      React.createElement(
        CardActions,
        null,
        React.createElement(
          Button,
          { onClick: save },
          props.translator.t('Apply changes')
        ),
        React.createElement(
          'form',
          { action: redirectUrl },
          React.createElement(
            Button,
            null,
            props.translator.t('Edit')
          )
        )
      )
    );
  }

  return React.createElement(
    'div',
    null,
    body
  );
}

SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleCard);