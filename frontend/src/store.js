import { createStore,combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {ProductReducer, ProductDetailReducer,NewReviewReducer,NewProductReducer,DeleteProductReducer,ProductReviewsReducer,DelReviewReducer } from './reducers/ProductReducer';
import { AuthReducer,UserReducer,ForgotPasswordReducer,GetAllUsersReducer,UserDetailsReducer } from './reducers/userReducer';
import {CartReducer} from './reducers/CartReducer';
import { newOrderReducer,MyOrderReducer,OrderDetailsReducer,AllOrdersReducer,DelUpdOrderReducer } from './reducers/OrderReducer';

const reducer = combineReducers({
  ProductReducer,
  ProductDetailReducer,
  AuthReducer,
  UserReducer,
  ForgotPasswordReducer,
  cart: CartReducer,
  newOrderReducer,
  MyOrderReducer,
  OrderDetailsReducer,
  NewReviewReducer,
  NewProductReducer,
  DeleteProductReducer,
  AllOrdersReducer,
  DelUpdOrderReducer,
  GetAllUsersReducer,
  UserDetailsReducer,
  ProductReviewsReducer,
  DelReviewReducer
})
// Unicamente se uso en la parte del agregado al carrito
let initialState = {
   cart: {
     cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
     shippingInfo: localStorage.getItem('shippingInfo') ? JSON.parse(localStorage.getItem('shippingInfo')) : {}
    },
}
const middleware = [thunk];

const store = createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middleware)));

export default store;