import React, { PropTypes } from 'react';

const Video = ({
  src,
  offscreen,
  fullscreen,
  width,
  height,
  videoCreated,
  autoPlay = false,
  loop = false,
  muted = false,
  playsinline,
  crossOrigin = 'anonymous',
  onLoadedMetadata,
  onCanPlayThrough,
  onEnded,
  onPlaying,
}) => (
  <video
    style={{
      visibility: offscreen ? 'hidden' : 'visible',
      objectFit: fullscreen ? 'cover' : null,
    }}
    ref={videoCreated}
    width={width}
    height={height}
    autoPlay={autoPlay}
    loop={loop}
    controls={false}
    onLoadedMetadata={onLoadedMetadata}
    onCanPlayThrough={onCanPlayThrough}
    onEnded={onEnded}
    onPlaying={onPlaying}
    crossorigin={crossOrigin}
    crossOrigin={crossOrigin}
    muted={muted}
    playsinline={playsinline}
  >
    <source
      src={`${src}.webm`}
      type="video/webm"
    />
    <source
      src={`${src}.mp4`}
      type="video/mp4"
    />
  </video>
)

Video.displayName = 'Video';

export default Video;
