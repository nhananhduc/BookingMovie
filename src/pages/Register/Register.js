import React from 'react'
import { useFormik } from 'formik';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { dangKyAction } from '../../redux/actions/QuanLyUserAction'
import * as Yup from 'yup'

export default function Login() {
  const dispatch = useDispatch();
  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const formik = useFormik({
    initialValues: {
      taiKhoan: '',
      matKhau: '',
      xacNhanMatKhau: '',
      email: '',
      soDt: '',
      maNhom: '',
      hoTen: ''
    },
    validationSchema: Yup.object().shape({
      taiKhoan: Yup.string().required('Account is required!'),
      hoTen: Yup.string().required('Name is required!'),
      email: Yup.string().required('Email is required!').email('Email is invalid!'),
      matKhau: Yup.string().required('Password is required!').min(6, 'Password must be at least 6 characters').max(32, 'The maximum length of password is 32 characters'),
      xacNhanMatKhau: Yup.string().required('Password must be confirmed!').oneOf([Yup.ref('matKhau'), null], 'Password confirmation does not match!'),
      soDt: Yup.string().required('Phone number is required!').matches(phoneRegExp, 'Phone number is invalid!')
    }),
    onSubmit: values => {
      dispatch(dangKyAction(values))
    },
  });

  const register = {
    backgroundImage: `url(${require('../../assets/Background/background.jpg')})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  }

  return (
    <div style={register} className='h-screen bg-cover'>
      <div className="container mx-auto h-full flex flex-1 justify-center items-center">
        <div className="w-full max-w-lg">
          <div className="leading-loose">
            <form onSubmit={formik.handleSubmit} className="max-w-base m-4 p-10 bg-white bg-opacity-20 rounded shadow-xl">
              <p className="text-center font-bold text-transparent text-4xl bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-500 mb-10">REGISTER</p>
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
              <div className="mt-2">
                <label className="block  text-base font-medium text-white mb-2">Confirm password</label>
                <input onChange={formik.handleChange} className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded focus:outline-none focus:bg-white" name='xacNhanMatKhau' type="password" placeholder="Re-enter your password..." required />
                <div className='text-red-500 mt-2 text-left w-100'>{formik.errors.xacNhanMatKhau}</div>
              </div>
              <div className="mt-2">
                <label className="block text-base font-medium text-white mb-2">Full name</label>
                <input onChange={formik.handleChange} className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded focus:outline-none focus:bg-white" name='hoTen' type="text" placeholder="Enter your name..." required />
                <div className='text-red-500 mt-2 text-left w-100'>{formik.errors.hoTen}</div>
              </div>
              <div className="mt-2">
                <label className="block text-base font-medium text-white mb-2">Email</label>
                <input onChange={formik.handleChange} className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded focus:outline-none focus:bg-white" name='email' type="email" placeholder="Enter your email..." required />
                <div className='text-red-500 mt-2 text-left w-100'>{formik.errors.email}</div>
              </div>
              <div className="mt-2">
                <label className="block text-base font-medium text-white mb-2">Phone number</label>
                <input onChange={formik.handleChange} className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded focus:outline-none focus:bg-white" name='soDt' type="text" placeholder="Enter your phone number..." required />
                <div className='text-red-500 mt-2 text-left w-100'>{formik.errors.soDt}</div>
              </div>
              <div className="mt-4 text-center">
                <button className="w-full px-4 py-1 text-base text-white font-semibold tracking-wider bg-cyan-600 hover:bg-cyan-700 rounded transition duration-300" type="submit">Register</button>
              </div>
              <div className="mt-12 text-base font-display font-semibold text-white text-center">
                Already have an account ? <NavLink to='/login' className="cursor-pointer text-cyan-400 hover:text-cyan-600">Sign in</NavLink>
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

    // <form onSubmit={formik.handleSubmit} className="lg:w-1/2 xl:max-w-screen-sm">
    //   <div className="mt-10 px-12 sm:px-24 md:px-48 lg:px-12 lg:mt-16 xl:px-24 xl:max-w-2xl">
    //     <h2 className="text-center text-4xl text-indigo-900 font-display font-semibold lg:text-left xl:text-5xl
    //           xl:text-bold">Register</h2>
    //     <div className="mt-12">
    //       <div>
    //         <div>
    //           <div className="text-sm font-bold text-gray-700 tracking-wide">Account</div>
    //           <input onChange={formik.handleChange} name='taiKhoan' className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" type='text' placeholder="Enter your account..." />
    //           <div className='text-red-600 mt-2 text-left w-100'>{formik.errors.taiKhoan}</div>
    //         </div>
    //         <div className="mt-8">
    //           <div className="text-sm font-bold text-gray-700 tracking-wide">
    //             Password
    //           </div>
    //           <input onChange={formik.handleChange} name='matKhau' className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" type='password' placeholder="Enter your password..." />
    //           <div className='text-red-600 mt-2 text-left w-100'>{formik.errors.matKhau}</div>

    //         </div>
    //         <div className="mt-8">
    //           <div className="text-sm font-bold text-gray-700 tracking-wide">
    //             Re-enter password
    //           </div>
    //           <input onChange={formik.handleChange} name='xacNhanMatKhau' className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" type='password' placeholder="Confirm your password..." />
    //           <div className='text-red-600 mt-2 text-left w-100'>{formik.errors.xacNhanMatKhau}</div>
    //         </div>
    //         <div className="mt-8">
    //           <div className="text-sm font-bold text-gray-700 tracking-wide">
    //             Full name
    //           </div>
    //           <input onChange={formik.handleChange} name='hoTen' className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" type='text' placeholder="Enter your name..." />
    //           <div className='text-red-600 mt-2 text-left w-100'>{formik.errors.hoTen}</div>
    //         </div>
    //         <div className="mt-8">
    //           <div className="text-sm font-bold text-gray-700 tracking-wide">
    //             Email
    //           </div>
    //           <input onChange={formik.handleChange} name='email' className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" type='text' placeholder="Enter your email..." />
    //           <div className='text-red-600 mt-2 text-left w-100'>{formik.errors.email}</div>
    //         </div>
    //         <div className="mt-8">
    //           <div className="text-sm font-bold text-gray-700 tracking-wide">
    //             Phone number
    //           </div>
    //           <input onChange={formik.handleChange} name='soDt' className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" type='text' placeholder="Enter your phone number..." />
    //           <div className='text-red-600 mt-2 text-left w-100'>{formik.errors.soDt}</div>
    //         </div>
    //         <div className="mt-10">
    //           <button type='submit' className="bg-indigo-500 text-gray-100 p-4 w-full rounded-full tracking-wide
    //                       font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600
    //                       shadow-lg">
    //             Register
    //           </button>
    //         </div>
    //       </div>
    //       <div className="mt-12 text-sm font-display font-semibold text-gray-700 text-center">
    //         Already have an account ? <NavLink to='/login' className="cursor-pointer text-indigo-600 hover:text-indigo-800">Sign in</NavLink>
    //       </div>
    //     </div>
    //     <div className='flex justify-center items-center'>
    //       <NavLink to='/home' className='mt-3 text-center'>Back to home</NavLink>
    //     </div>
    //   </div>
    // </form>

  )
}
