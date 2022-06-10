import React, { useEffect } from 'react'
import { Tabs } from 'antd';
import { CustomCard } from '@tsamantanis/react-glassmorphism'
import '@tsamantanis/react-glassmorphism/dist/index.css'
import '../../assets/styles/circleRating.css'
import { useDispatch, useSelector } from 'react-redux'
import { layThongTinChiTietPhim } from '../../redux/actions/QuanLyRapAction';
import moment from 'moment';
import { NavLink } from 'react-router-dom'
import { Rate } from 'antd';

const { TabPane } = Tabs;

export default function Detail(props) {
    const { filmDetail } = useSelector(state => state.QuanLyPhimReducer);
    const dispatch = useDispatch();
    useEffect(() => {
        let { id } = props.match.params
        dispatch(layThongTinChiTietPhim(id))
    }, [])
    return (
        <div style={{ backgroundImage: `url(${filmDetail.hinhAnh})`, backgroundSize: '100%', backgroundPosition: 'center', minHeight: '100vh' }}>
            <CustomCard
                style={{ paddingTop: 150, minHeight: '100vh' }}
                effectColor="#000"
                color="#fff"
                blur={10} // 
                borderRadius={0}
            >

                <div className='mx-auto px-0 py-5 container'>
                    <div className='grid grid-cols-12'>
                        <img className='col-span-full lg:col-span-2' src={filmDetail.hinhAnh} style={{ width: '200px' }} alt="poster" onError={e => { e.target.onerror = null; e.target.src = 'https://picsum.photos/200/300'; }} />
                        <div className='col-span-full lg:col-span-10 text-justify'>
                            <p className='text-base font-semibold'>Premiere: {moment(filmDetail.ngayKhoiChieu).format('DD.MM.YYYY')}</p>
                            <p className='font-bold text-transparent text-4xl bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-500 my-5'>{filmDetail.tenPhim}</p>
                            <p className='text-base'>{filmDetail.moTa}</p>
                            <div className='flex justify-start items-center'>
                                <p className='text-base mb-0 mr-2'>Rating</p>
                                <Rate allowHalf defaultValue={filmDetail.danhGia / 2} />
                            </div>
                        </div>
                    </div>


                </div>


                <div className='mt-10 mx-auto bg-orange-50 border-2 border-cyan-500 rounded-lg px-5 py-5 container ' style={{ minHeight: '300px' }}>
                    <Tabs defaultActiveKey="1" centered>
                        <TabPane tab="Showtimes" key="1" >
                            <div >
                                <Tabs tabPosition={'left'}>
                                    {filmDetail.heThongRapChieu?.map((htr, index) => {
                                        return <TabPane key={index} tab={<div>
                                            <img width="50" className='rounded-full' src={htr.logo} alt="logo" />
                                            {htr.tenHeThongRap}
                                        </div>} >
                                            {htr.cumRapChieu?.map((cumRap, index) => {
                                                return <div className='mt-5' key={index}>
                                                    <div className='flex flex-row'>
                                                        <img style={{ width: 80, height: 60 }} className="hidden md:inline-block" src={require('../../assets/Logo/theater.png')} alt='theater' />
                                                        <div className='ml-2'>
                                                            <p className='mb-2' style={{ fontSize: '20px', fontWeight: 'bold', lineHeight: 1 }}>{cumRap.tenCumRap}</p>
                                                            <p className='text-gray-400' style={{ marginTop: 0 }}>{cumRap.diaChi}</p>
                                                            <div className='thong-tin-lich-chieu grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3'>
                                                        {cumRap.lichChieuPhim?.slice(0, 12).map((lichChieu, index) => {
                                                            return <NavLink to={`/checkout/${lichChieu.maLichChieu}`} className='col-span-1 text-green-800 font-bold' key={index}>{moment(lichChieu.ngayChieuGioChieu).format('hh:mm A')}</NavLink>
                                                        })}
                                                    </div>
                                                        </div>
                                                    </div>
                                                    
                                                </div>
                                            })}
                                        </TabPane>
                                    })}

                                </Tabs>
                            </div>
                        </TabPane>
                        <TabPane tab="Detail" key="2">
                            <p className='text-justify' >{filmDetail.moTa}</p>
                        </TabPane>
                        <TabPane tab="Comments" key="3">
                            Some comments...
                        </TabPane>
                    </Tabs>
                </div>
            </CustomCard>

        </div>
    )
}
