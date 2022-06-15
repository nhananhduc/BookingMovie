import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { datGheAction, datVeAction, layChiTietPhongVeAction } from '../../redux/actions/QuanLyDatVeAction'

import './CheckOut.css'
import { PhoneOutlined, CaretLeftOutlined } from '@ant-design/icons'
import { Tabs } from 'antd';

import { CHANGE_TAB_ACTIVE, DAT_GHE } from '../../redux/actions/types/QuanLyDatVeType'
import _ from 'lodash'
import { layThongTinUserAction } from '../../redux/actions/QuanLyUserAction'
import moment from 'moment'
import { connection } from '../../index'
import { history } from '../../App'

function ChonGhe(props) {
  const { userLogin } = useSelector(state => state.QuanLyUserReducer)
  const { chiTietPhongVe, danhSachGheDangDat, danhSachGheKhachDat } = useSelector(state => state.QuanLyDatVeReducer)

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(layChiTietPhongVeAction(props.match.params.id));
    connection.on('datVeThanhCong', () => {
      dispatch(layChiTietPhongVeAction(props.match.params.id));
    });
    connection.invoke('loadDanhSachGhe', props.match.params.id);
    connection.on('loadDanhSachGheDaDat', (dsGheKhachDat) => {
      dsGheKhachDat = dsGheKhachDat.filter(item => item.taiKhoan !== userLogin.taiKhoan);
      let arrGheKhachDat = dsGheKhachDat.reduce((result, item, index) => {
        let arrGhe = JSON.parse(item.danhSachGhe);
        return [...result, ...arrGhe];
      }, []);
      arrGheKhachDat = _.uniqBy(arrGheKhachDat, 'maGhe');
      dispatch({
        type: DAT_GHE,
        arrGheKhachDat
      })
    })
    window.addEventListener("beforeunload", clearGhe);
    return () => {
      clearGhe();
      window.removeEventListener('beforeunload', clearGhe);
    }
  }, [])
  const clearGhe = function (event) {
    connection.invoke('huyDat', userLogin.taiKhoan, props.match.params.id);

  }
  const { thongTinPhim, danhSachGhe } = chiTietPhongVe


  const renderSeats = () => {
    return danhSachGhe?.map((ghe, index) => {
      let classGheVip = ghe.loaiGhe === 'Vip' ? 'gheVip' : '';
      let classGheDaDat = ghe.daDat === true ? 'gheDaDat' : '';
      let classGheDangDat = '';
      let indexGheDangDat = danhSachGheDangDat.findIndex(gheDangDat => gheDangDat.maGhe === ghe.maGhe);
      let classGheKhachDat = '';
      let indexGheKhachDat = danhSachGheKhachDat.findIndex(gheKhachDat => gheKhachDat.maGhe === ghe.maGhe);
      if (indexGheKhachDat !== -1) {
        classGheKhachDat = 'gheKhachDat'
      }
      let classGheDaDuocDat = '';
      if (userLogin.taiKhoan === ghe.taiKhoanNguoiDat) {
        classGheDaDuocDat = 'gheDaDuocDat'
      }
      if (indexGheDangDat !== -1) {
        classGheDangDat = 'gheDangDat'
      }
      return <Fragment key={index}>
        <button onClick={() => {
          dispatch(datGheAction(ghe, props.match.params.id))
        }} disabled={ghe.daDat || classGheKhachDat !== ''}
          className={`text-ss md:text-xs w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-6 md:h-6 2xl:w-8 2xl:h-8 ghe ${classGheVip} ${classGheDaDat} ${classGheDangDat} ${classGheDaDuocDat} ${classGheKhachDat}`} >
          {ghe.daDat ? classGheDaDuocDat !== '' ? ghe.stt : ghe.stt : ghe.stt}
        </button>
        {(index + 1) % 16 === 0 ? <br /> : ''}
      </Fragment>

    })
  }
  return (
    <div className='mt-5'>
      <div className='grid grid-cols-12'>
        <div className='col-span-full lg:col-span-10 flex flex-col justify-center items-center mt-5'>
          <div className='trapezoid w-full xl:w-2/3'>
            <h3 className='text-gray-600 text-2xl text-center screen'>S C R E E N</h3>
          </div>
          <div className='text-white mt-10'>
            {renderSeats()}
          </div>
        </div>

        <div className='col-span-full lg:col-span-2 flex items-center'>
          <div className='grid grid-cols-6'>
            <div className='col-span-full mt-10 grid grid-cols-6 lg:grid-cols-1'>
              <div className='flex col-span-2 md:col-span-1 justify-start lg:justify-start md:justify-center items-center mb-3'>
                <div>
                  <button className='ghe_chuthich text-center'></button>
                </div>
                <p className='mb-0 text-xs lg:text-sm'>Standard</p>
              </div>
              <div className='flex col-span-2 md:col-span-1 justify-start lg:justify-start md:justify-center items-center mb-3'>
                <div>
                  <button className='ghe_chuthich gheDangDat text-center'></button>
                </div>
                <p className='mb-0 text-xs lg:text-sm'>Checked</p>
              </div>
              <div className='flex col-span-2 md:col-span-1 justify-start lg:justify-start md:justify-center items-center mb-3'>
                <div>
                  <button className='ghe_chuthich gheDaDat'></button>
                </div>
                <p className='mb-0 text-xs lg:text-sm'>Occupied</p>
              </div>
              <div className='flex col-span-2 md:col-span-1 justify-start lg:justify-start md:justify-center items-center mb-3'>
                <div>
                  <button className='ghe_chuthich gheVip'></button>
                </div>
                <p className='mb-0 text-xs lg:text-sm'>VIP</p>
              </div>
              <div className='flex col-span-2 md:col-span-1 justify-start lg:justify-start md:justify-center items-center mb-3'>
                <div>
                  <button className='ghe_chuthich gheDaDuocDat'></button>
                </div>
                <p className='mb-0 text-xs lg:text-sm'>Your booked</p>
              </div>
              <div className='flex col-span-2 md:col-span-1 justify-start lg:justify-start md:justify-center items-center mb-3'>
                <div>
                  <button className='ghe_chuthich gheKhachDat'></button>
                </div>
                <p className='mb-0 text-xs lg:text-sm'>Occupied (real time)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=' flex justify-center'>
        <div className='grid grid-cols-10 p-2 border ticket text-black'>
          <div className='pl-3 col-span-2 lg:col-span-1' style={{ backgroundImage: `url(${thongTinPhim?.hinhAnh})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
          </div>
          <div className='col-span-8 sm:col-span-8 lg:col-span-2 pl-2'>
            <h3 className='text-xl mt-5 m-0'>{thongTinPhim?.tenPhim}</h3>
            <div className='text-base'>
              <span>Seat: </span>
              {_.sortBy(danhSachGheDangDat, ['stt']).map((gheDangDat, index) => {
                return index === 0 ?
                  <span key={index} >{gheDangDat.stt}</span>
                  : <span key={index} >-{gheDangDat.stt}</span>
              })}
            </div>
          </div>
          <div className='text-base col-span-3 sm:col-span-2 md:col-span-1 xl:text-lg lg:pl-5 mt-5'>
            <p className='mb-0'>Theater </p>
            <p className='mb-0'>Showtimes </p>
          </div>
          <div className='col-span-7 md:col-span-4 lg:col-span-3 text-base xl:text-lg font-semibold ml-3 mt-5'>
            <p className='mb-0'>{thongTinPhim?.tenRap} - {thongTinPhim?.tenCumRap}</p>
            <p className='mb-0'>{thongTinPhim?.gioChieu} - {thongTinPhim?.ngayChieu} </p>
          </div>
          <div className='mt-5 col-span-3 sm:col-span-2 md:col-span-1'>
            <p className='mb-0 text-base xl:text-lg'>Total:</p>
            <span className='text-lg font-semibold'>đ{danhSachGheDangDat.reduce((tongTien, ghe, index) => {
              return tongTien += ghe.giaVe
            }, 0).toLocaleString()}</span>
          </div>
          <div className='flex justify-center col-span-3 md:col-span-2 lg:col-span-1'>
            <button onClick={() => {
              const thongTinDatVe = {
                maLichChieu: props.match.params.id,
                danhSachVe: danhSachGheDangDat
              }
              dispatch(datVeAction(thongTinDatVe))
            }} className='w-20 h-20 xl:w-24 xl:h-24 flex-col justify-center items-center mt-3 cursor-pointer px-1 py-1 bg-red-600 text-center text-white font-semibold text-sm xl:text-lg leading-tight uppercase shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg rounded-2xl border-2 border-red-800 transition duration-150 ease-in-out'>
              <PhoneOutlined style={{ fontSize: '25px', marginTop: '18px' }} />
              <p className='mb-0 mt-1'>BOOKING</p>
            </button>
          </div>
          <div className='flex justify-center col-span-3 md:col-span-2 lg:col-span-1'>
            <button className='w-20 h-20 xl:w-24 xl:h-24 flex-col justify-center items-center mt-3 cursor-pointer px-1 py-1 bg-gray-600 text-center  text-white font-semibold text-sm xl:text-lg leading-tight uppercase shadow-md hover:bg-gray-700 hover:shadow-lg focus:bg-gray-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-800 active:shadow-lg rounded-2xl border-2 border-white transition duration-150 ease-in-out' onClick={() => {
              history.goBack()
            }}>
              <CaretLeftOutlined style={{ fontSize: '25px', marginTop: '18px' }} />
              <p className='mb-0 mt-1'>GO BACK</p>
            </button>
          </div>
        </div>
      </div>
    </div>

  )
}

function KetQuaDatVe(props) {
  const dispatch = useDispatch()
  const { thongTinUser } = useSelector(state => state.QuanLyUserReducer);
  useEffect(() => {

    dispatch(layThongTinUserAction())

  }, [])



  return <section className="text-white body-font">
    <div className=" px-5 py-5 mx-auto">
      <div className="flex flex-col text-center w-full mb-10">
        <div className='flex justify-center'>
          <img style={{ width: '200px' }} src={require('../../assets/MovieTime/movieTime.png')} alt='movieTime' />
        </div>
        <p className="lg:w-2/3 mx-auto leading-relaxed text-lg italic">"Let's enjoy the movie ^^!"</p>
      </div>
      <div className="flex flex-wrap -m-2 ">
        {thongTinUser.thongTinDatVe?.map((ticket, index) => {
          const seats = _.first(ticket.danhSachGhe)
          return <div key={index} className="p-2 lg:w-1/3 md:w-1/2 w-full ">
            <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg bg-gradient-to-r from-pink-500 to-orange-400">
              <img alt="poster" className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 mr-4" src={ticket.hinhAnh} />
              <div className="flex-grow">
                <h2 className="text-white title-font font-medium">{ticket.tenPhim}</h2>
                <p className=" mb-0">Showtimes: {moment(ticket.ngayDat).format('hh:mm A')} - {moment(ticket.ngayDat).format('DD-MM-YYYY')}</p>
                <p className=" mb-0">Theater: {seats.tenHeThongRap} - {seats.tenCumRap}</p>
                <p>Seat: {ticket.danhSachGhe.map((ghe, index) => {
                  return index === 0 ? <span key={index}>{ghe.tenGhe}</span> : <span key={index}>-{ghe.tenGhe}</span>
                })}</p>
              </div>
            </div>
          </div>
        })}

      </div>
    </div>
  </section>

}

const { TabPane } = Tabs;

export default function CheckOut(props) {
  useEffect(() => {
    return () => {
      dispatch({
        type: CHANGE_TAB_ACTIVE,
        number: '1'
      })
    }
  }, [])

  const { tabActive } = useSelector(state => state.QuanLyDatVeReducer)

  const dispatch = useDispatch()
  return <div className='p-5 text-white'>
    <h3 className="text-center font-bold text-transparent text-xl lg:text-2xl xl:text-4xl bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-500 lg:pt-5 mb-5 lg:mb-10">BOOKING ONLINE</h3>
    <Tabs style={{ color: 'white' }} defaultActiveKey='1' activeKey={tabActive} onChange={(key) => {
      dispatch({
        type: CHANGE_TAB_ACTIVE,
        number: key
      })
    }}>
      <TabPane tab={
        <div className='text-sm md:text-base lg:text-lg font-semibold text-white hover:text-gray-400'>01. CHOOSING YOUR SEAT</div>
      } key="1">
        <ChonGhe{...props} />
      </TabPane>
      <TabPane tab={<div className='text-sm md:text-base lg:text-lg font-semibold text-white hover:text-gray-400'>02. YOUR TICKETS</div>} key="2" >
        <KetQuaDatVe{...props} />
      </TabPane>
    </Tabs>

  </div>
};
