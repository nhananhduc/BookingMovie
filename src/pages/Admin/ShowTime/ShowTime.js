import React, { useEffect, useState } from 'react'
import { Form, DatePicker, InputNumber, Button, Select } from 'antd';
import { quanLyRapService } from '../../../services/QuanLyRapService';
import { useFormik } from 'formik';
import moment from 'moment';
import { quanLyDatVeService } from '../../../services/QuanLyDatVeService';
import { notifyFunction } from '../../../util/Notification/notification';

export default function ShowTime(props) {
  const formik = useFormik({
    initialValues: {
      maPhim: props.match.params.id,
      ngayChieuGioChieu: '',
      maRap: '',
      giaVe: ''
    },
    onSubmit: async values => {
      try {
        await quanLyDatVeService.taoLichChieu(values);
      
      } catch (err) {
        notifyFunction('error', err.response.data)
      }
    }
  })

  const [state, setState] = useState({
    heThongRapChieu: [],
    cumRapChieu: []
  })


  useEffect(() => {
    async function layThongTinHeThongRap() {
      try {
        let result = await quanLyRapService.layThongTinHeThongRap();
        setState({
          ...state,
          heThongRapChieu: result.data.content
        })

      } catch (err) {
        notifyFunction('error', err.response.data)
      }
    }
    layThongTinHeThongRap();
  }, [])

  const handleChangeHeThongRap = async (value, option) => {
    try {
      let result = await quanLyRapService.layThongTinCumRap(value);
      setState({
        ...state,
        cumRapChieu: result.data.content
      })
    } catch (err) {
      notifyFunction('error', err.response.data)
    }
  }

  const handleChangeCumRap = (value) => {
    formik.setFieldValue('maRap', value)
  }


  const onOk = (values) => {
    formik.setFieldValue('ngayChieuGioChieu', moment(values).format('DD/MM/YYYY hh:mm:ss'))
  }

  const onChangeDate = (values) => {
    formik.setFieldValue('ngayChieuGioChieu', moment(values).format('DD/MM/YYYY hh:mm:ss'))
  }

  const onChangeInputNumber = (value) => {
    formik.setFieldValue('giaVe', value)
  }

  let film = {};
  if (localStorage.getItem('filmParams')) {
    film = JSON.parse(localStorage.getItem('filmParams'))
  }

  return (
    <Form
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 16 }}
      onSubmitCapture={formik.handleSubmit}
    >
      <h3 className='text-2xl'>Create showtimes - {props.match.params.tenphim}</h3>
      <img style={{width:150}} src={film.hinhAnh} alt='...'/>
      <Form.Item label="Theater brand:">
        <Select options={state.heThongRapChieu?.map((htr, index) => (
          { label: htr.tenHeThongRap, value: htr.maHeThongRap })
        )} onChange={handleChangeHeThongRap} placeholder="Select theater brand" />
      </Form.Item>
      <Form.Item label="Theater:">
        <Select options={state.cumRapChieu?.map((cumRap, index) => ({ label: cumRap.tenCumRap, value: cumRap.maCumRap }))} onChange={handleChangeCumRap} placeholder="Select theater" />
      </Form.Item>
      <Form.Item label="Premiere - showtimes:">
        <DatePicker format="DD/MM/YYYY hh:mm:ss" showTime onChange={onChangeDate} onOk={onOk} />
      </Form.Item>
      <Form.Item label="Price:">
        <InputNumber step={1000} onChange={onChangeInputNumber} />
      </Form.Item>
      <Form.Item label="Action">
        {/* <Button htmlType='submit'>Create showtimes</Button> */}
        <button className='border p-2 bg-blue-600 text-white' type='submit'>Create showtimes</button>
      </Form.Item>
    </Form>
  )
}
