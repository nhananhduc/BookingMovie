import React, { useEffect } from 'react'
import { Carousel } from 'antd';
import { useDispatch, useSelector } from 'react-redux'
import { getCarouselAction } from '../../../../redux/actions/CarouselAction';
import './HomeCarousel.css'

const contentStyle = {
    height: '700px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat'
};

export default function HomeCarousel() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCarouselAction())
    }, [])
    const { arrImg } = useSelector(state => state.CarouselReducer)

    const renderImg = () => {
        return arrImg.map((item, index) => {
            return <div key={index}>
                <div style={{ ...contentStyle, backgroundImage: `url(${item.hinhAnh})` }}>
                    <img src={item.hinhAnh} className='w-full opacity-0' alt="poster" />
                </div>
            </div>
        })
    }
    return (
        <Carousel autoplay={true} effect="fade" >
            {renderImg()}
        </Carousel>
    )
}
