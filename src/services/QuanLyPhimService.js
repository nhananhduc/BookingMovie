import { GROUP_ID } from "../util/settings/config";
import { BaseService } from "./baseService";

export class QuanLyPhimService extends BaseService {
    layDanhSachBanner = () => {
        return this.get(`/api/QuanLyPhim/LayDanhSachBanner`)
    }
    layDanhSachPhim = (tenPhim = '') => {
        if (tenPhim !== '') {
            return this.get(`api/QuanLyPhim/LayDanhSachPhim?maNhom=${GROUP_ID}&tenPhim=${tenPhim}`)

        }
        return this.get(`api/QuanLyPhim/LayDanhSachPhim?maNhom=${GROUP_ID}`)
    }
    themPhimUPloadHinh = (formData) => {
        return this.post(`api/QuanLyPhim/ThemPhimUploadHinh`, formData)
    }
    layThongTinPhim = (maPhim) => {
        return this.get(`api/QuanLyPhim/LayThongTinPhim?MaPhim=${maPhim}`)
    }
    capNhatPhimUpload = (formData) => {
        return this.post(`api/QuanLyPhim/CapNhatPhimUpload`, formData)
    }
    xoaPhim = (maPhim) => {
        return this.delete(`api/QuanLyPhim/XoaPhim?MaPhim=${maPhim}`)
    }
}
export const quanLyPhimService = new QuanLyPhimService();