import {ACTION_TYPES} from '../constants/UserConst';
import axios from 'axios';

export const login = (email, password) => async (dispatch) => {
   try {
       
     dispatch({type: ACTION_TYPES.LOGIN_REQUEST})

     const config = {
         headers: {
             "Content-Type": "application/json"
         }
     }

     const {data } = await axios.post('/api/v1/login', {email,password},config)

     dispatch({
         type: ACTION_TYPES.LOGIN_SUCCESS,
         payload: data.user
    })

   } catch (error) {
       console.log( error.response);
       dispatch({
           type: ACTION_TYPES.LOGIN_FAIL,
           payload: error.response.data.message
       })
   }
}

// Register
export const register = (userData) => async (dispatch) => {
    try {
        

         dispatch({type: ACTION_TYPES.REGISTER_USER_REQUEST})
 
      const config = {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }

    const { data } = await axios.post('/api/v1/register', userData, config)
 
      dispatch({
          type: ACTION_TYPES.REGISTER_USER_SUCCESS,
          payload: data.user
     })
 
    } catch (error) {
        dispatch({
            type: ACTION_TYPES.REGISTER_USER_FAIL,
            payload: error.response.data.message
        })
    }
 }

 // Get user Info
export const loadUser = () => async (dispatch) => {
    try {
        
    dispatch({type: ACTION_TYPES.LOAD_USER_REQUEST})
 
    const { data } = await axios.get('/api/v1/me')
 
      dispatch({
          type: ACTION_TYPES.LOAD_USER_SUCCESS,
          payload: data.user
     })
 
    } catch (error) {
        dispatch({
            type: ACTION_TYPES.LOAD_USER_FAIL,
            payload: error.response.data.message
        })
    }
 }

 // Register
export const logout = () => async (dispatch) => {
    try {
        
 
    await axios.get('/api/v1/logout')
 
      dispatch({
          type: ACTION_TYPES.LOGOUT_USER_SUCCESS
     })
 
    } catch (error) {
        dispatch({
            type: ACTION_TYPES.LOGOUT_USER_FAIL,
            payload: error.response.data.message
        })
    }
 }
 
// Register
export const updateProfile = (userData) => async (dispatch) => {
    try {

     dispatch({type: ACTION_TYPES.UPDATE_PROFILE_REQUEST})
      const config = {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }

    const { data } = await axios.put('/api/v1/me/update', userData, config)

      dispatch({
          type: ACTION_TYPES.UPDATE_PROFILE_SUCCESS,
          payload: data.success
     })
 
    } catch (error) {
        dispatch({
            type: ACTION_TYPES.UPDATE_PROFILE_FAIL,
            payload: error.response.data.message
        })
    }
 }

// Register
export const updatePassword = (passwords) => async (dispatch) => {
    try {

     dispatch({type: ACTION_TYPES.UPDATE_PASSWORD_REQUEST})
      
     const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }

    const { data } = await axios.put('/api/v1/password/update', passwords, config)

      dispatch({
          type: ACTION_TYPES.UPDATE_PASSWORD_SUCCESS,
          payload: data.success
     })
 
    } catch (error) {
        dispatch({
            type: ACTION_TYPES.UPDATE_PASSWORD_FAIL,
            payload: error.response.data.message
        })
    }
 }

 
// Forgot Password
export const forgotPassword = (email) => async (dispatch) => {
    try {

     dispatch({type: ACTION_TYPES.FORGOT_PASSWORD_REQUEST})
      
     const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }

    const { data } = await axios.post('/api/v1/password/forgot', email, config)
    
      dispatch({
          type: ACTION_TYPES.FORGOT_PASSWORD_SUCCESS,
          payload: data.message
     })
 
    } catch (error) {
        dispatch({
            type: ACTION_TYPES.FORGOT_PASSWORD_FAIL,
            payload: error.response.data.message
        })
    }
 }

  
// Forgot Password
export const resetPassword = (token, passwords) => async (dispatch) => {
    try {
     dispatch({type: ACTION_TYPES.NEW_PASSWORD_REQUEST})
      
     const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }

    const { data } = await axios.put(`/api/v1/password/reset/${token}`, passwords, config)
    
      dispatch({
          type: ACTION_TYPES.NEW_PASSWORD_SUCCESS,
          payload: data.success
     })
 
    } catch (error) {
        dispatch({
            type: ACTION_TYPES.NEW_PASSWORD_FAIL,
            payload: error.response.data.message
        })
    }
 }
 

 export const getAllUsers = () => async (dispatch) => {
    try {
        
    dispatch({type: ACTION_TYPES.GET_ALL_USERS_REQUEST})
 
    const { data } = await axios.get('/api/v1/admin/users');
 
      dispatch({
          type: ACTION_TYPES.GET_ALL_USERS_SUCCESS,
          payload: data.users
     })
 
    } catch (error) {
        dispatch({
            type: ACTION_TYPES.GET_ALL_USERS_FAIL,
            payload: error.response.data.message
        })
    }
 }

 export const getUserDetails = (id) => async (dispatch) => {
    try {
        
        dispatch({type: ACTION_TYPES.GET_USER_DETAILS_REQUEST})
     
        const { data } = await axios.get(`/api/v1/admin/user/${id}`);
     
          dispatch({
              type: ACTION_TYPES.GET_USER_DETAILS_SUCCESS,
              payload: data.user
         })
     
        } catch (error) {
            dispatch({
                type: ACTION_TYPES.GET_USER_DETAILS_FAIL,
                payload: error.response.data.message
            })
        }   
 }
 


// Forgot Password
export const updateUser = (id, userData) => async (dispatch) => {
    try {

     dispatch({type: ACTION_TYPES.UPDATE_USER_REQUEST})
      
     const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }

    const { data } = await axios.put(`/api/v1/admin/user/${id}`, userData, config)
    
      dispatch({
          type: ACTION_TYPES.UPDATE_USER_SUCCESS,
          payload: data.success
     })
 
    } catch (error) {
        dispatch({
            type: ACTION_TYPES.UPDATE_USER_FAIL,
            payload: error.response.data.message
        })
    }
 }


 // Forgot Password
export const deleteUser = (id) => async (dispatch) => {
    try {

     dispatch({type: ACTION_TYPES.DELETE_USER_REQUEST})
      
    const { data } = await axios.delete(`/api/v1/admin/user/${id}`);

      dispatch({
          type: ACTION_TYPES.DELETE_USER_SUCCESS,
          payload: data.success
     })
     
    } catch (error) {
        dispatch({
            type: ACTION_TYPES.DELETE_USER_FAIL,
            payload: error.response.data.message
        })
    }
 }


// Clear Errors
export const clearError = () => async (dispatch) => {
    dispatch({
        type: ACTION_TYPES.CLEAR_ERRORS
    })
}
