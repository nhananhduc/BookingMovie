import React, { useEffect, useState } from 'react'
import { Input, Select, Tabs, Form, Card } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { capNhatThongTinNguoiDungAction, layDanhSachLoaiNguoiDungAction, layThongTinUserAction } from '../../redux/actions/QuanLyUserAction'
import { GROUP_ID } from '../../util/settings/config';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import moment from 'moment';
import _ from 'lodash'
const { TabPane } = Tabs;
const { Option } = Select;
const { Meta } = Card;

export default function Profile() {
  const [componentSize, setComponentSize] = useState('default');
  const { thongTinUser } = useSelector(state => state.QuanLyUserReducer);
  const { danhSachLoaiNguoiDung } = useSelector(state => state.QuanLyUserReducer);
  const { thongTinDatVe } = thongTinUser;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(layThongTinUserAction());
    dispatch(layDanhSachLoaiNguoiDungAction())
  }, [])

  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      taiKhoan: thongTinUser.taiKhoan,
      matKhau: thongTinUser.matKhau,
      email: thongTinUser.email,
      soDt: thongTinUser.soDT,
      maLoaiNguoiDung: thongTinUser.loaiNguoiDung,
      hoTen: thongTinUser.hoTen,
      maNhom: GROUP_ID
    },
    validationSchema: Yup.object().shape({
      matKhau: Yup.string().trim().required('Mật khẩu không được để trống!').min(6, 'Mật khẩu tối thiểu 6 ký tự').max(32, 'Mật khẩu tối đa 32 ký tự'),
      soDt: Yup.string().required('Số điện thoại không được để trống!').matches(phoneRegExp, 'Số điện thoại không hợp lệ!'),
      hoTen: Yup.string().trim().required('Họ tên không được để trống!')
    }),
    onSubmit: (values) => {
      values.maNhom = GROUP_ID;
      let formData = new FormData();
      for (let key in values) {
        formData.append(key, values[key]);
      }
      dispatch(capNhatThongTinNguoiDungAction(values))
    }
  }
  )

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
  return (
    <Tabs type="card">
      <TabPane tab="Profile" key="1">
        <Form
          onSubmitCapture={formik.handleSubmit}
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 14,
          }}
          layout="horizontal"
          initialValues={{
            size: componentSize,
          }}
          onValuesChange={onFormLayoutChange}
          size={componentSize}
        >
          <Form.Item label="Account">
            <Input disabled name='taiKhoan' onChange={formik.handleChange} value={formik.values.taiKhoan} />
          </Form.Item>
          <Form.Item label="Password">
            <Input type='password' name='matKhau' onChange={formik.handleChange} value={formik.values.matKhau} />
            <p className='text-red-600 mt-2 mb-0'>{formik.errors.matKhau}</p>
          </Form.Item>
          <Form.Item label="Full name">
            <Input name='hoTen' onChange={formik.handleChange} value={formik.values.hoTen} />
            <p className='text-red-600 mt-2 mb-0'>{formik.errors.hoTen}</p>
          </Form.Item>
          <Form.Item label="Email">
            <Input disabled name='email' onChange={formik.handleChange} value={formik.values.email} />
          </Form.Item>
          <Form.Item label="Phone number">
            <Input name='soDt' onChange={formik.handleChange} value={formik.values.soDt} />
            <p className='text-red-600 mt-2 mb-0'>{formik.errors.soDt}</p>
          </Form.Item>
          <Form.Item label="User type">
            <Select value={formik.values.maLoaiNguoiDung} style={{ width: 120 }} onChange={(values) => {
              formik.setFieldValue('maLoaiNguoiDung', values)
            }}>
              {danhSachLoaiNguoiDung.map((userType, index) => {
                return <Option key={index} value={userType.maLoaiNguoiDung}>{userType.tenLoai}</Option>
              })}
            </Select>
          </Form.Item>
          <Form.Item label='Action'>
            <button className='border p-2 bg-blue-600 text-white' type='submit'>Update</button>
          </Form.Item>
        </Form>
      </TabPane>
      <TabPane tab="Tickets" key="2">
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
      </TabPane>
    </Tabs>
  )
}
