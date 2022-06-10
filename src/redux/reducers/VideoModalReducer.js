import { CLOSE_VIDEO_MODAL, OPEN_VIDEO_MODAL } from "../actions/types/VideoModalType"

const stateDefault = {
    visibleVideoModal: false,
    trailer: ''
}

export const VideoModalReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case OPEN_VIDEO_MODAL:
            state.visibleVideoModal = true;
            state.trailer = action.trailer;
            return { ...state }
        case CLOSE_VIDEO_MODAL:
            state.visibleVideoModal = false;
            return { ...state }
        default: return { ...state }
    }
}