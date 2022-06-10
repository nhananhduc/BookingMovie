import React, { useEffect, useState } from 'react';
import { Form, Input, DatePicker, InputNumber, Switch } from 'antd';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { capNhatPhimUploadAction, layThongTinPhimAction } from '../../../../redux/actions/QuanLyPhimAction';
import { GROUP_ID } from '../../../../util/settings/config';

const Edit = (props) => {
    const [componentSize, setComponentSize] = useState('default');
    const [imgSrc, setImgSrc] = useState('');
    const dispatch = useDispatch();
    const { thongTinPhim } = useSelector(state => state.QuanLyPhimReducer)

    useEffect(() => {
        let { id } = props.match.params;
        dispatch(layThongTinPhimAction(id))

    }, [])

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            maPhim: thongTinPhim.maPhim,
            tenPhim: thongTinPhim.tenPhim,
            trailer: thongTinPhim.trailer,
            moTa: thongTinPhim.moTa,
            ngayKhoiChieu: thongTinPhim.ngayKhoiChieu,
            dangChieu: thongTinPhim.dangChieu,
            sapChieu: thongTinPhim.sapChieu,
            hot: thongTinPhim.hot,
            danhGia: thongTinPhim.danhGia,
            hinhAnh: null,
            maNhom: GROUP_ID
        },
        validationSchema: Yup.object().shape({
            tenPhim: Yup.string().trim().required('Movie name is required!'),
            trailer: Yup.string().trim().required('Trailer is required!'),
            moTa: Yup.string().trim().required('Description is required!'),
            ngayKhoiChieu: Yup.string().required('Please select the premiere date')
        }),
        onSubmit: (values) => {
            values.maNhom = GROUP_ID;
            let formData = new FormData();
            for (let key in values) {
                if (key === 'ngayKhoiChieu') {
                    formData.append(key, moment(values[key]).format('DD-MM-YYYY'))
                } else if (key !== 'hinhAnh') {
                    formData.append(key, values[key]);
                } else {
                    if (values.hinhAnh !== null) {
                        formData.append('File', values.hinhAnh, values.hinhAnh.name)
                    }
                }
            }

            dispatch(capNhatPhimUploadAction(formData))
        }
    })

    const handleChangeDatePicker = (value) => {
        let ngayKhoiChieu = moment(value)
        formik.setFieldValue('ngayKhoiChieu', ngayKhoiChieu)
    }

    const handleChangeSwitch = (name) => {
        return (value) => formik.setFieldValue(name, value)
    }

    const handleChangeInputNumber = (name) => {
        return (value) => formik.setFieldValue(name, value)
    }

    const onFormLayoutChange = ({ size }) => {
        setComponentSize(size);
    };

    const handleChangeFile = async (e) => {
        let file = e.target.files[0];
        if (file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/gif' || file.type === 'image/jpg') {
            await formik.setFieldValue('hinhAnh', file)
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (e) => {
                setImgSrc(e.target.result)
            }

            // formik.setErrors() - validation
        }
    }
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
            <h3 className='text-4xl text-center'>Update movie</h3>

            <Form.Item label="Name">
                <Input name='tenPhim' onChange={formik.handleChange} value={formik.values.tenPhim} />
                <p className='text-red-600 mt-2 mb-0'>{formik.errors.tenPhim}</p>
            </Form.Item>
            <Form.Item label="Trailer">
                <Input name='trailer' onChange={formik.handleChange} value={formik.values.trailer} />
                <p className='text-red-600 mt-2 mb-0'>{formik.errors.trailer}</p>

            </Form.Item>
            <Form.Item label="Description">
                <Input name='moTa' onChange={formik.handleChange} value={formik.values.moTa} />
                <p className='text-red-600 mt-2 mb-0'>{formik.errors.moTa}</p>

            </Form.Item>
            <Form.Item label="Premiere">
                <DatePicker format='DD/MM/YYYY' onChange={handleChangeDatePicker} value={moment(formik.values.ngayKhoiChieu)} />
                <p className='text-red-600 mt-2 mb-0'>{formik.errors.ngayKhoiChieu}</p>

            </Form.Item>
            <Form.Item label="Now showing" valuePropName="checked" >
                <Switch onChange={handleChangeSwitch('dangChieu')} checked={formik.values.dangChieu} />
            </Form.Item>
            <Form.Item label="Coming soon" valuePropName="checked">
                <Switch onChange={handleChangeSwitch('sapChieu')} checked={formik.values.sapChieu} />
            </Form.Item>
            <Form.Item label="Hot" valuePropName="checked">
                <Switch onChange={handleChangeSwitch('hot')} checked={formik.values.hot} />
            </Form.Item>
            <Form.Item label="Rating">
                <InputNumber defaultValue={1} name='danhGia' min={1} max={5} onChange={handleChangeInputNumber('danhGia')} value={formik.values.danhGia} />
            </Form.Item>
            <Form.Item label="Poster">
                <input type='file' onChange={handleChangeFile} accept='image/png, image/jpeg, image/gif. image/jpg' />
                <img style={{ width: '150px', height: '150px' }} src={imgSrc === '' ? thongTinPhim.hinhAnh : imgSrc} alt="poster" />
            </Form.Item>
            <Form.Item label="Action">
                <button className='border p-2 bg-blue-600 text-white' type='submit'>Update</button>
            </Form.Item>
        </Form>
    );
};

export default Edit;
