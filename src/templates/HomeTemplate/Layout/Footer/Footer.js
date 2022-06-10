import React, { memo } from 'react'
import { useSelector } from 'react-redux'
import _ from 'lodash'
import { GithubOutlined, FacebookOutlined, TwitterOutlined } from '@ant-design/icons'

function Footer(props) {
    const { heThongRapChieu } = useSelector(state => state.QuanLyRapReducer);
    const arrHeThongRap = _.map(heThongRapChieu, (heThongRap) => _.pick(heThongRap, ['maHeThongRap', 'tenHeThongRap', 'logo']))
    return (
        <footer className="py-2 text-white bg-neutral-900">
            <div className="container p-0 mx-auto space-y-6 divide-y divide-coolGray-400 md:space-y-12 divide-opacity-50">
                <div className="grid grid-cols-12 px-2">
                    <div className="col-span-full text-center mt-2 md:mt-0 md:text-left md:col-span-5">
                        <p className=" pb-1 md:text-lg text-base md:block hidden mb-0 font-semibold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-500 ">PARTNER</p>
                        <div className='grid grid-cols-6 mt-0 sm:mt-2'>
                            {arrHeThongRap.map((htr, index) => {
                                return <div key={index}><img style={{ width: '30px' }} src={htr.logo} alt='logo' /></div>
                            })}
                        </div>
                    </div>
                    <div className='col=span-2'></div>
                    <div className="col-span-full text-center md:text-left md:col-span-5 mt-5 md:mt-0">
                        <p className=" pb-1 mb-0 md:block hidden md:text-lg text-base font-semibold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-500 ">TECHNOLOGY</p>
                        <div className='grid grid-cols-6 mt-0 sm:mt-2'>
                            <div >
                                <img style={{ width: '30px', height: '30px' }} src={require('../../../../assets/Logo/javascript.png')} alt='reactjs' />
                            </div>
                            <div>
                                <img style={{ width: '30px', height: '30px' }} src={require('../../../../assets/Logo/html5.png')} alt='reactjs' />
                            </div>
                            <div >
                                <img style={{ width: '50px', height: '30px' }} src={require('../../../../assets/Logo/tailwind.png')} alt='reactjs' />
                            </div>
                            <div>
                                <img style={{ width: '30px', height: '30px' }} src={require('../../../../assets/Logo/reactjs.png')} alt='reactjs' />
                            </div>
                            <div>
                                <img style={{ width: '30px', height: '30px' }} src={require('../../../../assets/Logo/redux.png')} alt='reactjs' />
                            </div>
                            <div >
                                <img style={{ width: '60px', height: '30px' }} src={require('../../../../assets/Logo/ajax.png')} alt='reactjs' />
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{ marginTop: '20px' }} className="grid justify-around md:justify-between pt-2">
                    <div className="flex flex-col md:block self-center text-xs md:text-sm text-center lg:col-start-1 md:space-x-6">
                        <span>©2022 All rights reserved</span>
                        <a href='mailto:nhananhduc@gmail.com' className='text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-500'>email: nhananhduc@gmail.com</a>
                    </div>
                    <div className="flex justify-center pt-0 col-end-13">
                        <a rel="noopener noreferrer" href="/" title="Facebook" className="text-white text-base md:text-xl flex items-center justify-center w-10 h-10 rounded-full hover:text-orange-400">
                            <FacebookOutlined />
                        </a>
                        <a rel="noopener noreferrer" href="/" title="Twitter" className="text-white text-base md:text-xl flex items-center justify-center w-10 h-10 rounded-full hover:text-orange-400">
                            <TwitterOutlined />
                        </a>
                        <a rel="noopener noreferrer" href="/" title="Git" className="text-white text-base md:text-xl flex items-center justify-center w-10 h-10 rounded-full hover:text-orange-400">
                            <GithubOutlined />
                        </a>

                    </div>
                </div>
            </div>
        </footer>

    )
}

export default memo(Footer)
