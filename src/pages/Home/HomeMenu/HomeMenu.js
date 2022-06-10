import React, { Fragment, useState } from 'react'
import { Tabs } from 'antd';
import { NavLink } from 'react-router-dom'
import moment from 'moment';
import './HomeMenu.css'
import { history } from '../../../App';

const { TabPane } = Tabs;

export default function HomeMenu(props) {
    const { heThongRapChieu } = props
    const [state, setState] = useState({
        tabPosition: 'left'
    });

    const { tabPosition } = state;


    const renderHeThongRap = () => {
        return heThongRapChieu?.map((heThongRap, index) => {
            return <TabPane key={index} tab={<img width="50" className='rounded-full' src={heThongRap.logo} alt="logo" />}>
                <Tabs tabPosition="left">
                    {heThongRap.lstCumRap?.map((cumRap, index) => {
                        return <TabPane key={index} tab={
                            <div className='text-white hover:text-gray-400 lg:w-72 xl:w-96' style={{ display: 'flex', alignItems: 'center' }}>
                                <img className='mr-2 hidden xl:inline-block' width="40" src={require('../../../assets/Logo/theater.png')} alt="logo" />
                                <div>
                                    <span className='m-0 text-xs lg:text-sm'>{cumRap.tenCumRap}</span>
                                </div>
                            </div>
                        }>
                            {cumRap.danhSachPhim?.slice(0, 4).map((phim, index) => {
                                return <Fragment key={index}>
                                    <div className='my-5'>
                                        <div style={{ display: 'flex' }}>
                                            <img className='hidden lg:inline-block' style={{ width: '100px', height: '100px' }} src={phim.hinhAnh} alt="poster" onError={e => { e.target.onerror = null; e.target.src = 'https://picsum.photos/100/100'; }} />
                                            <div className='ml-2'>
                                                <h1 className='ml-0 text-xl sm:text-2xl text-white hover:text-gray-400 cursor-pointer' onClick={() => {
                                                    history.push(`/detail/${phim.maPhim}`)
                                                }}>{phim.tenPhim}</h1>
                                                <p className='text-white text-xs lg:text-sm'>{cumRap.diaChi}</p>
                                                <div className='grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3'>
                                                    {phim.lstLichChieuTheoPhim?.slice(0, 12).map((lichChieu, index) => {
                                                        return <NavLink className='text-sm md:text-base text-orange-500' to={`/checkout/${lichChieu.maLichChieu}`} key={index}>
                                                            {moment(lichChieu.ngayChieuGioChieu).format('hh:mm A')}
                                                        </NavLink>
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Fragment>
                            })}
                        </TabPane>
                    })}
                </Tabs>
            </TabPane>
        })

    }
    return (
        <>
            <div className="flex justify-center items-center mb-5 lg:mb-10">
                <div className="w-full hidden md:block h-0.5 bg-gray-500"></div>
                <h3 className="w-1/3 text-center font-bold text-transparent text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-500 ">THEATERS</h3>
                <div className="w-full hidden md:block h-0.5 bg-gray-500"></div>
            </div>
            <Tabs tabPosition="top">
                {renderHeThongRap()}
            </Tabs>
        </>
    )
}
