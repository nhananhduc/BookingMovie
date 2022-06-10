import React, { useState } from 'react';
import { Form, Input, DatePicker, InputNumber, Switch } from 'antd';
import { useFormik } from 'formik';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { themPhimUploadHinhAction } from '../../../../redux/actions/QuanLyPhimAction';
import { GROUP_ID } from '../../../../util/settings/config';
import * as Yup from 'yup';

const AddNew = () => {
    const [componentSize, setComponentSize] = useState('default');
    const [imgSrc, setImgSrc] = useState('');
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: {
            tenPhim: '',
            trailer: '',
            moTa: '',
            ngayKhoiChieu: '',
            dangChieu: false,
            sapChieu: false,
            hot: false,
            danhGia: 0,
            hinhAnh: {},
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
                if (key !== 'hinhAnh') {
                    formData.append(key, values[key]);
                } else {
                    formData.append('File', values.hinhAnh, values.hinhAnh.name)
                }
            }
            dispatch(themPhimUploadHinhAction(formData));
        }
    })

    const handleChangeDatePicker = (value) => {
        let ngayKhoiChieu = moment(value).format('DD/MM/YYYY')
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

    const handleChangeFile = (e) => {
        let file = e.target.files[0];
        if (file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/gif' || file.type === 'image/jpg') {
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (e) => {
                setImgSrc(e.target.result)
            }
            formik.setFieldValue('hinhAnh', file)
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
            <h3 className='text-4xl text-center'>Add movie</h3>

            <Form.Item label="Name">
                <Input name='tenPhim' onChange={formik.handleChange} />
                <p className='text-red-600 mt-2 mb-0'>{formik.errors.tenPhim}</p>
            </Form.Item>
            <Form.Item label="Trailer">
                <Input name='trailer' onChange={formik.handleChange} />
                <p className='text-red-600 mt-2 mb-0'>{formik.errors.trailer}</p>
            </Form.Item>
            <Form.Item label="Description">
                <Input name='moTa' onChange={formik.handleChange} />
                <p className='text-red-600 mt-2 mb-0'>{formik.errors.moTa}</p>
            </Form.Item>
            <Form.Item label="Premiere">
                <DatePicker format='DD/MM/YYYY' onChange={handleChangeDatePicker} />
                <p className='text-red-600 mt-2 mb-0'>{formik.errors.ngayKhoiChieu}</p>
            </Form.Item>
            <Form.Item label="Now showing" valuePropName="checked" >
                <Switch onChange={handleChangeSwitch('dangChieu')} />
            </Form.Item>
            <Form.Item label="Coming soon" valuePropName="checked">
                <Switch onChange={handleChangeSwitch('sapChieu')} />
            </Form.Item>
            <Form.Item label="Hot" valuePropName="checked">
                <Switch onChange={handleChangeSwitch('hot')} />
            </Form.Item>
            <Form.Item label="Rating">
                <InputNumber defaultValue={1} name='danhGia' min={1} max={5} onChange={handleChangeInputNumber('danhGia')} />
            </Form.Item>
            <Form.Item label="Poster">
                <input type='file' onChange={handleChangeFile} accept='image/png, image/jpeg, image/gif. image/jpg' />
                <img style={{ width: '100px', height: '100px' }} src={imgSrc} alt='...' />
            </Form.Item>
            <Form.Item label="Action">
                <button className='border p-2 bg-blue-600 text-white' type='submit'>Add movie</button>
            </Form.Item>
        </Form>
    );
};

export default AddNew
