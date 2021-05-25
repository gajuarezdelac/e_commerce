import React, { Fragment,useState ,useEffect } from 'react';
import MetaData from './Layout/MetaData';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../actions/ProductAction';


// Components
import CardComponent from  './card/CardComponent';
import Loader from './Layout/Loader';
import {useAlert} from 'react-alert';
import Pagination from "react-js-pagination";
import Slider from "rc-slider";
import 'rc-slider/assets/index.css';

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);

const Home = ({match}) => {
  
  const [currentPage, setCurrentPage] = useState(1);
  const alert = useAlert();
  const dispatch = useDispatch();
  const [price, setPrice] = useState([1,1000]);
  const [category, setCategory] = useState('');
  const [rating, setRating] = useState(0);

  const categories = [
    'Electronics',
    'Cameras',
    'Laptops',
    'Accessories',
    'Headphones',
    'Food',
    'Books',
    'Clothes/shoes',
    'Beauty/Healt', 
    'Sports', 
    'Outdoor',
    'Home'
  ];

  const {
    loading,
    products,
    error,
    productCount,
    resPerPage,
    filteredProductsCount
  } = useSelector(state => state.ProductReducer);

  const keyword = match.params.keyword;

  useEffect(() => {
    
    if(error) {
      return  alert.error(error);
    }
    dispatch(getProducts(keyword,currentPage,price,category,rating));
    
  },[dispatch,alert,error,keyword,currentPage,price,category,rating])

  function setCurrentPageNo(pageNumber) {
    setCurrentPage(pageNumber)
  }

  let count = productCount;
  if(keyword ){
    count = filteredProductsCount
  }
  
   return ( 
        <Fragment>
     {loading ? <Loader/> : (
        <Fragment>

     <h1 id="products_heading"> Latest Product </h1>
      <MetaData title="Buy Best Products !!!!"/> 

     <section id="products" className="container mt-5">
      <div className="row">

        

      { keyword ? (
        <Fragment>
           
          <div  className="col-6 col-md-3 mt-5 mb-5">           
            <div className="px-5">


<div>
<button type="button" class="btn btn-outline-primary"  onClick={() => {
  setCategory('');
  setRating(0);
}}>Limpiar filtros</button>
</div> 

<hr className="my-4" />

              <Range
              marks={{
                1 : `$1`,
                1000 : `$1000`
              }}
              min={1}
              max={1000}
              defaultValue={[1,1000]}
              tipFormatter={value => `$${value}`}
              tipProps={{
                placement: 'top',
                visible: true
              }}
              value={price}
              onChange={price => setPrice(price)}
              />

             <hr className="my-2" />

             <div className="mt-5">
               <h4 className="mb-3">
                 Categories
               </h4>

               <ul className="pl-0">
                 {categories.map(category => (
                   <li
                   style={{cursor: 'pointer',listStyle:'none'}}
                   key={category}
                   onClick={() => setCategory(category)}
                   >
                     {category}
                   </li>
                 ))}
               </ul>
             </div> 


              <hr className="my-2" />

             <div className="mt-5">
               <h4 className="mb-3">
                 Ratings
               </h4>

               <ul className="pl-0">
                 {[5,4,3,2,1].map(start => (
                   <li
                   style={{cursor: 'pointer',listStyle:'none'}}
                   key={start}
                   onClick={() => {
                    setRating(start)
                    console.log(start)
                   }}
                   >
                     <div className="rating-outer">
                       <div className="rating-inner"
                       style={{width: `${start * 20}%`}}
                       >
                       </div>
                     </div>
                   </li>
                 ))
                 
                 }
               </ul>
             </div> 
            
          </div>
        </div>

          <div className='col-6 col-md-9'>
                <div className="row">
                      {
                        products && 
                        products.map(product => (
                          <CardComponent key={product._id} 
                          image={product.images[0].url} 
                          productName={product.name} 
                          price={product.price} reviews={product.numOfReviews} ratings={product.ratings} 
                          _id={product._id}
                          col={4}
                          />
                        ))
                      }
                </div>
          </div>

        </Fragment>
      ) : (
        products && 
        products.map(product => (
          <CardComponent key={product._id} 
          image={product.images[0].url} 
          productName={product.name} 
          price={product.price} reviews={product.numOfReviews} ratings={product.ratings} 
          _id={product._id}
          col={3}
          />
        ))
      )
      }

         </div>
     </section>
      
     {resPerPage <= count && (
        <div className="d-flex justify-content-center mt-5" >
        <Pagination
        activePage={currentPage}
        itemsCountPerPage={resPerPage}
        totalItemsCount={productCount}
        onChange={setCurrentPageNo}
        nextPageText={'Next'}
        prevPageText={'Prev'}
        firstPageText={'First'}
        lastPageText={'Last'}
        itemClass="page-item"
        linkClass="page-link"
        />
      </div>
     )}
      
        </Fragment>
      )}
        

    
        </Fragment>
     );
}
 
export default Home;