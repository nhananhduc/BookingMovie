

import { quanLyPhimService } from '../../services/QuanLyPhimService';
import { notifyFunction } from '../../util/Notification/notification';
import { SET_CAROUSEL } from './types/CarouselType';

export const getCarouselAction = () => {
    return async (dispatch) => {
        try {
            const result = await quanLyPhimService.layDanhSachBanner();
            dispatch({
                type: SET_CAROUSEL,
                arrImg: result.data.content
            })
        } catch (err) {
            notifyFunction('error', err.response.data)
        }
    }
}