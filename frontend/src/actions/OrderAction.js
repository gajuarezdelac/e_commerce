import {ACTION_TYPES} from '../constants/OrderConst';
import axios from 'axios';

export const createOrder = (order) => async (dispatch,getState) => {
  try {
    
      dispatch({type: ACTION_TYPES.CREATE_ORDER_REQUEST});

      const config = {
          headers: {
              'Content-Type': 'application/json'
          }
      }

      const {data} = await axios.post('/api/v1/order/new',order,config);
      dispatch({type: ACTION_TYPES.CREATE_ORDER_SUCCESS, payload: data});

  } catch (error) {
      dispatch({
          type: ACTION_TYPES.CREATE_ORDER_FAILURE,
          payload:error.response.data.message
      })
  }
}


export const myOrders = () => async (dispatch) => {
    try {
      
        dispatch({type: ACTION_TYPES.MY_ORDERS_REQUEST});
  
        const {data} = await axios.get('/api/v1/orders/user');

        dispatch({type: ACTION_TYPES.MY_ORDERS_SUCCESS, payload: data.orders});
  
    } catch (error) {
        dispatch({
            type: ACTION_TYPES.MY_ORDERS_FAILURE,
            payload:error.response.data.message
        })
    }
  }


  export const getOrderDetails = (id) => async (dispatch) => {
      try {
        dispatch({type: ACTION_TYPES.ORDERS_DETAILS_REQUEST});
  
        const {data} = await axios.get(`/api/v1/order/${id}`);
        dispatch({type: ACTION_TYPES.ORDERS_DETAILS_SUCCESS, payload: data.order});

      } catch (error) {
        dispatch({
            type: ACTION_TYPES.ORDERS_DETAILS_FAILURE,
            payload:error.response.data.message
        })
      }
  }

  
  export const getOAllrders = () => async (dispatch) => {
    try {
      dispatch({type: ACTION_TYPES.ALL_ORDERS_REQUEST});

      const {data} = await axios.get(`/api/v1/orders/all`);
      dispatch({type: ACTION_TYPES.ALL_ORDERS_SUCCESS, payload: data});

    } catch (error) {
      dispatch({
          type: ACTION_TYPES.ALL_ORDERS_FAILURE,
          payload:error.response.data.message
      })
    }
}


export const updatedOrder = (id,order) => async (dispatch) => {
    try {
      
        dispatch({type: ACTION_TYPES.UPDATE_ORDER_REQUEST});
  
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
  
        const {data} = await axios.put(`/api/v1/order/${id}`,order,config);
        dispatch({type: ACTION_TYPES.UPDATE_ORDER_SUCCESS, payload: data.success});
  
    } catch (error) {
        dispatch({
            type: ACTION_TYPES.UPDATE_ORDER_FAILURE,
            payload:error.response.data.message
        })
    }
  }

  
export const deleteOrder = (id) => async (dispatch) => {
    try {
      
        dispatch({type: ACTION_TYPES.DELETE_ORDER_REQUEST});
  
        const {data} = await axios.delete(`/api/v1/order/${id}`);
        dispatch({type: ACTION_TYPES.DELETE_ORDER_SUCCESS, payload: data.success});
  
    } catch (error) {
        dispatch({
            type: ACTION_TYPES.DELETE_ORDER_FAILURE,
            payload:error.response.data.message
        })
    }
  }
  

export const clearError = () => async (dispatch) => {
    dispatch({
        type: ACTION_TYPES.CLEAR_ERRORS
    })
}
