import React, { useState } from "react";
import "./videosSection.scss";
import ContentWrapper from "../../../components/ContentWrapper/ContentWrapper";
import VideoPopup from "../../../components/VideoPopUp/VideoPopup";
import Img from "../../../components/LazyLoadImg/Img";
import { PlayBtn } from "../PlayBtn";

const VideosSection = ({ data, loading }) => {
  const [show, setShow] = useState(false);
  const [videoId, setVideoId] = useState(null);
  const loadingSkeleton = () => {
    return (
      <div className="skItem">
        <div className="thumb skeleton"></div>
        <div className="row skeleton"></div>
        <div className="row2 skeleton"></div>
      </div>
    );
  };
  return (
    <div className="videosSection">
      <ContentWrapper>
        <div className="sectionHeading">Official Videos</div>
        {loading ? (
          <div className="videoSkeleton">
            {loadingSkeleton()}
            {loadingSkeleton()}
            {loadingSkeleton()}
            {loadingSkeleton()}
            {loadingSkeleton()}
          </div>
        ) : (
          <div className="videos">
            {data?.results?.map((video) => (
              <div
                key={video.id}
                className="videoItem"
                onClick={() => {
                  setVideoId(video.key);
                  setShow(true);
                }}
              >
                <div className="videoThumbnail">
                    <Img src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`}/>
                    <PlayBtn/>
                </div>
                <div className="videoTitle">
                    {video.name}
                </div>
              </div>
            ))}
          </div>
        )}
      </ContentWrapper>
      <VideoPopup
        show={show}
        setShow={setShow}
        videoId={videoId}
        setVideoId={setVideoId}
      />
    </div>
  );
};

export default VideosSection;
