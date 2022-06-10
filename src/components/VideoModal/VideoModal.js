import React, { useState } from "react";
import "./VideoModal.css";
import { IoCloseOutline } from "react-icons/io5";
import { BiLoaderAlt } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { hideVideoModal } from "../../redux/actions/VideoModalAction";

export default function VideoModal() {
    const [videoLoading, setVideoLoading] = useState(true);
    const { visibleVideoModal } = useSelector(state => state.VideoModalReducer);
    const { trailer } = useSelector(state => state.VideoModalReducer);
    const dispatch = useDispatch();
    const spinner = () => {
        setVideoLoading(!videoLoading);
    };

    return (
        <div>
            {visibleVideoModal ? (
                <section className="modal__bg">
                    <div className="modal__align">
                        <div className="modal__content">
                            <IoCloseOutline
                                className="modal__close"
                                arial-label="Close modal"
                                onClick={() => {
                                    dispatch(hideVideoModal())
                                }}
                            />
                            <div className="modal__video-align">
                                {videoLoading ? (
                                    <div className="modal__spinner">
                                        <BiLoaderAlt
                                            className="modal__spinner-style"
                                            fadein="none"
                                        />
                                    </div>
                                ) : null}
                                <iframe
                                    className="modal__video-style"
                                    onLoad={spinner}
                                    loading="lazy"
                                    width="800"
                                    height="500"
                                    src={`${trailer}?autoplay=1`}
                                    title="YouTube video player"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        </div>
                    </div>
                </section>
            ) : null}
        </div>
    )
}
