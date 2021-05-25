import {ACTION_TYPES} from '../constants/CartConst';

export const CartReducer = (state = { cartItems: [], shippingInfo: {} }, action) => {
    switch (action.type) {
        case ACTION_TYPES.ADD_TO_CART:
            
            const item = action.payload;
            const itemExists = state.cartItems.find(i => i.product === item.product);

            if(itemExists){
               return {
                   ...state,
                   cartItems: state.cartItems.map(i => i.product === itemExists.product  ? item : i)
               }
            }else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item]
                }
            }

        case ACTION_TYPES.REMOVE_ITEM_CART: {
            return {
                ...state,
                cartItems: state.cartItems.filter(i => i.product !== action.payload)
            }
        }
        case ACTION_TYPES.SAVE_SHIPPING_INFO: {
            return  {
                ...state,
                shippingInfo: action.payload
            }
        }

        default: return state;
    }
}