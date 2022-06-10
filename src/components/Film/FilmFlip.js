import React from 'react'
import { PlayCircleOutlined } from '@ant-design/icons'
import { history } from '../../App'
import './Film_Flip.css'
import { useDispatch } from 'react-redux';
import { OPEN_VIDEO_MODAL } from '../../redux/actions/types/VideoModalType';
import { displayVideoModal } from '../../redux/actions/VideoModalAction';

export default function FilmFlip(props) {
    const { item } = props;
    const dispatch = useDispatch();

    return (
        <div className='m-2'>
            <div className="flip-card">
                <div className="flip-card-inner ">
                    <div className="flip-card-front">
                        <img style={{ width: '100%', height: 400 }} src={item.hinhAnh} alt="Avatar" onError={e => { e.target.onerror = null; e.target.src = 'https://picsum.photos/300/300'; }} />
                    </div>
                    <div className="flip-card-back" style={{ position: 'relative', backgroundColor: 'rgba(0,0,0,.9)' }}>
                        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} >
                            <img src={item.hinhAnh} alt="Avatar" style={{ width: '100%', height: 400 }} onError={e => { e.target.onerror = null; e.target.src = 'https://picsum.photos/300/300'; }} />
                        </div>
                        <div className="w-full h-full" style={{ position: 'absolute', backgroundColor: 'rgba(0,0,0,.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <div>
                                <div onClick={() => {
                                    dispatch(displayVideoModal(item.trailer))
                                }} className="rounded-full cursor-pointer"><PlayCircleOutlined style={{ fontSize: '50px' }} />
                                </div>
                                <div className="text-2xl mt-2 font-bold">{item.tenPhim}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
            <div onClick={() => {
                history.push(`/detail/${item.maPhim}`);
            }} className="mt-1 cursor-pointer px-6 py-2.5 bg-red-600 text-center tracking-wider text-white font-bold text-base lg:text-lg leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out">BOOKING</div>
        </div>

    )
}
