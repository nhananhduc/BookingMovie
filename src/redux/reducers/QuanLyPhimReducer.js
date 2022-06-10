import { SET_DANH_SACH_PHIM, SET_FILM_DANG_CHIEU, SET_FILM_SAP_CHIEU, SET_THONG_TIN_PHIM } from "../actions/types/QuanLyPhimType"
import { SET_CHI_TIET_PHIM } from "../actions/types/QuanLyRapType";

const stateDefault = {
    arrFilm: [
        {
            "maPhim": 10559,
            "tenPhim": "PHÙ THỦY TỐI THƯỢNG",
            "biDanh": "phu-thuy-toi-thuong",
            "trailer": "https://www.youtube.com/watch?v=nBNtRvpCmms",
            "hinhAnh": "http://movieapi.cyberlearn.vn/hinhanh/phu-thuy-toi-thuong_gp03.jpg",
            "moTa": "Sau các sự kiện của Avengers: Endgame, Tiến sĩ Stephen Strange tiếp tục nghiên cứu về Viên đá Thời gian. Nhưng một người bạn cũ đã trở thành kẻ thù tìm cách tiêu diệt mọi phù thủy trên Trái đất, làm xáo trộn kế hoạch của Strange và cũng khiến anh ta mở ra một tội ác khôn lường.",
            "maNhom": "GP03",
            "ngayKhoiChieu": "2022-05-12T19:59:29.043",
            "danhGia": 9,
            "hot": true,
            "dangChieu": true,
            "sapChieu": false
        },
        {
            "maPhim": 10559,
            "tenPhim": "PHÙ THỦY TỐI THƯỢNG",
            "biDanh": "phu-thuy-toi-thuong",
            "trailer": "https://www.youtube.com/watch?v=nBNtRvpCmms",
            "hinhAnh": "http://movieapi.cyberlearn.vn/hinhanh/phu-thuy-toi-thuong_gp03.jpg",
            "moTa": "Sau các sự kiện của Avengers: Endgame, Tiến sĩ Stephen Strange tiếp tục nghiên cứu về Viên đá Thời gian. Nhưng một người bạn cũ đã trở thành kẻ thù tìm cách tiêu diệt mọi phù thủy trên Trái đất, làm xáo trộn kế hoạch của Strange và cũng khiến anh ta mở ra một tội ác khôn lường.",
            "maNhom": "GP03",
            "ngayKhoiChieu": "2022-05-12T19:59:29.043",
            "danhGia": 9,
            "hot": true,
            "dangChieu": true,
            "sapChieu": false
        }
    ],
    dangChieu: true,
    sapChieu: true,
    arrFilmDefault: [],
    filmDetail: {},
    thongTinPhim: {}
}

export const QuanLyPhimReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case SET_DANH_SACH_PHIM: {
            state.arrFilm = action.arrFilm;
            state.arrFilmDefault = state.arrFilm;
            return { ...state }
        }
        case SET_FILM_DANG_CHIEU: {
            // state.dangChieu = !state.dangChieu;
            state.arrFilm = state.arrFilmDefault.filter(film => film.dangChieu === state.dangChieu);
            return { ...state }
        }
        case SET_FILM_SAP_CHIEU: {
            // state.sapChieu = !state.sapChieu;
            state.arrFilm = state.arrFilmDefault.filter(film => film.sapChieu === state.sapChieu);
            return { ...state }
        }
        case SET_CHI_TIET_PHIM: {
            state.filmDetail = action.filmDetail;
            return { ...state }
        }
        case SET_THONG_TIN_PHIM:{
            state.thongTinPhim =action.thongTinPhim;
            return {...state}
        }
        default: return { ...state }
    }

}