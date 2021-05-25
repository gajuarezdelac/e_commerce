import axios from 'axios';
import {ACTION_TYPES} from '../constants/ProductConst';

export const getProducts = (keyword = '',currentPage = 1,price,category,rating = 0) => async (dispatch) => {
    try {
       
        dispatch({type: ACTION_TYPES.ALL_PRODUCTS_REQUEST})
        
        let url = `/api/v1/product?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&ratings[gte]=${rating}` 
        if(category)(
            url = `/api/v1/product?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&category=${category}&ratings[gte]=${rating}`
        )

        const { data }  = await axios.get(url)
                
        dispatch({
            type: ACTION_TYPES.ALL_PRODUCTS_SUCCESS,
            payload: data
        })

    } catch (error) {
     dispatch({
         type: ACTION_TYPES.ALL_PRODUCTS_FAIL,
         payload: error.response.data.message
     })   
    }
}



export const updateProduct = (id,productData) => async (dispatch) => {
    try {
       
        dispatch({type: ACTION_TYPES.UPDATE_PRODUCT_REQUEST})

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        
        const { data }  = await axios.put(`/api/v1/admin/product/${id}`,productData,config);

        dispatch({
            type: ACTION_TYPES.UPDATE_PRODUCT_SUCCESS,
            payload: data.success
        })

    } catch (error) {
     dispatch({
         type: ACTION_TYPES.UPDATE_PRODUCT_FAIL,
         payload: error.response.data.message
     })   
    }
}

export const getProductDetails = (id) => async (dispatch) => {
    try {
       
        dispatch({type: ACTION_TYPES.GET_PRODUCT_DETAILS_REQUEST})

        const { data }  = await axios.get(`/api/v1/product/${id}`)
        
        dispatch({
            type: ACTION_TYPES.GET_PRODUCT_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
     dispatch({
         type: ACTION_TYPES.GET_PRODUCT_DETAILS_FAIL,
         payload: error.response.data.message
     })   
    }
}

export const getProductsAdmin = () => async (dispatch) => {
    try {
       
        dispatch({type: ACTION_TYPES.ADMIN_PRODUCTS_REQUEST})

        const { data }  = await axios.get(`/api/v1/admin/products`)
        
        dispatch({
            type: ACTION_TYPES.ADMIN_PRODUCTS_SUCCESS,
            payload: data.products
        })

    } catch (error) {
     dispatch({
         type: ACTION_TYPES.ADMIN_PRODUCTS_FAIL,
         payload: error.response.data.message
     })   
    }
}


export const newReviewProduct = (reviewData) => async (dispatch) => {
    try {
       
        dispatch({type: ACTION_TYPES.NEW_REVIEW_PRODUCT_REQUEST})

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
  
        const { data }  = await axios.put(`/api/v1/review`,reviewData,config);
        
        dispatch({
            type: ACTION_TYPES.NEW_REVIEW_PRODUCT_SUCCESS,
            payload: data.success
        })

    } catch (error) {
     dispatch({
         type: ACTION_TYPES.NEW_REVIEW_PRODUCT_FAIL,
         payload: error.response.data.message
     })   
    }
}


export const newProduct = (newProduct) => async (dispatch) => {
    try {
       
        dispatch({type: ACTION_TYPES.NEW_PRODUCT_REQUEST})

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data }  = await axios.post(`/api/v1/admin/product/new`,newProduct,config);
        
        dispatch({
            type: ACTION_TYPES.NEW_PRODUCT_SUCCESS,
            payload: data
        })

    } catch (error) {
     dispatch({
         type: ACTION_TYPES.NEW_PRODUCT_FAIL,
         payload: error.response.data.message
     })   
    }
}



export const deleteProduct = (id) => async (dispatch) => {
    try {
       
        dispatch({type: ACTION_TYPES.DELETE_PRODUCT_REQUEST})

        const { data }  = await axios.delete(`/api/v1/admin/product/${id}`);
        
        dispatch({
            type: ACTION_TYPES.DELETE_PRODUCT_SUCCESS,
            payload: data
        })

    } catch (error) {
     dispatch({
         type: ACTION_TYPES.DELETE_PRODUCT_FAIL,
         payload: error.response.data.message
     })   
    }
}


export const getReviewsProduct = (id) => async (dispatch) => {
    try {
       
        dispatch({type: ACTION_TYPES.GET_ALL_REVIEWS_REQUEST})

        const { data }  = await axios.get(`/api/v1/reviews?id=${id}`)
        
        dispatch({
            type: ACTION_TYPES.GET_ALL_REVIEWS_SUCCESS,
            payload: data.reviews
        })

    } catch (error) {
     dispatch({
         type: ACTION_TYPES.GET_ALL_REVIEWS_FAIL,
         payload: error.response.data.message
     })   
    }
}

export const deleteReviewProduct = (id,productId) =>  async (dispatch) => { 
    try {
       
        dispatch({type: ACTION_TYPES.DELETE_REVIEW_REQUEST})

        const { data }  = await axios.delete(`/api/v1/reviews?id=${id}&productId=${productId}`)
        
        dispatch({
            type: ACTION_TYPES.DELETE_REVIEW_SUCCESS,
            payload: data.success
        })

    } catch (error) {
     dispatch({
         type: ACTION_TYPES.DELETE_REVIEW_FAIL,
         payload: error.response.data.message
     })   
    }
}






export const clearError = () => async (dispatch) => {
    dispatch({
        type: ACTION_TYPES.CLEAR_ERRORS
    })
}
