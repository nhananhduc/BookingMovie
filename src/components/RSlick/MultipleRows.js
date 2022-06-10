import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Slider from "react-slick";
import { SET_FILM_DANG_CHIEU, SET_FILM_SAP_CHIEU } from "../../redux/actions/types/QuanLyPhimType";
import FilmFlip from "../Film/FilmFlip";
import styleSlick from './MultipleRowsSlick.module.css'


function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} ${styleSlick['slick-next']}`}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} ${styleSlick['slick-prev']}`}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    />
  );
}

const MultipleRows = (props) => {
  // const { dangChieu, sapChieu } = useSelector(state => state.QuanLyPhimReducer);
  const [activeClassDC, setActiveClassDC] = useState('active_Film');
  const [activeClassSC, setActiveClassSC] = useState('non_active_Film');
  const dispatch = useDispatch();
  const renderFilm = () => {
    return props.arrFilm.slice(0, 12).map((item, index) => {
      return <div key={index}><FilmFlip item={item} /></div>
    })
  }

  // let activeClassDangChieu = dangChieu === true ? 'active_Film' : 'none_active_Film';
  // let activeClassSapChieu = sapChieu === true ? 'active_Film' : 'none_active_Film';

  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 2,
    speed: 500,
    rows: 2,
    slidesPerRow: 2,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 1.5
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesPerRow: 1
        }
      }
    ]
  }

  return (
    <div>
      <div className="flex justify-center items-center pt-5 mb-5 lg:mb-10">
        <div className="w-full hidden md:block h-0.5 bg-gray-500"></div>
        <h3 className="w-4/6 text-center font-bold text-transparent text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-500 ">MOVIE SELECTION</h3>
        <div className="w-full hidden md:block h-0.5 bg-gray-500"></div>
      </div>
      <button type="button" className={`${styleSlick[activeClassDC]} px-4 py-2 lg:px-8 lg:py-3 font-bold rounded-full text-white mr-2 mb-2 hover:bg-gray-600 transition duration-300`} onClick={() => {
        const action = {
          type: SET_FILM_DANG_CHIEU
        }
        dispatch(action)
        setActiveClassDC('active_Film')
        setActiveClassSC('non_active_Film')
      }}>NOW SHOWING</button>
      <button type="button" className={`${styleSlick[activeClassSC]} px-4 py-2 lg:px-8 lg:py-3 font-bold rounded-full text-white hover:bg-gray-600 transition duration-300`} onClick={() => {
        const action = {
          type: SET_FILM_SAP_CHIEU
        }
        dispatch(action)
        setActiveClassDC('non_active_Film')
        setActiveClassSC('active_Film')
      }}>COMING SOON</button>
      <Slider {...settings}>
        {renderFilm()}
      </Slider>
    </div>
  );
}


export default MultipleRows