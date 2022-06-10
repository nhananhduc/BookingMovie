import {OPEN_VIDEO_MODAL, CLOSE_VIDEO_MODAL} from './types/VideoModalType'

export const displayVideoModal = (trailer) => ({
    type: OPEN_VIDEO_MODAL,
    trailer
})

export const hideVideoModal = () => ({
    type: CLOSE_VIDEO_MODAL
})