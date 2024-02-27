import { Component } from "react";
import Slider from "react-slick";
import "./Slider.css"
import img1 from "./img/img1.jfif";
import img2 from "./img/img2.jpg";
import img3 from "./img/img3.png";
import img4 from "./img/img4.png";
import img5 from "./img/img5.jfif";
import img6 from "./img/img3.jpg";


export default class SimpleSlider extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true, 
      autoplaySpeed: 4000,
    };
    return (
      <div
        style={{
          width: "90%",
          margin: "0 auto",
          borderRadius: "8px",
          border: "none",
        }}
      >
        {/* <h2> Single Item</h2> */}
        <Slider {...settings}>
          <div className="d-flex">
            <img src={img3} alt="slide-1" className="Slider-img" />
            {/* <img src={img1} alt="slide-1" className="Slider-img" /> */}
          </div>
          <div>
            <img src={img2} alt="slide-2" className="Slider-img" />
          </div>
          <div>
            <img src={img1} alt="slide-3" className="Slider-img" />
          </div>
          <div>
            <img src={img4} alt="slide-4" className="Slider-img" />
          </div>
          <div>
            <img src={img5} alt="slide-5" className="Slider-img" />
          </div>
          <div>
            <img src={img6} alt="slide-6" className="Slider-img" />
          </div>
        </Slider>
      </div>
    );
  }
}
