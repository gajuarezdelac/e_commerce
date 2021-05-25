import {ACTION_TYPES} from '../constants/OrderConst';


export const newOrderReducer = (state = {}, action) => {

    switch (action.type) {
        
        case ACTION_TYPES.CREATE_ORDER_REQUEST: {
            return {
                ...state,
                loading: true
            }
        }
        case ACTION_TYPES.CREATE_ORDER_SUCCESS: {
            return {
                loading: false,
                order: action.payload
            }
        }
        case ACTION_TYPES.CREATE_ORDER_FAILURE: {
            return {
                loading: false,
                error: action.payload
            }
        }
        case ACTION_TYPES.CLEAR_ERRORS: {
            return {
                ...state,
                error: null
            }
        }
        default:
            return state;
    }
}

export const MyOrderReducer = (state = {orders: []}, action) => {
   switch (action.type) {
      
    case ACTION_TYPES.MY_ORDERS_REQUEST: {
        return {
            loading: true
        }
    }
    case ACTION_TYPES.MY_ORDERS_SUCCESS: {
        return {
            loading: false,
            orders: action.payload
        }
    }
    case ACTION_TYPES.MY_ORDERS_FAILURE: {
        return {
            loading: false,
            error: action.payload
        }
    }
    case ACTION_TYPES.CLEAR_ERRORS: {
        return {
            ...state,
            error: null
        }
    }
      default: return state;
   }
}


export const OrderDetailsReducer = (state = {order: {}}, action) => {
    switch (action.type) {
       
     case ACTION_TYPES.ORDERS_DETAILS_REQUEST: {
         return {
             loading: true
         }
     }
     case ACTION_TYPES.ORDERS_DETAILS_SUCCESS: {
         return {
             loading: false,
             order: action.payload
         }
     }
     case ACTION_TYPES.ORDERS_DETAILS_FAILURE: {
         return {
             loading: false,
             error: action.payload
         }
     }
     case ACTION_TYPES.CLEAR_ERRORS: {
         return {
             ...state,
             error: null
         }
     }
       default: return state;
    }
 }

export const AllOrdersReducer = (state = {orders: []}, action) => {
    switch (action.type) {
       
     case ACTION_TYPES.ALL_ORDERS_REQUEST: {
         return {
             loading: true
         }
     }
     case ACTION_TYPES.ALL_ORDERS_SUCCESS: {
         return {
             loading: false,
             orders: action.payload.orders,
             totalMount: action.payload.totalMount
         }
     }
     case ACTION_TYPES.ALL_ORDERS_FAILURE: {
         return {
             loading: false,
             error: action.payload
         }
     }
     case ACTION_TYPES.CLEAR_ERRORS: {
         return {
             ...state,
             error: null
         }
     }
       default: return state;
    }
 }

 
export const DelUpdOrderReducer = (state = {}, action) => {
    switch (action.type) {
          case ACTION_TYPES.UPDATE_ORDER_REQUEST:
            case ACTION_TYPES.DELETE_ORDER_REQUEST:
        return  {
            ...state,
            loading: true,
        }
        case ACTION_TYPES.UPDATE_ORDER_SUCCESS: 
        return  {
            ...state,
            loading: false,
            isUpdated: action.payload
        }
        case ACTION_TYPES.DELETE_ORDER_SUCCESS: 
        return  {
            ...state,
            loading: false,
            isDeleted: action.payload
        }
        case ACTION_TYPES.UPDATE_ORDER_FAILURE: 
        case ACTION_TYPES.DELETE_ORDER_FAILURE: 
        return  {
            ...state,
            loading: false,
            error: action.payload
        }
        case ACTION_TYPES.UPDATE_ORDER_RESET: 
        return  {
            ...state,
            isUpdated: false
        }
        case ACTION_TYPES.DELETE_ORDER_RESET: 
        return  {
            ...state,
            isDeleted: false
        }
        case ACTION_TYPES.CLEAR_ERRORS: 
           return  {
               ...state,
               error: null,
           }
        default: 
          return state;
    }
}




