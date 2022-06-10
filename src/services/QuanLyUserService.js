

import { GROUP_ID } from "../util/settings/config";
import { BaseService } from "./baseService";

export class QuanLyUserService extends BaseService {
    dangNhap = (thongTinDangNhap) => { //{taiKhoan:'',matKhau:''}
        return this.post(`api/QuanLyNguoiDung/DangNhap`, thongTinDangNhap)
    }

    dangKy = (newUser) => {
        return this.post(`api/QuanLyNguoiDung/DangKy`, newUser)
    }

    layThongTinUser = () => {
        return this.post(`api/QuanLyNguoiDung/ThongTinTaiKhoan`)
    }

    layDanhSachNguoiDung = (taiKhoan = '') => {
        if (taiKhoan === '') {
            return this.get(`api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${GROUP_ID}`)
        } else {
            return this.get(`api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${GROUP_ID}&tuKhoa=${taiKhoan}`)
        }
    }

    xoaNguoiDung = (taiKhoan) => {
        return this.delete(`api/QuanLyNguoiDung/XoaNguoiDung`, taiKhoan)
    }

    layDanhSachLoaiNguoiDung = () => {
        return this.get(`api/QuanLyNguoiDung/LayDanhSachLoaiNguoiDung`)
    }

    themNguoiDung = (newUser) => {
        return this.post(`api/QuanLyNguoiDung/ThemNguoiDung`, newUser)
    }

    capNhatThongTinNguoiDung = (updateUser) => {
        return this.put(`api/QuanLyNguoiDung/CapNhatThongTinNguoiDung`, updateUser)
    }

}
export const quanLyUserService = new QuanLyUserService();