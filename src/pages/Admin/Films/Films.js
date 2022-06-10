import React, { Fragment, useEffect } from 'react'
import { Button, Table } from 'antd';
import { Input } from 'antd';
import { SearchOutlined, EditOutlined, DeleteOutlined, CalendarOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { layDanhSachPhimAction, xoaPhimAction } from '../../../redux/actions/QuanLyPhimAction';
import { NavLink } from 'react-router-dom';
import { history } from '../../../App';
const { Search } = Input;




export default function Films() {
  const { arrFilmDefault } = useSelector(state => state.QuanLyPhimReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(layDanhSachPhimAction())

  }, [])

  const columns = [
    {
      title: 'Code',
      dataIndex: 'maPhim',

      sorter: (a, b) => a.maPhim - b.maPhim,
      sortDirections: ['descend'],
      defaultSortOrder: 'descend',
      width: '10%'
    },
    {
      title: 'Poster',
      dataIndex: 'hinhAnh',
      render: (text, film, index) => {
        return <Fragment key={index}>
          <img style={{ width: 50, height: 50 }} src={film.hinhAnh} alt={film.tenPhim} onError={e => { e.target.onerror = null; e.target.src = `https://picsum.photos/${index}300/300`; }} />
        </Fragment>
      },
      width: '10%'
    },
    {
      title: 'Name',
      dataIndex: 'tenPhim',
      sorter: (a, b) => {
        let tenPhimA = a.tenPhim.toLowerCase().trim();
        let tenPhimB = b.tenPhim.toLowerCase().trim();
        if (tenPhimA > tenPhimB) {
          return 1;
        } return -1;
      },
      width: '30%',
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Description',
      dataIndex: 'moTa',
      render: (text, film) => {
        return <Fragment>
          {film.moTa.length > 50 ? film.moTa.substr(0, 50) + '...' : film.moTa}
        </Fragment>
      },
      width: '40%'
    },
    {
      title: 'Actions',
      dataIndex: 'maPhim',
      render: (text, film) => {
        return <Fragment>
          <NavLink key={1} className=' text-blue-800 p-3 mr-2' to={`/admin/films/edit/${film.maPhim}`}><EditOutlined /></NavLink>
          <span style={{ cursor: 'pointer' }} key={2} className=' text-red-800 p-3' onClick={() => {
            if (window.confirm('Are you sure to delete ' + film.tenPhim + '?')) {
              dispatch(xoaPhimAction(film.maPhim))
            }
          }}><DeleteOutlined /></span>
          <NavLink key={3} className=' text-green-800 p-3 mr-2' to={`/admin/films/showtime/${film.maPhim}/${film.tenPhim}`} onClick={() => {
            localStorage.setItem('filmParams', JSON.stringify(film))
          }}><CalendarOutlined /></NavLink>

        </Fragment>
      }
    }
  ];

  function onChange(pagination, filters, sorter, extra) {
  }

  const onSearch = value => {
    dispatch(layDanhSachPhimAction(value))
  };

  return <div>
    <h3 className=' text-4xl'>Movies management</h3>
    <Button type='primary' className='mb-5' onClick={() => {
      history.push('/admin/films/addnew')
    }}>Add movie</Button>
    <Search
      className='mb-5'
      placeholder="Search movie..."
      allowClear
      enterButton={<SearchOutlined />}
      size="large"
      onSearch={onSearch}
    />
    <Table rowKey={'maPhim'} columns={columns} dataSource={arrFilmDefault} onChange={onChange} />
  </div>

}
