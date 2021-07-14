import React,{useState, useEffect} from 'react';
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, withRouter, NavLink } from "react-router-dom";
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from "@material-ui/core/SnackbarContent";
// import {REMOVE_SUCCESS_PLACED} from '../../store/actions/ActionTypes'
import {SET_SEND_INSTANT_EMAIL, SET_SEND_EMAIL_WITH_TIMER, UPDATE_EMAIL_DELETE_SUCCESS_STATUS, UPDATE_EMAIL_UPDATE_SUCCESS_STATUS} from '../../store/actions/ActionTypes'
import {getSentMailList, getScheduleMailList} from '../../store/actions/TaskAction'


function SnackBer(props) {
  console.log(props.orderPlacedSuccess, 'form snackber');
    const dispatch = useDispatch()
    const history = useHistory()
    const [state, setState] = React.useState({
        snackBerOpen: false,
        vertical: 'top',
        horizontal: 'center',
      });

      const info = props.success_info
      const {horizontal, vertical, snackBerOpen} = state;

      const config = { headers: { 
        'Content-Type':'application/json',
        'Authorization': "Bearer "+localStorage.getItem('access_token')
      }}

      
      useEffect(()=>{
          setState({...state, snackBerOpen:props.open})
      },[])
      let confirmInfo = 'Order hasbeen placed successfully'
      if (props.success_info=='instant'){

        confirmInfo='instant mail has been set'
        closeDialog('ins')
        fetchInstanceMail()

      }else if(props.success_info === 'schedule'){

        confirmInfo="Schedule mail has been set"
        closeDialog('shc')
        fetchSchedulerMail()
      }
      else if(props.success_info === 'delete'){

        confirmInfo="Successfully deleted"
        closeDialog('dic')
        {props.type=='schedule' &&  fetchSchedulerMailDelete()}
        {props.type=='sent' &&  fetchInstanceMailDelete()}
      
        
      }else if(props.success_info === 'update'){

        confirmInfo="Successfully Updated"
        closeDialog('upd')
        fetchSchedulerMailDelete()
      
      
        
      }
     
      
      const handleOpen = () =>{
        setState({ ...state, snackBerOpen: true });
      }

      async function closeDialog (dis){
        await new Promise((resolve) => setTimeout(() => { 
            setState({ ...state, snackBerOpen: false });  
            dis === 'ins' && dispatch({
              type:SET_SEND_INSTANT_EMAIL
              
            }) 
            dis === 'shc' && dispatch({
              type:SET_SEND_EMAIL_WITH_TIMER
              
            }) 
            dis === 'dic' && dispatch({
              type:UPDATE_EMAIL_DELETE_SUCCESS_STATUS
              
            })  
            dis === 'upd' && dispatch({
              type:UPDATE_EMAIL_DELETE_SUCCESS_STATUS
              
            })  
            
        }, 2000))
      }



      async function fetchInstanceMail (){
        await new Promise((resolve) => setTimeout(() => { 
  
             dispatch(getSentMailList(config))  
            
        }, 9000))
      }

      async function fetchSchedulerMail (){
        await new Promise((resolve) => setTimeout(() => { 
  
             dispatch(getScheduleMailList(config))  
            
        }, 5000))
      }

      async function fetchInstanceMailDelete (){
        await new Promise((resolve) => setTimeout(() => { 
  
             dispatch(getSentMailList(config))  
            
        }, 4000))
      }

      async function fetchSchedulerMailDelete (){
        await new Promise((resolve) => setTimeout(() => { 
  
             dispatch(getScheduleMailList(config))  
            
        }, 4000))
      }
   

  
    
    return (
        <div>
                <Snackbar
                    anchorOrigin={{ vertical, horizontal }}
                    open={snackBerOpen}
                    key={vertical + horizontal}>
                      
                      <SnackbarContent
                        aria-describedby="message-id2"
                        // className={classes.snackbarStyleViaNestedContent}

                        style={props.success_info === 'False' ? {backgroundColor:'rgb(71, 73, 82)'}: {backgroundColor:'green'}}
                        message={
                          <span id="message-id2">
                            <div>{confirmInfo}</div>
                          </span>
                      }
                      />
                    </Snackbar>
                
        </div>
    )
}

export default SnackBer
