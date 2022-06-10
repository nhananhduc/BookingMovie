import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MultipleRows from '../../components/RSlick/MultipleRows';
import { layDanhSachPhimAction } from '../../redux/actions/QuanLyPhimAction';
import { layDanhSachHeThongRapAction } from '../../redux/actions/QuanLyRapAction';
import HomeCarousel from '../../templates/HomeTemplate/Layout/HomeCarousel/HomeCarousel';
import HomeMenu from './HomeMenu/HomeMenu'

export default function Home(props) {
  const { arrFilm } = useSelector(state => state.QuanLyPhimReducer);
  const { heThongRapChieu } = useSelector(state => state.QuanLyRapReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(layDanhSachPhimAction())
    dispatch(layDanhSachHeThongRapAction())
  }, [])
  return (
    <div>
      <HomeCarousel />
      <section >
        <div className="container px-2 py-5 mx-auto">
          <MultipleRows arrFilm={arrFilm} />
        </div>
      </section>
      <div className='container px-2 py-5 mx-auto'>
        <HomeMenu  heThongRapChieu={heThongRapChieu} />
      </div>
    </div>
  )
}
