import React, { useEffect, useState } from 'react';
import { Form, Input, Select } from 'antd';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { GROUP_ID } from '../../../../util/settings/config';
import { capNhatThongTinNguoiDungAction, layDanhSachLoaiNguoiDungAction, layDanhSachNguoiDungAction, themNguoiDungAction } from '../../../../redux/actions/QuanLyUserAction';

const { Option } = Select;

const EditUser = (props) => {
  const [componentSize, setComponentSize] = useState('default');
  const { danhSachLoaiNguoiDung } = useSelector(state => state.QuanLyUserReducer)
  const { danhSachNguoiDung } = useSelector(state => state.QuanLyUserReducer)
  const thongTinNguoiDung = danhSachNguoiDung[0];
  const dispatch = useDispatch();

  useEffect(() => {
    const { id } = props.match.params;
    dispatch(layDanhSachNguoiDungAction(id))
    dispatch(layDanhSachLoaiNguoiDungAction())
  }, [])

  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      taiKhoan: thongTinNguoiDung?.taiKhoan,
      matKhau: thongTinNguoiDung?.matKhau,
      email: thongTinNguoiDung?.email,
      soDt: thongTinNguoiDung?.soDt,
      maLoaiNguoiDung: thongTinNguoiDung?.maLoaiNguoiDung,
      hoTen: thongTinNguoiDung?.hoTen,
      maNhom: GROUP_ID
    },
    validationSchema: Yup.object().shape({
      matKhau: Yup.string().trim().required('Password is required!').min(6, 'Password must be at least 6 characters').max(32, 'The maximum length of password is 32 characters'),
      soDt: Yup.string().required('Phone number is required!').matches(phoneRegExp, 'Phone number is invalid!'),
      hoTen: Yup.string().trim().required('Name is required!')
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
      <h3 className='text-4xl text-center'>Update infomation</h3>

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
      <Form.Item label="Action">
        <button className='border p-2 bg-blue-600 text-white' type='submit'>Update</button>
      </Form.Item>
    </Form>
  );
};

export default EditUser
