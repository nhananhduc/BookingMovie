import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router";
import { TOKEN, USER_LOGIN } from "../../util/settings/config";
import { Layout, Menu, Breadcrumb } from 'antd';
import {
    FileOutlined,
    UserOutlined,
    LogoutOutlined,
    HomeOutlined,
    UserAddOutlined,
    FileAddOutlined,
    ProfileOutlined
} from '@ant-design/icons';
import { NavLink } from "react-router-dom";
import _ from "lodash";
import { history } from "../../App";
import { notifyFunction } from "../../util/Notification/notification";

const { Header, Content, Sider } = Layout;



const AdminTemplate = (props) => { //path, exact, Component

    const { Component, ...restProps } = props;
    const { userLogin } = useSelector(state => state.QuanLyUserReducer);

    const [collapsed, setCollapsed] = useState(false);

    const onCollapse = collapsed => {
        setCollapsed(collapsed);
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    })

    if (!localStorage.getItem(USER_LOGIN)) {
        notifyFunction('warning', "You don't have permission to access admin page!")
        return <Redirect to='/' />
    }

    if (userLogin.maLoaiNguoiDung !== 'QuanTri') {
        notifyFunction("warning", "You don't have permission to access admin page!")
        return <Redirect to='/' />

    }

    const operations = <Fragment>
        {!_.isEmpty(userLogin) ? <Fragment>
            <button onClick={() => {
                localStorage.removeItem(USER_LOGIN);
                localStorage.removeItem(TOKEN);
                history.push('/home');
                window.location.reload();
            }} className='text-white ml-10 hover:text-gray-400 transition duration-300'><LogoutOutlined /> Log out</button>
        </Fragment> : ''}
    </Fragment>

    const items = [
        {
            label: <NavLink to="/home">Home page</NavLink>,
            key: 'menu1',
            icon: <HomeOutlined />
        },
        {
            label: <NavLink to="/profile">My profile</NavLink>,
            key: 'menu2',
            icon: <ProfileOutlined />
        },
        {
            label: 'Users management',
            key: 'submenu1',
            children: [
                {
                    label: <NavLink to="/admin/users">Users list</NavLink>,
                    icon: <UserOutlined />,
                    key: 'submenu-item-1'
                },
                {
                    label: <NavLink to="/admin/users/addnewuser">Add user</NavLink>,
                    icon: <UserAddOutlined />,
                    key: 'submenu-item-2'
                }
            ],
        },
        {
            label: 'Movies management',
            key: 'submenu2',
            children: [
                {
                    label: <NavLink to="/admin/films">Movies list</NavLink>,
                    icon: <FileOutlined />,
                    key: 'submenu-item-3'
                },
                {
                    label: <NavLink to="/admin/films/addnew">Add movie</NavLink>,
                    icon: <FileAddOutlined />,
                    key: 'submenu-item-4'
                }
            ],
        }
    ];

    return <Route {...restProps} render={(propsRoute) => { //props.location,props.history,props.match

        return <Fragment>
            <Layout style={{ minHeight: '100vh' }}>
                <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
                    <div className="pt-5 pb-3 pl-6">
                        <p className='text-cyan-500 mb-0'> <span className='w-8 h-8 inline-block text-white text-center font-semibold uppercase leading-8 rounded-full bg-cyan-700'>{userLogin.taiKhoan.slice(0, 1)}</span> Hello! {userLogin.taiKhoan}</p>
                    </div>
                    <Menu theme="dark" mode="inline" items={items} defaultSelectedKeys={['submenu1']} />
                </Sider>
                <Layout className="site-layout">
                    <Header>
                        <div className="text-right">{operations}</div>
                    </Header>
                    <Content style={{ margin: '0 16px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                        </Breadcrumb>
                        <div className="site-layout-background" style={{ padding: 24, minHeight: '85vh' }}>
                            <Component {...propsRoute} />
                        </div>
                    </Content>
                </Layout>
            </Layout>
        </Fragment>
    }} />

}


export default AdminTemplate;