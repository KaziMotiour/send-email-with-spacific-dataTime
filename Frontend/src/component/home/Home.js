import React,{useEffect, useState} from 'react'

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import NavBar from '../NavBar'
import Orders from './Orders'
import {useDispatch, useSelector} from 'react-redux'
import { useHistory, withRouter, NavLink } from "react-router-dom";
import {loggedInUserInfo} from '../../store/actions/Auth'
import SimpleCard from './flexbox'
import {getSentMailList, getScheduleMailList} from '../../store/actions/TaskAction'


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
      nav:{
            width:'100%',
            height:60,
            
      },
      orders:{
          width:'100%',
      },
      mailList:{
          width:'80%',
          margin:'auto',
      },
      menu:{
          width:'100%',
          display:'flex',
          margin:'auto',
          textAlign:'center',
          justifyContent:'center'

      }, 
      menuItem:{
        marginRight:20,
        cursor:'POINTER',
       
        '&:hover':{
            color:'gray',
            borderBottom:'1px solid black',
          }
      }

    }))

function Home() {

    const classes = useStyles()
    const dispatch = useDispatch()
    const history = useHistory()
    const userInfo = useSelector(state => state.auth.loggedinUserInfo)

    const sentEmali = useSelector(state => state.email.getSentEmails)
    const scheduleEmali = useSelector(state => state.email.getScheduleEmails)


    const [openScheduleMail, setOpenScheduleMail]= useState(true)
    const [openSentMail, setOpenSentMail]= useState(false)
    
    const config = { headers: { 
        'Content-Type':'application/json',
        'Authorization': "Bearer "+localStorage.getItem('access_token')
      }}


    const handleShowScheduleMail = () =>{
        setOpenScheduleMail(true)
        setOpenSentMail(false)
    }

    const handleShowSentMail = () =>{
        setOpenScheduleMail(false)
        setOpenSentMail(true)
    }
    
 

    return (
        <div>
            <div className={classes.nav}>
                <NavBar userInfo={userInfo} />
            </div>
            <div classes = {classes.orders}>
                <Orders />
            </div>

            <div className={classes.menu}>
                <p className={classes.menuItem}  onClick={handleShowScheduleMail}>SCHEDULE MAIL</p>
                <p className={classes.menuItem} onClick={handleShowSentMail}>SENT MAIL</p>
            </div>

            <div className={classes.mailList}>
             {openScheduleMail && <SimpleCard   type={'schudel'}/>}
             {openSentMail && <Simp leCard emailList={sentEmali} type={'instant'}/>}
            </div>
        </div>
    )
}

export default Home
