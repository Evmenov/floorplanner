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
import AddCircle from '@material-ui/icons/AddCircleOutline';

let isConnectionAvability = true;
let additionalData;

const styles = {
    card: {
    width: 400,
      border: '1px solid #32394f',
   // minHeight: 275,
    position:'absolute',

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

let headerTextStyle ={
  color: '#000000',
  padding: '0px 0px 0px 30px',
  margin: '0px',
};
let contentTextStyle ={
};

const url = 'http://rentservice.getwider.com/roomget/';



function SimpleCard(props) {
  const { classes } = props;

  let positionStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    visibility: 'hidden',
  };

   if(props.selectedObject == null){
     positionStyle.visibility = 'hidden';
     return null;
   }
   else if(props.selectedObject.prototype == 'areas'){
     positionStyle.left = props.x;
     positionStyle.top = props.y;

     var request = new Request(url, {
       method: 'POST',
       headers: {
         'Content-Type': 'text/plain;charset=UTF-8',
       },
       body: JSON.stringify({
         curlid: props.selectedObject.id,
       }),
     });

     if(additionalData == null && isConnectionAvability || additionalData.curlid != props.selectedObject.id && isConnectionAvability){

     fetch(request)
       .then(function(response) {
         if (response.status !== 200) {
          isConnectionAvability = false;
           console.log('Room info: there was a problem. Status code: ' +
             response.status);
           return;
         }

         response.json().then(function(data) {
           additionalData = data;
         });
       });
     }

     positionStyle.visibility = 'visible';
}
   else{
     positionStyle.visibility = 'hidden';
     return null;
   }

   if(additionalData == null) return null;

   let body;
  if(props.selectedObject != null){
    let cardStyle = {
      border: '1px solid #32394f',
      width: 250,
      height: 90
    };

    if(additionalData.status) {
      body = <Card className={classes.card} style={styles}>

        <CardContent style={cardStyle}>
          <Typography className={classes.title}>
            {additionalData.typeroom}
          </Typography>
          <Typography component="h3">
            {additionalData.goodroom}
          </Typography>
        </CardContent>
        <CardContent style={{
          width: 150,
          height: 90,
          left: 250,
          right: 0,
          border: '1px solid #32394f',
          top: 0,
          position: 'absolute',
          background: '#9283d4'
        }}>
          <Typography className={classes.title}>
            72 кв\м
          </Typography>
        </CardContent>

        <CardContent style={cardStyle}>
          <Typography className={classes.title}>
            {additionalData.title}
          </Typography>
          <Typography component="h3">
            {additionalData.deyatelnost}
          </Typography>
        </CardContent>
        <CardContent style={{
          width: 150,
          height: 90,
          left: 250,
          right: 0,
          border: '1px solid #32394f',
          top: 90,
          position: 'absolute',
          background: '#fad36c'
        }}>
          <Typography className={classes.title}>
            446 400 р.
          </Typography>
          <Typography component="h3">
            1 200 р/кв. м.
          </Typography>
        </CardContent>

        <CardContent style={{
          border: '1px solid #32394f',
        }}>
          <Typography component="h3">
            {additionalData.fullname}
          </Typography>
          <Typography component="h3">
            срок до {additionalData.srok_dogovora}
          </Typography>
          <Typography component="h3">
            контакт: {additionalData.name_contact1} {additionalData.phone_contact1}
          </Typography>
        </CardContent>

      </Card>
    }
    else {
      const searchParams = new URLSearchParams(location.search);
      let id = {curlid: searchParams.get('curlid') || ''};
      //  let redirectUrl = "http://rentservice.getwider.com/edit_room/?curlid={" + id.curlid + "}&id_room={" + props.selectedObject.id + "}";
      let redirectUrl = "http://mail.ru";
      body =  <Card className={classes.card} style={styles}>

        <CardContent style={cardStyle}>
          <Typography  className={classes.title}>
            {additionalData.typeroom}
          </Typography>
          <Typography component="h3">
            {additionalData.goodroom}
          </Typography>
        </CardContent>
        <CardContent style={{
          width: 150,
          height: 90,
          left: 250,
          right:0,
          border: '1px solid #32394f',
          top:0,
          position: 'absolute',
          background:'#9283d4'}}>
          <Typography className={classes.title}>
            72 кв\м
          </Typography>
        </CardContent>

        <CardContent style={cardStyle}>
          <Typography className={classes.title}>
            СВОБОДНО
          </Typography>
          <a href={redirectUrl} style={{
            right: 150,
            top: 140,
            position: "absolute"
          }}>
            <Button>
              <AddCircle/>
            </Button>
          </a>
        </CardContent>
        <CardContent style={{
          width: 150,
          height: 90,
          left: 250,
          right:0,
          border: '1px solid #32394f',
          top:90,
          position: 'absolute',
          background:'#fad36c'}}>
          <Typography className={classes.title}>
            446 400 р.
          </Typography>
          <Typography component="h3">
            1 200 р/кв. м.
          </Typography>
        </CardContent>

        <CardContent style={{
          border: '1px solid #32394f',
        }}>
          <Typography component="h3">
            {additionalData.fullname}
          </Typography>
          <Typography component="h3">
            срок до {additionalData.srok_dogovora}
          </Typography>
          <Typography component="h3">
            контакт: {additionalData.name_contact1} {additionalData.phone_contact1}
          </Typography>
        </CardContent>

      </Card>
    }


  }
  else {

  }

  return (
    <div style={positionStyle}>
      {body}
    </div>
  );
}

SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleCard);
