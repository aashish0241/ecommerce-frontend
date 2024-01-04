import ProductCarousel from "../../components/Carousel/Carouse";
import Slider from "../../components/slider/slider";
import HomeInfoBox from "./Homeinfo";
import CarouselItem from "../../components/Carousel/CarouselItem";
import { productData } from "../../components/Carousel/data";
import "./home.scss";
import ProductCategory from "./ProductCategory";
import FooterLink from "../../components/footer/footerLink";

const Home =()=>{
   const product = productData.map((item, index) => (
      <div key={index.id}>
        <CarouselItem
          name={item.name}
          url={item.imageurl}
          price={item.price}
          description={item.description}
        />
      </div>
    ));
    
                  const PageHeading =( {heading , btnText}) =>{
                                    return(
                                                      <>
                                                      <div className="--flex-between">
                                                                        <h1 className="--fw-thin">  {heading}</h1>
                                                                        <button className="--btn">{btnText}</button>
                                                                        </div>
                                                                        <div className="--hr">
                                                                                          </div></>
                                    )
                  }
                  
                  return(
                                  <>
                                 <Slider/>
                                 <section className="--bt-grey">
                                    <div className="container">
                                                      <HomeInfoBox/>
                                                      <PageHeading heading={"Latest Product"}  btnText={"Shop Now >>>"}/>
                                                      <ProductCarousel products={product}/>
                                    </div>
                                 </section>
                                 <section className="--bt-grey">
                                    <div className="container">
                                                     <h2> Category</h2>
                                                     <ProductCategory />
                                    </div>
                                 </section>
                                 <FooterLink/>
                                  </>
                  )
 }
 export default  Home