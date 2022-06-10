import { quanLyUserService } from "../../services/QuanLyUserService"
import { DANG_NHAP_ACTION, LAY_DANH_SACH_LOAI_NGUOI_DUNG, LAY_DANH_SACH_NGUOI_DUNG, SET_THONG_TIN_USER } from "./types/QuanLyUserType";
import { history } from '../../App'
import { notifyFunction } from "../../util/Notification/notification";

export const dangNhapAction = (thongTinDangNhap) => {
    return async (dispatch) => {
        try {
            const result = await quanLyUserService.dangNhap(thongTinDangNhap);
            if (result.status === 200) {
                notifyFunction('success', 'Sign in successful!')
                dispatch({
                    type: DANG_NHAP_ACTION,
                    thongTinDangNhap: result.data.content
                });
                history.push('/home');
            }
        } catch (err) {
            notifyFunction('error', err.response.data.content)
        }
    }
}

export const dangKyAction = (newUser) => {
    return async () => {
        try {
            const result = await quanLyUserService.dangKy(newUser);
            if (result.status === 200) {
                notifyFunction('success', 'Register successful!')
            }
            history.push('/login');
        } catch (err) {
            notifyFunction('error', err.response.data.content)
        }
    }
}

export const layThongTinUserAction = () => {
    return async (dispatch) => {
        try {
            const result = await quanLyUserService.layThongTinUser();
            if (result.status === 200) {
                dispatch({
                    type: SET_THONG_TIN_USER,
                    thongTinUser: result.data.content
                });
            }
        } catch (err) {
            notifyFunction('error', err.response.data.content)
        }
    }
}

export const layDanhSachNguoiDungAction = (taiKhoan) => {
    return async (dispatch) => {
        try {
            const result = await quanLyUserService.layDanhSachNguoiDung(taiKhoan);
            dispatch({
                type: LAY_DANH_SACH_NGUOI_DUNG,
                danhSachNguoiDung: result.data.content
            });
        } catch (err) {
            notifyFunction('error', err.response.data.content)
        }
    }
}

export const layDanhSachLoaiNguoiDungAction = () => {
    return async (dispatch) => {
        try {
            const result = await quanLyUserService.layDanhSachLoaiNguoiDung();
            dispatch({
                type: LAY_DANH_SACH_LOAI_NGUOI_DUNG,
                danhSachLoaiNguoiDung: result.data.content
            });
        } catch (err) {
            notifyFunction('error', err.response.data)
        }
    }
}

export const themNguoiDungAction = (newUser) => {
    return async (dispatch) => {
        try {
            const result = await quanLyUserService.themNguoiDung(newUser);
            if (result.status === 200) {
                notifyFunction('success', 'Add user successful!')
            }
            history.push('/admin/users')
        } catch (err) {
            notifyFunction('error', err.response.data)
        }
    }
}

export const capNhatThongTinNguoiDungAction = (updateUser) => {
    return async (dispatch) => {
        try {
            const result = await quanLyUserService.capNhatThongTinNguoiDung(updateUser);
            if (result.status === 200) {
                notifyFunction('success', 'Update user successful!')
            }
            history.push('/admin/users')
        } catch (err) {
            notifyFunction('error', err.response.data.content)
        }
    }
}

export const xoaNguoiDungAction = (taiKhoan) => {
    return async (dispatch) => {
        try {
            const result = await quanLyUserService.xoaNguoiDung(taiKhoan);
            if (result.status === 200) {
                notifyFunction('success','Delete account successful!')
            }
        } catch (err) {
            notifyFunction('error', err.response.data.content)
        }
    }
}