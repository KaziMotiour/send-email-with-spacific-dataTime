import {SEND_INSTANT_EMAIL, SEND_INSTANT_EMAIL_FAIL, SEND_EMAIL_WITH_TIMER, SEND_EMAIL_WITH_TIMER_FAIL, GET_ALL_EMAIL, GET_SINGEL_EMAIL, EMAIL_UPDATE_SUCCESS, EMAIL_UPDATE_ERROR, EMAIL_DELETE_SUCCESS, GET_SENT_MAIL, GET_SCHEDULE_MAIL, LOGGEDIN_USER_INFO, UPDATE_ERROR_STATUS} from './ActionTypes'
import axios from 'axios'


export const sendInstanceMail = () =>({
    type:SEND_INSTANT_EMAIL
})
export const sendInstanceMailFail = (error) =>({
    type:SEND_INSTANT_EMAIL_FAIL,
    error:error
})

export const sendMailWithTimer = () =>(
    {
    
    type:SEND_EMAIL_WITH_TIMER,

}
)

export const sendMailWithTimerFail = (error) =>(
    {
    type: SEND_EMAIL_WITH_TIMER_FAIL,
    error : error
})



export const getSentEmail = (emails) =>(
    console.log(emails,'from actions'),
    {
        type:GET_SENT_MAIL,
        sent_mails:emails
    }
)


export const getScheduleEmail = (emails) =>(
    {
        type:GET_SCHEDULE_MAIL,
        schedule_mails:emails
    }
)


export const SinglEmail = (email) =>(
    console.log(email, 'single Email form action'),
    {
        type:GET_SINGEL_EMAIL,
        singleEmail:email
    }
)
export const emailUpadateError = (error) =>(
    {
        type:EMAIL_UPDATE_ERROR,
        error:error
    }

)

// Post to email,
export const sendInstanceEmail = (formData, config) => async dispatch => {
    // console.log('done');

    try{
       
        await axios.post('http://127.0.0.1:8000/task/instantmail/',formData, config).then(res =>{
                console.log(res.data.status, 'sttaussssssssssss');

                {res.data.status==='success' && dispatch({ type:SEND_INSTANT_EMAIL})}   
                {res.data.status==='success' && dispatch({ type:UPDATE_ERROR_STATUS})}  
                {res.data.status==='fail' && dispatch(dispatch(sendMailWithTimerFail(res.data)))}    

        }).catch(function (error){
            if (error.response){
                console.log(error.response.data.detail);
                // dispatch(sendInstanceMailFail(error.response.data.detail))
            }
        })
    }catch(err){
        console.log(err);
    }

}

export const sendEmailWithTimer = (formData, config) => async dispatch =>{

    try{
        await axios.post('http://127.0.0.1:8000/task/taskwithtimer/',formData, config).then(res =>{
           console.log(res.data, 'action ss');
            dispatch({ type:SEND_EMAIL_WITH_TIMER})
            dispatch({type: UPDATE_ERROR_STATUS})
        }).catch(function (error){
            if (error.response){
                console.log(error.response.data, 'error');
                dispatch(sendMailWithTimerFail(error.response.data))
                
            }
        })
    }catch(e){
        console.log(e);
    }
}


export const GetAllTheEmailSent = (config) => async dispatch =>{

    try{
       await axios.get(`http://127.0.0.1:8000/task/maillist/`, config).then(res =>{
           console.log(res.data, 'gmils');
           
        }).catch(function (error){
            if (error.response){
                console.log(error.response.data.detail);
                
            }
        })
    }catch(e){
        console.log(e);
    }
}






export const getSentMailList = (config) => async dispatch =>{

    try{
        await axios.get(`http://127.0.0.1:8000/task/sentMaillist/`, config).then(res =>{
           console.log(res.data, 'gmils');
            dispatch(getSentEmail(res.data))
        }).catch(function (error){
            if (error.response){
                console.log(error.response.data.detail);
                
            }
        })
    }catch(e){
        console.log(e);
    }
}

export const getScheduleMailList = (config) => async dispatch =>{

    try{
        await axios.get(`http://127.0.0.1:8000/task/scheduleMaillist/`, config).then(res =>{
           console.log(res.data, 'gmils');
            dispatch(getScheduleEmail(res.data))
        }).catch(function (error){
            if (error.response){
                console.log(error.response.data.detail);
                
            }
        })
    }catch(e){
        console.log(e);
    }
}








export const getSingleEmail = (id, config) => async dispatch =>{

    try{
        await axios.get(`http://127.0.0.1:8000/task/taskRUD/${id}`, config).then(res =>{
           console.log(res.data, 'single mail');
            dispatch(SinglEmail(res.data))
        }).catch(function (error){
            if (error.response){
                console.log(error.response.data.detail);
                
            }
        })
    }catch(e){
        console.log(e);
    }
}
export const updateSingleEmail = (id, fromData, config) => async dispatch =>{
    console.log(id,'action');
    try{
        axios.put(`http://127.0.0.1:8000/task/taskRUD/${id}/`, fromData, config).then(res =>{
            console.log('updated');
            dispatch({type: EMAIL_UPDATE_SUCCESS})
            dispatch({type: UPDATE_ERROR_STATUS})
        }).catch(function (error){
            if (error.response){
                console.log(error.response.data, 'error');
                dispatch(sendMailWithTimerFail(error.response.data))
                
                
            }
        })
    }catch(e){
        console.log(e);
    }
}


export const deleteSingleEmail = (id, config) => async dispatch =>{

    try{
        axios.delete(`http://127.0.0.1:8000/task/taskRUD/${id}/`, config).then(res =>{
            console.log('delete succec from actions')
            dispatch({type:EMAIL_DELETE_SUCCESS})
        }).catch(function (error){
            if (error.response){
                console.log(error.response.data.detail);
                
            }
        })
    }catch(e){
        console.log(e);
    }
}