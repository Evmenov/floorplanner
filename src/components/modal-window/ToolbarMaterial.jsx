import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import PanelElementEditor from '../sidebar/panel-element-editor/panel-element-editor';
import If from '../../utils/react-if';
import areapolygon from "area-polygon";
import Area from "../viewer2d/area";

const styles = {
  card: {
    minWidth: 275,
    position: 'absolute',
    right: 50,
    top: 5,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    marginBottom: 13,
    fontSize: 18,
  },
  pos: {
    marginBottom: 12,
  },
};

const sortButtonsCb = (a, b) => {
  if (a.index === undefined || a.index === null) {
    a.index = Number.MAX_SAFE_INTEGER;
  }

  if (b.index === undefined || b.index === null) {
    b.index = Number.MAX_SAFE_INTEGER;
  }

  return a.index - b.index;
};

const mapButtonsCb = (el, ind) => <If key={ind} condition={el.condition} style={{position: 'relative'}}>{el.dom}</If>;

function SimpleCard(props) {
  const {classes} = props;
  const bull = <span className={classes.bullet}>•</span>;

  if (props.selectedObject == null) {
    //STYLE.visibility = 'hidden';
  }
  else {
  } //STYLE.visibility = 'visible';
  //console.log(props.selectedObject)
  let elements = <PanelElementEditor state={props.state}/>;
  let sorter = [{index: 2, condition: true, dom: elements}];
  sorter = sorter.concat(props.sidebarComponents.map((Component, key) => {
    return Component.prototype ? //if is a react component
      {
        condition: true,
        dom: React.createElement(Component, {state, key})
      } :
      {                           //else is a sortable toolbar button
        index: Component.index,
        condition: Component.condition,
        dom: React.createElement(Component.dom, {state, key})
      };
  }));

  let save = event => {
    if (props.selectedObject != null) {
      props.projectActions.setAreaSquareProperty(props.selectedObject.id, '0');
    }


    //props.projectActions.unselectAll();
    // props.viewer3DActions.selectTool3DView();
    // setTimeout(st, 1);
  };

  function st() {
    props.projectActions.rollback();
  }

  let redirectUrl;
  if (props.selectedObject != null) {
    const searchParams = new URLSearchParams(location.search);
    let id = {curlid: searchParams.get('curlid') || ''};
    redirectUrl = "http://rentservice.getwider.com/edit_room/?curlid={" + id.curlid + "}&id_room={" + props.selectedObject.id + "}"
  }

  let body;
  if (props.selectedObject == null) {
    body = <Card className={classes.card}>
      <CardContent>
        <Typography className={classes.title}>
          {props.translator.t('Settings')}
        </Typography>
        <Typography component="h3">
          Выберите объект для редактирования
        </Typography>
      </CardContent>
    </Card>
  }
  else {
    body = <Card className={classes.card}>
      <CardContent>

        <Typography className={classes.title}>
          {props.translator.t('Settings')}
        </Typography>
        <Typography variant="headline" component="h2">
          {sorter.sort(sortButtonsCb).map(mapButtonsCb)}
        </Typography>

      </CardContent>
      {/*<CardActions>
        <Button onClick={save}>{props.translator.t('Calculate square')}</Button>
         <form  action={redirectUrl}>
          <Button>{props.translator.t('Edit')}</Button>
        </form>
      </CardActions>*/}
    </Card>
  }

  return (
    <div>
      {body}
    </div>
  );
}

SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleCard);
