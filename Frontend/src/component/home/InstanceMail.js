
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {sendInstanceEmail} from '../../store/actions/TaskAction'
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
  

export default function InstanceMail({onOpen, handleOpenInstantMail}) {
  const [open, setOpen] = React.useState(onOpen);
  const userInfo = useSelector(state => state.auth.loggedInUserInfo)
  const instantmailSuccess = useSelector(state => state.email.sendInstantMail)
  const error = useSelector(state => state.email.Error)
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
    handleOpenInstantMail()
  };

  const [registrationInfo, setRegistrationInfo] = useState({
    subject:'',
    body:'',
    recipient:'',

  
  })

  const HandleInput = (e) =>{
    setRegistrationInfo(prevState =>({
      ...prevState,
      [e.target.name]:e.target.value
    }))
  }
  const HandleSubmit = (e) =>{
    e.preventDefault()
    let creator = userInfo.id
    const {subject, body, recipient,} = registrationInfo
    console.log(subject, body, recipient);
    let formData = new FormData();
    formData.append("creator", creator)
    formData.append("subject", subject)
    formData.append("body", body)
    formData.append("recipient", recipient)
    dispatch(sendInstanceEmail(formData, config))
    
  }

{instantmailSuccess && closeDialog() }

async function closeDialog (){
  
  await new Promise((resolve) => setTimeout(() => { 
    handleClose()
   
  
  }, 4000))
}
console.log(instantmailSuccess,'instant mail again');

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
        {error &&  error.status && <span  style={{color:'red', fontSize:20}}>ERROR: {error.status}, Fill up the blank field</span>}
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
            onChange={e=> HandleInput(e)}
          />
          {/* {registrationError &&  registrationError.email && <span style={{color:'red'}}>{registrationError.email}</span>} */}
        
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="body"
            label="body"
            type="body"
            id="body"
            onChange={e=> HandleInput(e)}
          />
          {/* {registrationError &&  registrationError.username && <span style={{color:'red'}}>{registrationError.username}</span>} */}
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
            onChange={e=> HandleInput(e)}
          />
          <p >Please user <span style={{color:'red'}}> "," </span> to separate multiples email</p>
          {/* {registrationError &&  registrationError.password1 && <span style={{color:'red'}}>{registrationError.password1}</span>} */}

          {/* {registrationError &&  registrationError.password2 && <span style={{color:'red'}}>{registrationError.password2}</span>}<br/> */}
         
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={HandleSubmit}
          >
            Send instance Mail
          </Button>
          
        </form>
      </div>


      
    </Container>
    </div>
        </DialogContent>   
      </Dialog>
     {instantmailSuccess && <SnackBer  open={true} success_info='instant'/>}
    </div>
  );
}