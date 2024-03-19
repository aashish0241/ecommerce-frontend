import React, { useEffect, useState } from 'react';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import { sliderData } from "./slider-data";
import styles from './slider.scss';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate =useNavigate();
  const slideData = sliderData.length
  const autoscroll =true
  let slideInterval;
  const intervalTime =4000

  const prevSlide = () => {    setCurrentSlide((prevSlide) => (prevSlide === 0 ? sliderData.length - 1 : prevSlide - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === sliderData.length - 1 ? 0 : prevSlide + 1));
  };
  useEffect (()=>
  {
                  setCurrentSlide(0);
  }, [])
  useEffect (()=>
  {
                 if(autoscroll)
                 {
                  const auto =()=>{
                                    slideInterval = setInterval(nextSlide, intervalTime)
                  }
                  auto()
                 }
                 return()=> clearInterval(slideInterval)
  }, [currentSlide ,intervalTime , autoscroll]);

  return (
    <div className="slider">
      <AiOutlineArrowLeft className="arrow prev" onClick={prevSlide} />
      <AiOutlineArrowRight className="arrow next" onClick={nextSlide} />

      {sliderData.map((slide, index) => {
        const { image, heading, desc } = slide;
        return (
          <div key={index} className={index === currentSlide ? "slide current" : "slide"}>
            {index === currentSlide && (
              <>
                <img src={image} alt="network error" />
                <div className="content">
                  <span className="span1"></span>
                  <span className="span2"></span>
                  <span className="span3"></span>
                  <span className="span4"></span>
                  <h2>{heading}</h2>
                  <p>{desc}</p>
                  <hr />
                  <Link to="/login">
                  <button className="--btn --btn-primary" onClick={() =>navigate("/shop")}>Shop Now</button>
                  </Link>
                </div>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Slider;
