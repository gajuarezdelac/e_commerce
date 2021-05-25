import React from 'react';
import {Link} from 'react-router-dom';


const CardComponent = (props) => {
    return ( 
        <div className={`col-sm-12 col-md-6 col-lg-${props.col} my-3`}>
          <div className="card p-3 rounded">
            <img
              className="card-img-top mx-auto"
              src={props.image}
              alt={props.image}
            />
            <div className="card-body d-flex flex-column">
              <h5 className="card-title">
                <Link to={`/product/${props._id}`}>{props.productName}</Link>
              </h5>
              <div className="ratings mt-auto">
                <div className="rating-outer">
                  <div className="rating-inner" style={{ width: `${(props.ratings / 5) * 100}%`}}></div>
                </div>
                <span id="no_of_reviews">({props.reviews} reviews)</span>
              </div>
              <p className="card-text">${props.price}</p>
              <Link to={`/product/${props._id}`} id="view_btn" className="btn btn-block">View Details</Link>
            </div>
          </div>
        </div>
     );
}
 
export default CardComponent;