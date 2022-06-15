import React, { Fragment, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { history } from '../../../../App'
import { Select } from 'antd';
import { LogoutOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import { TOKEN, USER_LOGIN } from '../../../../util/settings/config';

const { Option } = Select;
export default function Header(props) {
    const [visibleDropDown, setVisibleDropDown] = useState(false);
    const { userLogin } = useSelector(state => state.QuanLyUserReducer)
    const { t, i18n } = useTranslation();
    const handleChange = (value) => {
        i18n.changeLanguage(value)
    }

    const renderLogin = () => {
        if (_.isEmpty(userLogin)) {
            return <Fragment>
                <button onClick={() => {
                    history.push('./login')
                }} className="border border-green-500 bg-cyan-500 text-white rounded-md px-3 py-1 m-2 transition duration-500 ease select-none hover:bg-cyan-600 focus:outline-none focus:shadow-outline">Sign in</button>
                <button onClick={() => {
                    history.push('./register')
                }} className="border border-green-500 bg-green-500 text-white rounded-md px-3 py-1 m-2 transition duration-500 ease select-none hover:bg-green-600 focus:outline-none focus:shadow-outline">Register</button>

            </Fragment>
        }
        return <Fragment><p className='ml-2 mb-0 text-cyan-400'><span className='w-8 h-8 inline-block text-white text-center font-semibold uppercase leading-8 rounded-full bg-cyan-700'>{userLogin.taiKhoan.slice(0, 1)}</span> Hello! {userLogin.taiKhoan}</p>
            <button onClick={() => {
                history.push('/admin')
            }} className="border border-red-500 bg-red-500 text-white rounded-md px-3 py-1 m-2 transition duration-500 ease select-none hover:bg-red-600 focus:outline-none focus:shadow-outline">Admin page</button>
            {renderLogout()}
        </Fragment>
    }

    const renderLogout = () => {
        return <Fragment>
            <button onClick={() => {
                localStorage.removeItem(USER_LOGIN);
                localStorage.removeItem(TOKEN);
                history.push('/home');
                window.location.reload();
            }} className='border border-gray-200 bg-gray-200 text-gray-700 rounded-md px-3 py-1 m-2 transition duration-500 ease select-none hover:bg-gray-300 focus:outline-none focus:shadow-outline'><LogoutOutlined /> Log out</button>
        </Fragment>
    }
    return (
        <header className="border-b bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-60 fixed z-10 px-2 py-4 lg:p-7 bg-neutral-900 text-white w-full">
            <div className="container flex justify-between h-16 mx-auto p-0">
                <NavLink rel="noopener noreferrer" to="/home" aria-label="Back to homepage" className="flex items-center">
                    <img className='lg:w-32 lg:h-24 w-24 h-18' src={require('../../../../assets/Logo/cinema.png')} alt='logo' />

                </NavLink>
                <div className="items-stretch hidden space-x-3 md:flex">
                    <div className="flex">
                        <NavLink rel="noopener noreferrer" to="/home" className="xl:text-lg text-base flex items-center xl:px-4 -mb-1 text-white hover:text-gray-400" activeClassName='font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-500 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r from-pink-500 to-yellow-500'>MOVIES</NavLink>
                    </div>
                    <div className="flex">
                        <NavLink rel="noopener noreferrer" to="/news" className="xl:text-lg text-base flex items-center xl:px-4 -mb-1 text-white hover:text-gray-400" activeClassName='font-bold hover:bg-opacity-0 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-500 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r from-pink-500 to-yellow-500'>NEWS</NavLink>
                    </div>
                    <div className="flex">
                        <NavLink rel="noopener noreferrer" to="/event" className="xl:text-lg text-base flex items-center xl:px-4 -mb-1  text-white hover:text-gray-400" activeClassName='font-bold hover:bg-opacity-0 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-500 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r from-pink-500 to-yellow-500'>EVENT</NavLink>
                    </div>

                </div>
                <div className="items-center justify-center flex-shrink-0 hidden md:flex">
                    {renderLogin()}
                </div>

                <button className="p-4 md:hidden" onClick={() => {
                    setVisibleDropDown(!visibleDropDown)
                }}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 dark:text-coolGray-100">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>

            </div>
            {visibleDropDown ? _.isEmpty(userLogin) ? <div className='flex justify-end'>
                <div className="md:hidden bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-60 fixed z-10 py-2 px-4 bg-neutral-900 border border-gray-500 rounded-lg">
                    <NavLink rel="noopener noreferrer" to="/login" className="xl:text-lg text-base flex items-center xl:px-4 text-white hover:text-gray-400" activeClassName='font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-500 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r from-pink-500 to-yellow-500'>SIGN IN</NavLink>
                    <NavLink rel="noopener noreferrer" to="/register" className="xl:text-lg text-base flex items-center xl:px-4 text-white hover:text-gray-400" activeClassName='font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-500 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r from-pink-500 to-yellow-500'>REGISTER</NavLink>
                    <hr className='my-2' />
                    <NavLink rel="noopener noreferrer" to="/home" className="xl:text-lg text-base flex items-center xl:px-4 text-white hover:text-gray-400" activeClassName='font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-500 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r from-pink-500 to-yellow-500'>MOVIES</NavLink>
                    <NavLink rel="noopener noreferrer" to="/news" className="xl:text-lg text-base flex items-center xl:px-4 text-white hover:text-gray-400" activeClassName='font-bold hover:bg-opacity-0 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-500 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r from-pink-500 to-yellow-500'>NEWS</NavLink>
                    <NavLink rel="noopener noreferrer" to="/event" className="xl:text-lg text-base flex items-center xl:px-4  text-white hover:text-gray-400" activeClassName='font-bold hover:bg-opacity-0 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-500 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r from-pink-500 to-yellow-500'>EVENT</NavLink>
                </div>
            </div> : <div className='flex justify-end'>
                <div className="md:hidden bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-60 fixed z-10 py-2 px-4 bg-neutral-900 border border-gray-500 rounded-lg">
                    <NavLink onClick={() => { setVisibleDropDown(false) }} rel="noopener noreferrer" to="/home" className="xl:text-lg text-base flex items-center xl:px-4 text-white hover:text-gray-400" activeClassName='font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-500 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r from-pink-500 to-yellow-500'>MOVIES</NavLink>
                    <NavLink onClick={() => { setVisibleDropDown(false) }} rel="noopener noreferrer" to="/news" className="xl:text-lg text-base flex items-center xl:px-4 text-white hover:text-gray-400" activeClassName='font-bold hover:bg-opacity-0 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-500 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r from-pink-500 to-yellow-500'>NEWS</NavLink>
                    <NavLink onClick={() => { setVisibleDropDown(false) }} rel="noopener noreferrer" to="/event" className="xl:text-lg text-base flex items-center xl:px-4  text-white hover:text-gray-400" activeClassName='font-bold hover:bg-opacity-0 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-500 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r from-pink-500 to-yellow-500'>EVENT</NavLink>
                    <hr className='my-2' />
                    <button onClick={() => {
                        history.push('/admin')
                    }} className="border border-red-500 bg-red-500 text-white rounded-md px-3 py-1 m-2 transition duration-500 ease select-none hover:bg-red-600 focus:outline-none focus:shadow-outline">Admin page</button>
                    <button onClick={() => {
                        localStorage.removeItem(USER_LOGIN);
                        localStorage.removeItem(TOKEN);
                        history.push('/home');
                        window.location.reload();
                    }} className='border border-gray-200 bg-gray-200 text-gray-700 rounded-md px-3 py-1 transition duration-500 ease select-none hover:bg-gray-300 focus:outline-none focus:shadow-outline'><LogoutOutlined /> Log out</button>

                </div>
            </div> : ""}
        </header>
    )
}
