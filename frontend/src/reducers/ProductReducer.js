import {ACTION_TYPES} from '../constants/ProductConst';

export const ProductReducer = ( state = { products:[] }, action) => {
        switch (action.type) {
         case ACTION_TYPES.ALL_PRODUCTS_REQUEST: 
           case ACTION_TYPES.ADMIN_PRODUCTS_REQUEST:
           return  {
               loading: true,
               products: []
           }
           case ACTION_TYPES.ALL_PRODUCTS_SUCCESS: 
           return  {
               loading: false,
               products: action.payload.products,
               productCount: action.payload.productCount,
               resPerPage: action.payload.resPerPage,
               filteredProductsCount: action.payload.filteredProductsCount
           }
           case ACTION_TYPES.ADMIN_PRODUCTS_SUCCESS: 
           return {
               loading: false,
               products: action.payload
           }
           case ACTION_TYPES.ALL_PRODUCTS_FAIL:
               case ACTION_TYPES.ADMIN_PRODUCTS_FAIL: 
           return  {
               loading: false,
               error: action.payload
           }
           case ACTION_TYPES.CLEAR_ERRORS: 
           return  {
               ...state,
               error: null,
           }
            default: return state;
        }
}

export const ProductDetailReducer = (state = { product: {}}, action) => {
    switch (action.type) {
        case ACTION_TYPES.GET_PRODUCT_DETAILS_REQUEST: 
        return  {
            ...state,
            loading: true,
        }
        case ACTION_TYPES.GET_PRODUCT_DETAILS_SUCCESS: 
        return  {
            loading: false,
            product: action.payload
        }
        case ACTION_TYPES.GET_PRODUCT_DETAILS_FAIL: 
        return  {
            ...state,
            loading: false,
            error: action.payload
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

export const NewReviewReducer = (state = {}, action) => {
    switch (action.type) {
        case ACTION_TYPES.NEW_REVIEW_PRODUCT_REQUEST: 
        return  {
            ...state,
            loading: true,
        }
        case ACTION_TYPES.NEW_REVIEW_PRODUCT_SUCCESS: 
        return  {
            loading: false,
            success: action.payload
        }
        case ACTION_TYPES.NEW_REVIEW_PRODUCT_FAIL: 
        return  {
            ...state,
            loading: false,
            error: action.payload
        }
        case ACTION_TYPES.NEW_REVIEW_PRODUCT_RESET: 
        return  {
            ...state,
            success: false
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

export const NewProductReducer = (state = { product: {}}, action) => {
    switch (action.type) {
        case ACTION_TYPES.NEW_PRODUCT_REQUEST: 
        return  {
            ...state,
            loading: true,
        }
        case ACTION_TYPES.NEW_PRODUCT_SUCCESS: 
        return  {
            loading: false,
            success: action.payload.success,
            product: action.payload.product
        }
        case ACTION_TYPES.NEW_PRODUCT_FAIL: 
        return  {
            ...state,
            loading: false,
            error: action.payload
        }
        case ACTION_TYPES.NEW_PRODUCT_RESET: 
        return  {
            ...state,
            success: false
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


export const DeleteProductReducer = (state = {}, action) => {
    switch (action.type) {
        case ACTION_TYPES.DELETE_PRODUCT_REQUEST: 
          case ACTION_TYPES.UPDATE_PRODUCT_REQUEST:
        return  {
            ...state,
            loading: true,
        }
        case ACTION_TYPES.DELETE_PRODUCT_SUCCESS: 
        return  {
            ...state,
            loading: false,
            isDeleted: action.payload
        }
        case ACTION_TYPES.UPDATE_PRODUCT_SUCCESS: 
        return  {
            ...state,
            loading: false,
            isUpdated: action.payload
        }
        case ACTION_TYPES.DELETE_PRODUCT_FAIL: 
          case ACTION_TYPES.UPDATE_PRODUCT_FAIL:
        return  {
            ...state,
            loading: false,
            error: action.payload
        }
        case ACTION_TYPES.DELETE_PRODUCT_RESET: 
        return  {
            ...state,
            isDeleted: false
        }
        case ACTION_TYPES.UPDATE_PRODUCT_RESET: 
        return  {
            ...state,
            isUpdated: false
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


export const ProductReviewsReducer = (state = { reviews: [] }, action) => {
    switch (action.type) {
        case ACTION_TYPES.GET_ALL_REVIEWS_REQUEST: 
        return  {
            ...state,
            loading: true,
        }
        case ACTION_TYPES.GET_ALL_REVIEWS_SUCCESS: 
        return  {
            loading: false,
            reviews: action.payload
        }
        case ACTION_TYPES.GET_ALL_REVIEWS_FAIL: 
        return  {
            ...state,
            loading: false,
            error: action.payload
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


export const DelReviewReducer = (state = {}, action) => {
    switch (action.type) {
        case ACTION_TYPES.DELETE_REVIEW_REQUEST: 
        return  {
            ...state,
            loading: true,
        }
        case ACTION_TYPES.DELETE_REVIEW_SUCCESS: 
        return  {
            ...state,
            loading: false,
            isDeleted: action.payload
        }
        case ACTION_TYPES.DELETE_REVIEW_FAIL: 
        return  {
            ...state,
            loading: false,
            error: action.payload
        }
        case ACTION_TYPES.DELETE_REVIEW_RESET: 
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





