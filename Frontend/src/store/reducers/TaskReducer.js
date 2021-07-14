import React from 'react'

import {SEND_INSTANT_EMAIL, SEND_INSTANT_EMAIL_FAIL, SEND_EMAIL_WITH_TIMER, SEND_EMAIL_WITH_TIMER_FAIL, GET_ALL_EMAIL,  GET_SINGEL_EMAIL, EMAIL_UPDATE_SUCCESS, EMAIL_UPDATE_ERROR, EMAIL_DELETE_SUCCESS, GET_SENT_MAIL, GET_SCHEDULE_MAIL, SET_SEND_INSTANT_EMAIL, SET_SEND_EMAIL_WITH_TIMER, UPDATE_EMAIL_DELETE_SUCCESS_STATUS, UPDATE_EMAIL_UPDATE_SUCCESS_STATUS,UPDATE_ERROR_STATUS} from '../actions/ActionTypes'

const initialState = ({
    sendInstantMail : false,
    sendInstantMailError:null,
    sendEmailWithTimer : false,
    Error : null,
    getAllTheMail :null,

    getSentEmails:null,
    getScheduleEmails:null,
    getSingleEmail:null,
    emailUpdateSuccess:null,
    emailUpdateError : null,
    emailDeleteSuccess: null,
})

const SendInstantMailSuccess = (state, action) =>(
    console.log('send instat mail true'),
    {
    ...state,
    sendInstantMail:true
})


const SendInstantMailSuccessStatusChange = (state, action) =>(
    console.log('set send timout'),
    {
    ...state,
    sendInstantMail:false
})

const SendInstantMailFail = (state, action) =>({
    ...state,
    sendInstantMailError:action.error,
})



const sendEmailWithTimer = (state, action) =>(
    console.log('send email scheduler in reducer'),
    {
    ...state,
    sendEmailWithTimer:true
})
const sendEmailWithTimerStatusChange = (state, action) =>(
    console.log('send email scheduler in reducer'),
    {
    ...state,
    sendEmailWithTimer:false
})


const sendEmailWithTimerFail = (state, action) =>(
    console.log('error form rediuxz'),
    {
    ...state,
    Error:action.error
})

const getAllTheMail = (state, action) =>(
    console.log(action.mails,'resucer'),
    {
    ...state,
    getAllTheMail:action.mails
})


const getSentMail = (state, action) =>(
    console.log(action.sent_mails,' from reducer'),
    {
    state, 
    getSentEmails:action.sent_mails

})


const getScheduleMail = (state, action) =>(
    console.log(action.schedule_mails,' from reducer schedule'),
    {
    state, 
    getScheduleEmails:action.schedule_mails

})

const getSingleEmail = (state, action) =>(
    console.log(action.singleEmail, 'single Email form reducer'),
    {
    ...state,
    getSingleEmail:action.singleEmail
})

const getEmailUpdateSuccess = (state, action) =>(
    console.log('email updated form redux'),
    {
    ...state,
    emailUpdateSuccess:true
})

const updateEmailUpdateSuccess = (state, action) =>(
    console.log('email updated form redux'),
    {
    ...state,
    emailUpdateSuccess:false
})



const getEmailUpdateError = (state, action) =>({
    ...state,
    emailUpdateError:action.error
})

const getEmailDeleteSuccess = (state, action) =>(
    console.log('delete succec from reducer'),
    {
    ...state,
    emailDeleteSuccess:true
})

const UpdateEmailDeleteSuccessStatus = (state, action) =>(
    console.log('delete succec from reducer'),
    {
    ...state,
    emailDeleteSuccess:false
})

const updateErrorStatus = (state, action) =>({
    ...state,
    Error:null

})

const TaskReducer = (state = initialState, action) =>{
    switch(action.type){
        case SEND_INSTANT_EMAIL: return SendInstantMailSuccess(state, action)
        case SET_SEND_INSTANT_EMAIL: return SendInstantMailSuccessStatusChange(state, action)
        case SEND_INSTANT_EMAIL_FAIL: return SendInstantMailFail(state, action)

        case SEND_EMAIL_WITH_TIMER: return sendEmailWithTimer(state, action)
        case SET_SEND_EMAIL_WITH_TIMER: return sendEmailWithTimerStatusChange(state, action)
        case SEND_EMAIL_WITH_TIMER_FAIL: return sendEmailWithTimerFail(state, action)

        case GET_ALL_EMAIL: return getAllTheMail(state, action)
        
        case GET_SENT_MAIL: return getSentMail(state, action)
        case GET_SCHEDULE_MAIL: return getScheduleMail(state, action)
        case GET_SINGEL_EMAIL: return getSingleEmail(state, action)
        case EMAIL_UPDATE_SUCCESS: return getEmailUpdateSuccess(state, action)
        case UPDATE_EMAIL_UPDATE_SUCCESS_STATUS: return updateEmailUpdateSuccess(state, action)
        case EMAIL_UPDATE_ERROR: return getEmailUpdateError(state, action)
        case EMAIL_DELETE_SUCCESS: return getEmailDeleteSuccess(state, action)
        case UPDATE_EMAIL_DELETE_SUCCESS_STATUS: return UpdateEmailDeleteSuccessStatus(state, action)
        case UPDATE_ERROR_STATUS : return updateErrorStatus(state, action)
      
        default: return state

    }

}

export default TaskReducer;