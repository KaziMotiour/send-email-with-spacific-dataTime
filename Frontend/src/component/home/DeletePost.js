import React,{useState, useEffect} from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'; 
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import Slide from '@material-ui/core/Slide';
import {useHistory} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
// import {VerifyJwtToken} from '../../../../../store/actions/Auth'
// import {DeletePosts} from '../../../../../store/actions/PostCrud'
// import {NotificationCount} from '../../../../../store/actions/Utils'
import SnackBer from './SnackBer'
import {deleteSingleEmail} from '../../store/actions/TaskAction'
import {UPDATE_EMAIL_DELETE_SUCCESS_STATUS} from '../../store/actions/ActionTypes'


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
        title:{
            borderBottom:'2px solid rgb(64, 81, 181)',
            textAlign:'center'

        },
        deletePost:{
            padding:'50px'
        },
        buttons:{
            margin:'auto'
        }
   
  }))

export default function DeletePost({open,  hondleDeleteFormOpen, email, type}) {

    console.log(type, 'hello from delete form');
    const classes = useStyles()
    const history = useHistory()
    const dispatch  = useDispatch()
    const deleteInfo = localStorage.getItem('deleted')
    const [formOpen, setFormOpen] = React.useState(open); 
    const [newImage, setNewImge] = useState(null)
    const [imgData, setImgData] = useState(null);
    const emailDeleteStatus = useSelector(state => state.email.emailDeleteSuccess)

    const config = { headers: { 
      'Content-Type':'application/json',
      'Authorization': "Bearer " + localStorage.getItem('access_token')
      }}

    const handleClose = () => {

        setFormOpen(false);
        localStorage.removeItem('deleted')
        hondleDeleteFormOpen()

    };
    console.log(emailDeleteStatus,'status form deletePost');
    const HandleMailDelete =() =>{
  
        dispatch(deleteSingleEmail(email.id,  config))
        checkAuthenticatin()
        closeDialog()
  }
  
  // UPDATE_EMAIL_DELETE_SUCCESS_STATUS
 
  async function closeDialog (){
    await new Promise((resolve) => setTimeout(() => { 
      handleClose()
    
    }, 2000))
  }
  console.log(emailDeleteStatus,'status form deletePost after');
 
  const checkAuthenticatin =()=>{
    const access_token = localStorage.getItem('access_token')
    if(!access_token){
      history.push({
        pathname: '/login',
        state: { detail: 'session expired, Try to login again' }
      })
    }
  }

 



  return (
    <div className='editPost'>
        <Dialog
            className='sharePostForm'
            open={formOpen}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
        >

        <div className={classes.deletePost}>
            <h3 className={classes.title}>Delete Post</h3>
            <p><b>subject</b>: {email && email.subject}</p>
            <p>You Realy want to delete this email</p>
            

        </div>




      
        

        <DialogActions className={classes.buttons}>
          <Button onClick={handleClose} color="primary" >
            Cancle
          </Button>
          <Button  color="primary" variant="contained" onClick={HandleMailDelete}>
            Delete
          </Button>
          {/* {deleteInfo!==null && <SnackBer open={true} success_info={deleteInfo} />} */}
        </DialogActions>
       
      </Dialog>
      {emailDeleteStatus && <SnackBer  open={true} success_info='delete' type={type}/>}
    </div>
  );
}