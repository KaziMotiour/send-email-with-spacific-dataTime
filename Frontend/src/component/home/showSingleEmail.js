
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
// import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {Link, useHistory} from 'react-router-dom'
import axios from 'axios'
import MailIcon from '@material-ui/icons/Mail';
import {getSingleEmail} from '../../store/actions/TaskAction'


const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(0),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(0),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(0),
    },
    submit: {
      margin: theme.spacing(0, 0, 1),
    },
  }));
  

export default function ShowSingleEmail({onOpen, hondleEditFormOpen, id}) {
  console.log(id);
    
  const [open, setOpen] = React.useState(onOpen);
  const email = useSelector(state => state.email.getSingleEmail)
  
  const classes = useStyles()
  const dispatch = useDispatch()
  const config = { headers: { 
    'Content-Type':'application/json',
    'Authorization': "Bearer " + localStorage.getItem('access_token')
  }}


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    hondleEditFormOpen()
  };
  useEffect(() => {
     dispatch(getSingleEmail(id, config))   
    
    // dispatch(getSentMailList(config)) 
  }, [])

  console.log(email,' singel email');


  return (
    <div>
      
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
          
        <DialogContent>


        <div  className='form'>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <MailIcon />
        </Avatar>
        <Typography style={{marginBottom:20,}} component="h1" variant="h5">
          Mail Detail
        </Typography>
        <form className={classes.form} noValidate>
          <div style={{marginBottom:15,}}><span style={{fontSize:20, fontWeight:'bold'}}>Subject:</span><span style={{fontSize:20,}}> {email && email.subject} </span></div> 
          {/* {registrationError &&  registrationError.email && <span style={{color:'red'}}>{registrationError.email}</span>} */}

        <div style={{marginBottom:15,}}>
          <span style={{fontSize:18, fontWeight:'bold'}}>Body:</span>
          <span style={{fontSize:14, marginBottom:20,}}> {email && email.body} </span>
          </div>

          <div style={{marginBottom:25,}}>
          <span style={{fontSize:18, fontWeight:'bold'}}>Recipents:</span>
          <span style={{fontSize:14, marginBottom:20,}}> {email && email.recipient} </span>
          </div>

          <div style={{marginBottom:2,}}>
          <span style={{fontSize:12, fontWeight:'bold'}}>Schedule Date:</span>
          <span style={{fontSize:12, marginBottom:20,}}> {email && email.setTimer} </span>
          </div>
          <div style={{marginBottom:10,}}>
          <span style={{fontSize:12, fontWeight:'bold'}}>Submit Date:</span>
          <span style={{fontSize:12, marginBottom:20,}}> {email && email.createDate}  </span>
          </div>

        
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleClose}
          >
            Close
          </Button>
          
        </form>
      </div>


      
    </Container>
    </div>
        </DialogContent>   
      </Dialog>
    </div>
  );
}