import React, {useEffect, useState} from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import {useDispatch, useSelector} from 'react-redux'
import { useHistory, withRouter, NavLink } from "react-router-dom";
import Button from '@material-ui/core/Button';
import SimpleCard from './flexbox'
import {GetAllTheEmailSent} from '../../store/actions/TaskAction'
import axios from 'axios'
import InstanceMail from './InstanceMail'
import ScheduleMail from './scheduleMail'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    profileInfo:{
        width:'80%',
        height:220,
        backgroundColor:'rgb(227, 229, 232)',
        margin:'auto',
        ['@media (max-width: 600px)']: { // eslint-disable-line no-useless-computed-key
            width:'90%', 
           },
    },
    text:{
        fontSize:40,
        borderBottom:'1px solid black',
        
    },
    table: {
        minWidth: 650,
      },
    orders:{
        width:'90%',
        margin:'auto'
    },

    info:{
        
    },
    button:{
        display:'flex',
        alignContent:'center',
        justifyContent:'center',
        padding:'5',
        ['@media (max-width: 600px)']: { // eslint-disable-line no-useless-computed-key
           flexWrap:'wrap'  
          },

    },
    btn:{
        margin:10
    },
    emails:{
        fontSize:25,
        margin:10,
        cursor:'pointer',
        '&:hover':{
            color:'blue'
          }
    }
    ,
    mails:{
        width:'98%',
        paddingLeft:20,
        paddingRight:20,
    }

    }))


console.log(parseInt("sdf6"), 'parsint' );
function Orders() {
    
    const classes = useStyles()
    const dispatch = useDispatch()
    const history = useHistory()
    const [allEmail, setAllEmail] = useState()
    const [isMerchant, setIsMerchant] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)
    const [openInstantMail, setOpenInstantMail]=useState(false)
    const [openScheduleMail, setOpenScheduleMail]=useState(false)

    // const merchentOrderLists = useSelector(state => state.order.merchentOrderList)
    // const AdminOrderList = useSelector(state => state.order.AdminOrderList)
    // console.log(AdminOrderList,'list');

        const config = { headers: { 
            'Content-Type':'application/json',
            'Authorization': "Bearer " + localStorage.getItem('access_token')
        }}
    
    const userInfo = useSelector(state => state.auth.loggedInUserInfo)
    const getAllTheMail = useSelector(state => state.email.getAllTheMail)
   
    const handleOpenInstantMail = ()=>{
        setOpenInstantMail(!openInstantMail)
    }
    const handleOpenScheduleMail = ()=>{
        setOpenScheduleMail(!openScheduleMail)
    }


    return (
        <div>
            <div className={classes.profileInfo}>
                
                <div style={{paddingTop:'1%', paddingRight:'0%'}}>
                    <img style={{width:100, height:100,}} src="https://icon-library.com/images/man-icon/man-icon-6.jpg" />
                    {userInfo &&  
                    <p style={{fontSize:30, marginTop:5, marginBottom:0,}}>
                         <span> {userInfo.email}</span></p> 
                
                    }
                    
                </div>

                <div className={classes.button}>
                <div className={classes.btn}> <Button onClick={handleOpenInstantMail} style={{background:'#053742'}} variant="contained" color="primary">Send Instant Email</Button>
                </div>
                <div className={classes.btn}> 
                <Button onClick={handleOpenScheduleMail} style={{background:'#053742'}} variant="contained" color="primary">Send schedule Email</Button>
                </div>
                </div> 
            

          {openInstantMail && <InstanceMail onOpen={true} handleOpenInstantMail={handleOpenInstantMail} />}
          {openScheduleMail && <ScheduleMail onOpen={true} handleOpenScheduleMail={handleOpenScheduleMail}/>}
            
           
        </div>
        </div>
    )
}

export default Orders
