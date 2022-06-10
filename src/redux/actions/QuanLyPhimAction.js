
import { history } from "../../App";
import { quanLyPhimService } from "../../services/QuanLyPhimService";
import { notifyFunction } from "../../util/Notification/notification";
import { SET_DANH_SACH_PHIM, SET_THONG_TIN_PHIM } from "./types/QuanLyPhimType";

export const layDanhSachPhimAction = (tenPhim = '') => {
    return async (dispatch) => {
        try {
            const result = await quanLyPhimService.layDanhSachPhim(tenPhim);
            dispatch({
                type: SET_DANH_SACH_PHIM,
                arrFilm: result.data.content
            })
        } catch (err) {
            notifyFunction('error', err.response.data)
        }
    }
}

export const themPhimUploadHinhAction = (formData) => {
    return async (dispatch) => {
        try {
            const result = await quanLyPhimService.themPhimUPloadHinh(formData);
            if (result.status === 200) {
                notifyFunction('success', 'Add movie successful!')
            }
        } catch (err) {
            notifyFunction('error', err.response.data)
        }
    }
}

export const layThongTinPhimAction = (maPhim) => {
    return async (dispatch) => {
        try {
            const result = await quanLyPhimService.layThongTinPhim(maPhim);
            dispatch({
                type: SET_THONG_TIN_PHIM,
                thongTinPhim: result.data.content
            })
        } catch (err) {
            notifyFunction('error', err.response.data)
        }
    }
}

export const capNhatPhimUploadAction = (formData) => {
    return async (dispatch) => {
        try {
            const result = await quanLyPhimService.capNhatPhimUpload(formData);
            if (result.status === 200) {
                notifyFunction('success', 'Update movie successful!')
            }
            dispatch(layDanhSachPhimAction())
            history.push('/admin/films');
        } catch (err) {
            notifyFunction('error', err.response.data)
        }
    }
}

export const xoaPhimAction = (maPhim) => {
    return async (dispatch) => {
        try {
            const result = await quanLyPhimService.xoaPhim(maPhim);
            if (result.status === 200) {
                notifyFunction('success', 'Delete movie successful!')
            }
            dispatch(layDanhSachPhimAction())

        } catch (err) {
            notifyFunction('error', err.response.data)
        }
    }
}

