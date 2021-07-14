

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
import {updateSingleEmail} from '../../store/actions/TaskAction'
import {UPDATE_EMAIL_UPDATE_SUCCESS_STATUS} from '../../store/actions/ActionTypes'
import SnackBer from './SnackBer'


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
  

export default function EditEmail({onOpen, hondleEditFormOpen, email}) {
  
  const dispatch = useDispatch()
  const [open, setOpen] = React.useState(onOpen);
  const userInfo = useSelector(state => state.auth.loggedInUserInfo)
  const emailUpdateSuccessStatus = useSelector(state => state.email.emailUpdateSuccess)
  const error = useSelector(state => state.email.Error)
  const classes = useStyles()

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

  const [emailInfo, setEmailInfo] = useState({
    subject:email ? email.subject : '',
    body:email ? email.body : '',
    recipient:email ? email.recipient : '',
    setTimer: email ? email.setTimer : ''
  
  })

  const HandleInput = (e) =>{
    setEmailInfo(prevState =>({
      ...prevState,
      [e.target.name]:e.target.value
    }))
  }



  const HandleSubmit = (e) =>{
    e.preventDefault()
    const {subject, body, recipient, setTimer} = emailInfo
    console.log(subject, body, recipient);
    console.log(email.creator, subject, body, recipient, setTimer, 'email info');
    let formData = new FormData();
    formData.append("creator", email.creator.id)
    formData.append("subject", subject)
    formData.append("body", body)
    formData.append("recipient", recipient)
    formData.append("setTimer", setTimer)
    console.log(email.creator, subject, body, recipient, setTimer, 'email info');
    dispatch(updateSingleEmail(email.id, formData, config))
    

  }

  {emailUpdateSuccessStatus && closeDialog()}
  async function closeDialog (){
  
    await new Promise((resolve) => setTimeout(() => { 
      handleClose()
      
    
    }, 2000))
  }


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
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Send Instant mail
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="subject"
            label="subject"
            name="subject"
            autoComplete="subject"
            autoFocus
            value={emailInfo.subject}
            onChange={e=> HandleInput(e)}
          />
          {error &&  error.subject && <span style={{color:'red'}}>{ error.subject}</span>}
        
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="body"
            label="body"
            type="body"
            value={emailInfo.body}
            id="body"
            onChange={e=> HandleInput(e)}
          />
         {error &&  error.body && <span style={{color:'red'}}>{ error.subject}</span>}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="recipient"
            label="recipient"
            type="recipient"
            id="recipient"
            autoComplete="current-password"
            value={emailInfo.recipient}
            onChange={e=> HandleInput(e)}
          />
          <p >Please user <span style={{color:'red'}}> "," </span> to separate multiples email</p>
          {error &&  error.recipient && <span style={{color:'red'}}>{ error.recipient}</span>}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="setTimer"
            label="setTimer"
            type="setTimer"
            id="setTimer"
            autoComplete="current-password"
            value={emailInfo.setTimer}
            onChange={e=> HandleInput(e)}
          />
         {error &&  error.setTimer && <span style={{color:'red'}}>{ error.setTimer}</span>}
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={HandleSubmit}
          >
            Confirm Edit
          </Button>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
            onClick={handleClose}
          >
            Cancle
          </Button>
          
        </form>
      </div>


      
    </Container>
    </div>
        </DialogContent>   
      </Dialog>
      {emailUpdateSuccessStatus && <SnackBer  open={true} success_info='update'/>}
    </div>
  );
}