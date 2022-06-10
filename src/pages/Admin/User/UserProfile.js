import { AutoComplete, Button, Input, Popconfirm, Space, Table } from 'antd';
import { EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { layDanhSachNguoiDungAction, xoaNguoiDungAction } from '../../../redux/actions/QuanLyUserAction';
import { history } from '../../../App';

export default function UserProfile() {

  const [page, setPage] = useState(1)
  const { danhSachNguoiDung } = useSelector(state => state.QuanLyUserReducer);
  const [value, setValue] = useState('');
  const searchRef = useRef(null);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(layDanhSachNguoiDungAction())
  }, [])

  const [state, setState] = useState({
    filteredInfo: null,
    sortedInfo: null,
  });

  const handleChange = (pagination, filters, sorter) => {

    setState({
      filteredInfo: filters,
      sortedInfo: sorter,
    });
  };

  const columns = [
    {
      title: 'No',
      dataIndex: 'stt',
      key: 'stt',
      render: (text, user, index) => {
        return <>{(page - 1) * 10 + index + 1}</>
      },
      sorter: (item2, item1) => {
        return item2.userId - item1.userId;
      },
      sortDirections: ['descend'],
      width: '5%'
    },
    {
      title: 'Account',
      dataIndex: 'taiKhoan',
      key: 'taiKhoan',
      sorter: (item2, item1) => {
        let taiKhoan1 = item1.taiKhoan?.trim().toLowerCase();
        let taiKhoan2 = item2.taiKhoan?.trim().toLowerCase();
        if (taiKhoan2 < taiKhoan1) {
          return -1;
        } return 1;
      },
      width: '15%'
    },
    {
      title: 'Full name',
      dataIndex: 'hoTen',
      key: 'hoTen',
      sorter: (item2, item1) => {
        let hoTen1 = item1.hoTen?.trim().toLowerCase();
        let hoTen2 = item2.hoTen?.trim().toLowerCase();
        if (hoTen2 < hoTen1) {
          return -1;
        } return 1;
      },
      width: '15%'
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: '20%'
    },
    {
      title: 'Phone number',
      dataIndex: 'soDt',
      key: 'soDt',
      width: '10%'
    },
    {
      title: 'User type',
      dataIndex: 'maLoaiNguoiDung',
      key: 'maLoaiNguoiDung',
      width: '15%'
    },
    {
      title: 'Actions',
      dataIndex: 'action',
      key: 'action',
      render: (text, record, index) => (
        <Space size="middle">
          <Button type='primary' shape='round' onClick={() => {
            history.push(`/admin/users/edituser/${record.taiKhoan}`)
          }}><EditOutlined /></Button>
          <Popconfirm
            title="Are you sure to delete this user?"
            onConfirm={() => {
              dispatch(xoaNguoiDungAction(record.taiKhoan))
            }}
            okText="Yes"
            cancelText="No"
          >
            <Button type='primary' danger shape='round'><DeleteOutlined /></Button>
          </Popconfirm>
        </Space>
      )
    },

  ];

  return (
    <div>
      <h3 className='text-4xl'>Users list</h3>
      <AutoComplete
        value={value}
        onChange={(text) => {
          setValue(text)
        }}
        style={{
          width: 400,
          marginBottom: 10
        }}
        options={danhSachNguoiDung?.map((user, index) => {
          return { label: user.taiKhoan, value: user.email }
        })}
        onSelect={(value, option) => {
          dispatch(layDanhSachNguoiDungAction(option.label))
        }}
        onSearch={(value) => {
          setValue(value)
          if (searchRef.current) {
            clearTimeout(searchRef.current)
          }
          searchRef.current = setTimeout(() => {
            dispatch(layDanhSachNguoiDungAction(value))
          }, 300)
        }}
      >
        <Input size="medium" placeholder="Search user..." suffix={<SearchOutlined />} />
      </AutoComplete>
      <Button type='primary' className='ml-1 mb-5' onClick={() => {
        history.push('/admin/users/addnewuser')
      }}>Add user</Button>
      <Table rowKey={"email"} columns={columns} dataSource={danhSachNguoiDung} onChange={handleChange} pagination={{ onChange(current) { setPage(current) } }} />
    </div>
  )
}
