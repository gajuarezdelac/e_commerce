import {ACTION_TYPES} from '../constants/UserConst';

export  const AuthReducer = (state = {user: {}}, action) => {

   switch (action.type) {
       case ACTION_TYPES.LOGIN_REQUEST:
       case ACTION_TYPES.REGISTER_USER_REQUEST:
       case ACTION_TYPES.LOAD_USER_REQUEST:
          return {
             loading: true,
             isAuthenticated: false
          }
          case ACTION_TYPES.LOGIN_SUCCESS:
          case ACTION_TYPES.REGISTER_USER_SUCCESS:
          case ACTION_TYPES.LOAD_USER_SUCCESS:
          return {
             ...state,
             loading: false,
             isAuthenticated: true,
             user: action.payload
          }
          case ACTION_TYPES.LOGIN_FAIL:
          case ACTION_TYPES.REGISTER_USER_FAIL:
          return {
             ...state,
             loading: false,
             isAuthenticated: false,
             user: null,
             error: action.payload
          }
          case ACTION_TYPES.LOAD_USER_FAIL: {
             return {
               loading: false,
               isAuthenticated: false,
               user: null,
               error: action.payload  
             }
          }
          case ACTION_TYPES.LOGOUT_USER_SUCCESS: {
            return {
              loading: false,
              isAuthenticated: false,
              user: null
            }
          }
          case ACTION_TYPES.LOGOUT_USER_FAIL: {
             return  {
                ...state,
                error: action.payload
             }
          }
          case ACTION_TYPES.CLEAR_ERRORS: {
             return {
                ...state,
                error: null,

             }
          }
         default: return state
   }
}


export const UserReducer = (state = {}, action) => {
   switch (action.type) {
      
      case ACTION_TYPES.UPDATE_PROFILE_REQUEST: 
      case ACTION_TYPES.UPDATE_PASSWORD_REQUEST:
      case ACTION_TYPES.UPDATE_USER_REQUEST: 
      case ACTION_TYPES.DELETE_USER_REQUEST: {
         return  {
            ...state,
            loading: true,
         }
      }
      case ACTION_TYPES.UPDATE_PROFILE_SUCCESS:
      case ACTION_TYPES.UPDATE_PASSWORD_SUCCESS: 
      case ACTION_TYPES.UPDATE_USER_SUCCESS:{
         return  {
            ...state,
            loading: false,
            isUpdated: action.payload
         }
      }
      case ACTION_TYPES.DELETE_USER_SUCCESS:{
         return  {
            ...state,
            loading: false,
            isDeleted: action.payload
         }
      }
      case ACTION_TYPES.UPDATE_PROFILE_RESET:
      case ACTION_TYPES.UPDATE_PASSWORD_RESET: 
      case ACTION_TYPES.UPDATE_USER_RESET: {
         return  {
            ...state,
            isUpdated: false
         }
      }
      case ACTION_TYPES.DELETE_USER_RESET: {
         return  {
            ...state,
            isDeleted: false
         }
      }
      case ACTION_TYPES.UPDATE_PROFILE_FAIL:
      case ACTION_TYPES.UPDATE_PASSWORD_FAIL:
      case ACTION_TYPES.UPDATE_USER_FAIL:
      case ACTION_TYPES.DELETE_USER_FAIL: {
         return  {
            ...state,
            loading: false,
            error: action.payload
         }
      }
      case ACTION_TYPES.CLEAR_ERRORS:
         return {
             ...state,
             error: null
         }
      default: return state;
   }
}


export const ForgotPasswordReducer = (state = {}, action) => {
   switch (action.type) {
      
       
      case ACTION_TYPES.FORGOT_PASSWORD_REQUEST: 
      case ACTION_TYPES.NEW_PASSWORD_REQUEST: {
         return  {
            ...state,
            loading: true,
            error: null
         }
      }
    
      case ACTION_TYPES.FORGOT_PASSWORD_SUCCESS: {
         return  {
            ...state,
            loading: false,
            message: action.payload
         }
      }
      case ACTION_TYPES.NEW_PASSWORD_SUCCESS: {
         return  {
            ...state,
            loading: false,
            success: action.payload
         }
      }
      case ACTION_TYPES.FORGOT_PASSWORD_FAIL: 
      case ACTION_TYPES.NEW_PASSWORD_FAIL: {
         return  {
            ...state,
            loading: false,
            error: action.payload
         }
      }
      case ACTION_TYPES.CLEAR_ERRORS:
         return {
             ...state,
             error: null
         }
      default: return state;
   }
}

export const GetAllUsersReducer = (state = { users: []}, action) => {
   switch (action.type) {
      case ACTION_TYPES.GET_ALL_USERS_REQUEST: {
         return  {
            ...state,
            loading: true,
         }
      }
      case ACTION_TYPES.GET_ALL_USERS_SUCCESS: {
         return  {
            ...state,
            loading: false,
            users: action.payload
         }
      }
      case ACTION_TYPES.GET_ALL_USERS_FAIL: 
      {
         return  {
            ...state,
            loading: false,
            error: action.payload
         }
      }
      case ACTION_TYPES.CLEAR_ERRORS:
         return {
             ...state,
             error: null
         }
      default: return state;
   }
}

export const UserDetailsReducer = (state = { user: {} }, action) => {
   switch (action.type) {

       case ACTION_TYPES.GET_USER_DETAILS_REQUEST:
           return {
               ...state,
               loading: true,
           }

       case ACTION_TYPES.GET_USER_DETAILS_SUCCESS:
           return {
               ...state,
               loading: false,
               user: action.payload
           }

       case ACTION_TYPES.GET_USER_DETAILS_FAIL:
           return {
               ...state,
               loading: false,
               error: action.payload
           }

       case ACTION_TYPES.CLEAR_ERRORS:
           return {
               ...state,
               error: null
           }
       default:
           return state;
   }
}







