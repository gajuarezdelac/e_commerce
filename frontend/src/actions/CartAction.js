import axios from 'axios';
import {ACTION_TYPES} from '../constants/CartConst';

export const addItemToCart = (id,quantity) => async (dispatch,getState) => {
   
  const {data } = await axios.get(`/api/v1/product/${id}`)  

  dispatch({
      type: ACTION_TYPES.ADD_TO_CART,
      payload: {
          product: data.product._id,
          name: data.product.name,
          price: data.product.price,
          image: data.product.images[0].url,
          stock: data.product.stock,
          quantity
      }
  })

  localStorage.setItem('cartItem',JSON.stringify(getState().cart.cartItems))

}

export const removeItemFromCart = (id) =>  (dispatch,getState) => {
   
  dispatch({
      type: ACTION_TYPES.REMOVE_ITEM_CART,
      payload: id
  })

  localStorage.setItem('cartItem',JSON.stringify(getState().cart.cartItems))
}


export const saveShippingInfo = (data) =>  (dispatch) => {
   
  dispatch({
      type: ACTION_TYPES.SAVE_SHIPPING_INFO,
      payload: data
  })

  localStorage.setItem('shippingInfo',JSON.stringify(data))
}

