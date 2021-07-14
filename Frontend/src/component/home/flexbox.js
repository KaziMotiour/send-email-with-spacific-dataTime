import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import VisibilityIcon from '@material-ui/icons/Visibility';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import DeletePost from './DeletePost'
import EditEmail from './EditEmail'
import ShowSingleEmail from './showSingleEmail'
import {getSentMailList, getScheduleMailList} from '../../store/actions/TaskAction'
import {useDispatch, useSelector} from 'react-redux'


   
const useStyles = makeStyles({
  table: {
    minWidth: 650,
    // marginLeft:5,
  },
  icon:{
   
    '&:hover':{
      
      color:'blue', 
    }, 
  },
  icon1:{
    cursor:'pointer',
    color:'#0A1931',
    fontSize:20,
    marginRight:5,
    

  },
  icon2:{
    cursor:'pointer',
    color:'#78DEC7',
    fontSize:20,
    marginRight:5,
    
  },
  icon3:{
    cursor:'pointer',
    color:'#F38BA0',
    fontSize:20,
    
  }
 
});

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function BasicTable({ type}) {

  const classes = useStyles();
  const dispatch = useDispatch()
  const [openDataForm, setOpenDeleteForm]= useState(false)
  const [openEditEmail, setOpenEditEmail]= useState(false)
  const [showSingleEmail, setShowSingleEmail]= useState(false)
  const [email, setEmail]= useState()
  const [emailType, setEmailType]= useState()
  const [id, setId]= useState()

  const userInfo = useSelector(state => state.auth.loggedinUserInfo)
  const sentEmali = useSelector(state => state.email.getSentEmails)
  const scheduleEmail = useSelector(state => state.email.getScheduleEmails)

  const config = { headers: { 
    'Content-Type':'application/json',
    'Authorization': "Bearer "+localStorage.getItem('access_token')
  }}

  useEffect(() => {
    {type=='schudel' && dispatch(getScheduleMailList(config))}    
    
    // dispatch(getSentMailList(config)) 
}, [])


useEffect(() => {
  {type=='instant' && dispatch(getSentMailList(config))}    
  
  // dispatch(getSentMailList(config)) 
}, [])
  
console.log(scheduleEmail, sentEmali);


  const hondleDeleteFormOpen =(email, type) =>{
    setEmailType(type)
    setEmail(email)
    setOpenDeleteForm(!openDataForm)
  }
  const hondleEditFormOpen =(email) =>{

    setEmail(email)
    setOpenEditEmail(!openEditEmail)
  }
  const hondleShowSingleEmail =(id) =>{
    console.log(id);
    setId(id)
    setShowSingleEmail(!showSingleEmail)
  }

 

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell><b>SUBJECT</b></TableCell>
            <TableCell align="right"><b>BODY</b></TableCell>
            <TableCell align="right"><b>RECIPIENTS</b></TableCell>
            {type=="schudel" && <TableCell align="right"><b>Timer</b></TableCell>}
            <TableCell align="right" style={{marginRight:20,}}><b>RUD</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>


          {scheduleEmail && scheduleEmail.map((email) => (
            <TableRow key={email.id}>
              <TableCell component="th" scope="row">
                {email.subject}
              </TableCell>
              <TableCell align="right">{email.body}</TableCell>
              
              <TableCell align="right">{email.recipient}</TableCell>
              <TableCell align="right">{email.setTimer}</TableCell>
              
              <TableCell align="right">
                <VisibilityIcon   className={classes.icon1} onClick={() => hondleShowSingleEmail(email.id)}/> 
                 <EditIcon className={classes.icon2} onClick={() => hondleEditFormOpen(email)}/>
                <DeleteIcon className={classes.icon3}  onClick={() => hondleDeleteFormOpen(email, 'schedule')}/> 
              </TableCell>
                        
            </TableRow>
          ))}


        {sentEmali && sentEmali.map((email) => (
            <TableRow key={email.id}>
              <TableCell component="th" scope="row">
                {email.subject}
              </TableCell>
              <TableCell align="right">{email.body}</TableCell>
              
              <TableCell align="right">{email.recipient}</TableCell>
              
              <TableCell align="right">
                <VisibilityIcon   className={classes.icon1} onClick={() => hondleShowSingleEmail(email.id)}/> 
                {!type=='instant' &&  <EditIcon className={classes.icon2} onClick={hondleEditFormOpen}/> }
                <DeleteIcon className={classes.icon3} onClick={() => hondleDeleteFormOpen(email, 'sent')} /> 
              </TableCell>
                        
            </TableRow>
          ))} 
        </TableBody>
      </Table>

      {openDataForm && <DeletePost open={true} hondleDeleteFormOpen={hondleDeleteFormOpen} email={email} type={emailType}/>}
      {openEditEmail && <EditEmail onOpen={true} hondleEditFormOpen={hondleEditFormOpen} email={email}  />}
      {showSingleEmail && <ShowSingleEmail onOpen={true} hondleEditFormOpen={hondleShowSingleEmail}  id={id}/>}
    </TableContainer>
  );
}
