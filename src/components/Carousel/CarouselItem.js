import React from 'react';
import './Carousel.scss';
import { shortenText } from '../../utils';
import { Link } from 'react-router-dom';



const CarouselItem = ({url , name , price , description}) => {
  return (
    <div className='carouselItem'>
                  <Link to="/product-details" >
                                    <img src={url} className='product--image' alt='network error '/>
                                    <p className='price'> {`NPR ${price}`}</p>
                                    <h4>{ shortenText(name ,18)}  </h4>
                                    <p className='--mb'> {shortenText(description ,26)} </p>
                  </Link>
                  <button className='--btn --btn-primary --btn-block '>Add To Cart</button>
                  <hr/>

    </div>
  )
}

export default CarouselItem