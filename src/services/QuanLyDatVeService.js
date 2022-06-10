

import { BaseService } from "./baseService";

export class QuanLyDatVeService extends BaseService {
    layChiTietPhongVe = (maLichChieu) => {
        return this.get(`api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maLichChieu}`)
    }

    datVe = (thongTinDatVe) => {
        return this.post(`api/QuanLyDatVe/DatVe`, thongTinDatVe)
    }
    taoLichChieu = (thongTinLichChieu) => {
        return this.post(`api/QuanLyDatVe/TaoLichChieu`, thongTinLichChieu)
    }
}
export const quanLyDatVeService = new QuanLyDatVeService();