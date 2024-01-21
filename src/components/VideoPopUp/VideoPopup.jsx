import React from 'react'
import "./videoPopup.scss"
import ReactPlayer from 'react-player'

const VideoPopup = ({videoId, setShow, setVideoId, show}) => {
    const hidePopup = ()=>{
        setShow(false)
        setVideoId(null)
    }
  return (
    <div className={`videoPopup ${show ? "visible" : ""}`}>
        <div className='opacity-layer' onClick={hidePopup}></div>
        <div className='videoPlayer'>
            <span className='closeBtn' onClick={hidePopup}>
                X Close
            </span>
            <ReactPlayer
            url={`https://www.youtube.com/watch?v=${videoId}`}
            controls
            width="100%"
            height="100%"
            muted
            />
        </div>

    </div>
  )
}

export default VideoPopup