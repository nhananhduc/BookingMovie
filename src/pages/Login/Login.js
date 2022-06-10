import React from 'react'
import { useFormik } from 'formik';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { dangNhapAction } from '../../redux/actions/QuanLyUserAction'
import * as Yup from 'yup'

export default function Login() {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      taiKhoan: '',
      matKhau: '',
    },
    validationSchema: Yup.object().shape({
      taiKhoan: Yup.string().trim().required('Account is required!'),
      matKhau: Yup.string().trim().required('Password is required!').min(6, 'Password must be at least 6 characters').max(32, 'The maximum length of password is 32 characters')
    }),
    onSubmit: values => {
      dispatch(dangNhapAction(values))
    },
  });

  const login = {
    backgroundImage: `url(${require('../../assets/Background/background.jpg')})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  }

  return (
    <div style={login} className='h-screen bg-cover'>
      <div className="container mx-auto h-full flex flex-1 justify-center items-center">
        <div className="w-full max-w-lg">
          <div className="leading-loose">
            <form onSubmit={formik.handleSubmit} className="max-w-base m-4 p-10 bg-white bg-opacity-20 rounded shadow-xl">
              <p className="text-center font-bold text-transparent text-4xl bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-500 mb-10 ">SIGN IN</p>
              <div className="mt-2">
                <label className="block text-base font-medium text-white mb-2">Account</label>
                <input onChange={formik.handleChange} className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded focus:outline-none focus:bg-white" name='taiKhoan' type="text" placeholder="Enter your account..." required />
                <div className='text-red-500 mt-2 text-left w-100'>{formik.errors.taiKhoan}</div>
              </div>
              <div className="mt-2">
                <label className="block  text-base font-medium text-white mb-2">Password</label>
                <input onChange={formik.handleChange} className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded focus:outline-none focus:bg-white" name='matKhau' type="password" placeholder="Enter your password..." required />
                <div className='text-red-500 mt-2 text-left w-100'>{formik.errors.matKhau}</div>
              </div>
              <div className="mt-4 text-center">
                <button className="w-full px-4 py-1 text-base text-white font-semibold tracking-wider bg-cyan-600 hover:bg-cyan-700 rounded transition duration-300" type="submit">Sign in</button>
              </div>
              <div className="mt-12 text-base font-display font-semibold text-white text-center">
                Don't have an account ? <NavLink to='/register' className="cursor-pointer text-cyan-400 hover:text-cyan-600">Register</NavLink>
              </div>
              <div className="text-center">
                <a className="inline-block right-0 align-baseline font-normal text-sm text-cyan-400 text-500 hover:text-cyan-500" href="/">
                 Back to home
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
