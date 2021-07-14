import React,{useEffect, useState} from 'react'
import {useHistory, useParams} from 'react-router-dom'
import axios from 'axios'
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import NavBar from '../NavBar'
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
  }));


function EmailDetail() {
    const [email, setEmail] = useState()
    const [openEdit, setOpenEdit] = useState(false)
    const [updateInfo, setUpdateInfo] = useState({
      
        subject:email  && email.subject,
        body:email  && email.body,
        recipient:email && email.recipient,
        setTimer:email && email.setTimer
    })
    let {id} = useParams()
    const config = { headers: { 
        'Content-Type':'application/json',
        'Authorization': "Bearer " + localStorage.getItem('access_token')
    }}

    const handleOpenEdit = () =>{
        setOpenEdit(!openEdit)
    }

    // useEffect(() => {
       
    //     axios.get(`http://127.0.0.1:8000/task/taskRUD/${id}`, config).then(res =>{
    //         console.log(res.data, 'gmils');
    //         setEmail(res.data)
    //      }).catch(function (error){
    //          if (error.response){
    //              console.log(error.response.data.detail);
                 
    //          }
    //      })
    // }, [])

    const HandleInput = (e) =>{
        console.log(e.target.value);
        setUpdateInfo(prevState =>({
          ...prevState,
          [e.target.name]:e.target.value
        }))
      }


    return (
        <div>
            <NavBar />
            <h2>Subject: {openEdit ? <TextField  name="subject" onChange={e=> HandleInput(e)} required id="standard-required" label="Required" value={email  && email.subject} defaultValue="Hello World" /> : email  && email.subject }  </h2>
            
            <h2>body: {openEdit ?  <TextField name="body" onChange={e=> HandleInput(e)} required id="standard-required" label="Required" value={email  && email.body} defaultValue="Hello World" />: email && email.body }  </h2>
            <h2>recipient: {openEdit ? <TextField name="recipient" onChange={e=> HandleInput(e)} required id="standard-required" label="Required" value={email  && email.recipient}  defaultValue="Hello World" />: email && email.recipient}  </h2>
            <h2>setTimer:  {openEdit ? <TextField name="setTimer" onChange={e=> HandleInput(e)} required id="standard-required" label="Required" value={email  && email.setTimer} defaultValue="Hello World" />: email && email.setTimer && email.setTimer  }  </h2>
            {openEdit && <Button variant="contained"  style={{margin:5,}} color="primary" onClick={handleOpenEdit}> cancle Edit</Button>} {openEdit &&  <Button variant="contained"  style={{margin:5,}} color="primary" > Update</Button>}
            {openEdit==false && <Button variant="contained" style={{margin:5,}}  color="primary" onClick={handleOpenEdit}>Edit</Button> }
            {openEdit==false &&<Button variant="contained"  style={{margin:5,}} color="secondary">Delete</Button>}
        </div>
    )
}

export default EmailDetail
