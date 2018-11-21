import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import AccountBalance from '@material-ui/icons/AccountBalance';
import Room from '@material-ui/icons/Room';
import Layers from '@material-ui/icons/Layers';
import LocalOffer from '@material-ui/icons/LocalOffer';
import LocalMall from '@material-ui/icons/LocalMall';
import ZoomOutMap from '@material-ui/icons/ZoomOutMap';
import Style from '@material-ui/icons/Style';
import Book from '@material-ui/icons/Book';
import EuroSymbol from '@material-ui/icons/EuroSymbol';
import QueryBuilder from '@material-ui/icons/QueryBuilder';
import Visibility from '@material-ui/icons/Visibility';
import WorkOutline from '@material-ui/icons/WorkOutline';
import ContactPhone from '@material-ui/icons/ContactPhone';
import Settings from '@material-ui/icons/Settings';
import Assessment from '@material-ui/icons/Assessment';
import Send from '@material-ui/icons/Send';
import FileCopy from '@material-ui/icons/FileCopy';

import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';

const buttonStyle = {
  margin: 10,
};

const styles = theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(18),
    fontWeight: theme.typography.fontWeightRegular,
  },
  descriptions: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  }
});

function SimpleExpansionPanel(props) {
  const {classes} = props;


  let first = Object.keys(props.additionalDataDictionary)[0];
  if (first == null) return null;

  let objectInformation =
    <ExpansionPanel>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
        <Typography className={classes.heading}>Информация по объекту</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <List>

          <ListItem>
            <Avatar><Room/></Avatar>
            <ListItemText secondary="Адрес"
                          primary={first == null ? 'Нет данных' : props.additionalDataDictionary[first].address_object}/>
          </ListItem>
          <ListItem>
            <Avatar><AccountBalance/></Avatar>
            <ListItemText secondary="Корпус"
                          primary={first == null ? 'Нет данных' : props.additionalDataDictionary[first].name_corpus}/>
          </ListItem>
          <ListItem>
            <Avatar><Layers/></Avatar>
            <ListItemText secondary="Этаж"
                          primary={first == null ? 'Нет данных' : props.additionalDataDictionary[first].floor_number}/>
          </ListItem>
        </List>
      </ExpansionPanelDetails>
    </ExpansionPanel>

  let room;
  if (props.selectedObject == null || props.selectedObject.prototype != 'areas') {
    room =
      <ExpansionPanel disabled>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
          <Typography className={classes.heading}>Помещение</Typography>
        </ExpansionPanelSummary>
      </ExpansionPanel>
  }
  else {
    let additionalData = props.additionalDataDictionary[props.selectedObject.id];
    room =
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
          <Typography className={classes.heading}>Помещение</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <List>
            <ListItem>
              <Avatar><LocalOffer/></Avatar>
              <ListItemText secondary="Название помещения"
                            primary={first == null || props.additionalDataDictionary[first].name_room == null ? 'Нет данных' : props.additionalDataDictionary[first].name_room}/>
            </ListItem>
            <ListItem>
              <Avatar><LocalMall/></Avatar>
              <ListItemText secondary="Тип помещения" primary={first == null ? 'Нет данных' : additionalData.typeroom}/>
            </ListItem>
            <ListItem>
              <Avatar><Style/></Avatar>
              <ListItemText secondary="Статус" primary={first == null ? 'Нет данных' : additionalData.stateroom}/>
            </ListItem>
            <ListItem>
              <Avatar><ZoomOutMap/></Avatar>
              <ListItemText secondary="Площадь" primary={first == null ? 'Нет данных' : additionalData.square}/>
            </ListItem>
            <ListItem>
              <Avatar><Book/></Avatar>
              <ListItemText secondary="Арендная ставка"
                            primary={first == null ? 'Нет данных' : additionalData.arenda_only_square + ' р/кв. м.'}/>
            </ListItem>
            <ListItem>
              <Avatar><EuroSymbol/></Avatar>
              <ListItemText secondary="Сумма аренды"
                            primary={first == null ? 'Нет данных' : Number(additionalData.square) * Number(additionalData.arenda_only_square)}/>
            </ListItem>
          </List>
        </ExpansionPanelDetails>
      </ExpansionPanel>
  }

  let renter;
  if (props.selectedObject == null || props.selectedObject.prototype != 'areas') {
    renter =
      <ExpansionPanel disabled>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
          <Typography className={classes.heading}>Арендатор</Typography>
        </ExpansionPanelSummary>
      </ExpansionPanel>
  }
  else {
    let additionalData = props.additionalDataDictionary[props.selectedObject.id];
    if (additionalData.status) {
      renter =
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
            <Typography className={classes.heading}>Арендатор</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <List>
              <ListItem>
                <Avatar><QueryBuilder/></Avatar>
                <ListItemText secondary="Срок договора"
                              primary={first == null ? 'Нет данных' : 'срок до ' + additionalData.srok_dogovora}/>
              </ListItem>
              <ListItem>
                <Avatar><WorkOutline/></Avatar>
                <ListItemText secondary="Бренд" primary={first == null ? 'Нет данных' : additionalData.brand}/>
              </ListItem>
              <ListItem>
                <Avatar><Visibility/></Avatar>
                <ListItemText secondary="Вид деятельности"
                              primary={first == null ? 'Нет данных' : additionalData.deyatelnost}/>
              </ListItem>
              <ListItem>
                <Avatar><ContactPhone/></Avatar>
                <ListItemText secondary="Контакты"
                              primary={first == null ? 'Нет данных' : additionalData.name_contact1 + '  -  ' + additionalData.phone_contact1}/>
              </ListItem>
            </List>
          </ExpansionPanelDetails>
        </ExpansionPanel>
    }
    else {
      renter =
        <ExpansionPanel disabled>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
            <Typography className={classes.heading}>Арендатор</Typography>
          </ExpansionPanelSummary>
        </ExpansionPanel>
    }

  }

  let urls;
  if (props.selectedObject == null || props.selectedObject.prototype != 'areas') {
    urls = <div>

    </div>

  }
  else {
    const searchParams = new URLSearchParams(location.search);
    let id = {curlid: searchParams.get('curlid') || ''};
    let path = {domen: searchParams.get('domen') || ''};
    let redirectUrlForEditRoom = path.domen + "/edit_room/?curlid=" + id.curlid + "&id_room=" + props.selectedObject.id + "";
    let redirectUrlForSeeRoom = path.domen + "/room_admin/?curlid=" + id.curlid + "&id_room=" + props.selectedObject.id + "";
    urls =
      <div>
        <Tooltip title={'Редактирование помещения'}>
          <a href={redirectUrlForEditRoom} target="_blank">
            <Button style={buttonStyle} variant="fab" color="primary" className={classes.button}>
              <Settings/>
            </Button>
          </a>
        </Tooltip>
        <Tooltip title={'Просмотр помещения'}>
          <a href={redirectUrlForSeeRoom} target="_blank">
            <Button style={buttonStyle} variant="fab" color="primary" className={classes.button}>
              <Assessment/>
            </Button>
          </a>
        </Tooltip>
        <Tooltip title={'Отправить презентацию'}>
          <Button style={buttonStyle} disabled variant="fab" color="primary" className={classes.button}>
            <Send/>
          </Button>
        </Tooltip>
        <Tooltip title={'Копировать ссылку'}>
          <Button style={buttonStyle} disabled variant="fab" color="primary" className={classes.button}>
            <FileCopy/>
          </Button>
        </Tooltip>
      </div>
  }


  return (
    <div style={{overflow: 'auto'}} className={classes.root}>
      {objectInformation}
      {room}
      {renter}
      {urls}
    </div>
  );
}

SimpleExpansionPanel.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleExpansionPanel);
