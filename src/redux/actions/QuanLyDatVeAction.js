import { connection } from "../../index";
import { quanLyDatVeService } from "../../services/QuanLyDatVeService"
import { notifyFunction } from "../../util/Notification/notification";
import { displayLoadingAction, hideLoadingAction } from "./LoadingAction";
import { CHUYEN_TAB, DAT_VE, DAT_VE_HOAN_TAT, SET_CHI_TIET_PHONG_VE } from "./types/QuanLyDatVeType";

export const layChiTietPhongVeAction = (maLichChieu) => {
    return async dispatch => {
        try {
            const result = await quanLyDatVeService.layChiTietPhongVe(maLichChieu);

            if (result.status === 200) {
                dispatch({
                    type: SET_CHI_TIET_PHONG_VE,
                    chiTietPhongVe: result.data.content
                })
            }
        } catch (err) {
            notifyFunction('error', err.response.data)
        }
    }
}

export const datVeAction = (thongTinDatVe) => {
    return async (dispatch, getState) => {
        try {
            dispatch(displayLoadingAction)
            await quanLyDatVeService.datVe(thongTinDatVe);

            await dispatch(layChiTietPhongVeAction(thongTinDatVe.maLichChieu))
            await dispatch({ type: DAT_VE_HOAN_TAT })
            await dispatch(hideLoadingAction);
            let userLogin = getState().QuanLyUserReducer.userLogin
            connection.invoke('datGheThanhCong', userLogin.taiKhoan, thongTinDatVe.maLichChieu)
            dispatch({
                type: CHUYEN_TAB
            })
        } catch (err) {
            notifyFunction('error', err.response.data)
            dispatch(hideLoadingAction)
        }
    }
}
export const datGheAction = (ghe, maLichChieu) => {
    return async (dispatch, getState) => {
        await dispatch({
            type: DAT_VE,
            gheDuocChon: ghe
        })
        let danhSachGheDangDat = getState().QuanLyDatVeReducer.danhSachGheDangDat;
        let taiKhoan = getState().QuanLyUserReducer.userLogin.taiKhoan;
        danhSachGheDangDat = JSON.stringify(danhSachGheDangDat)
        connection.invoke('datGhe', taiKhoan, danhSachGheDangDat, maLichChieu)
    }
}