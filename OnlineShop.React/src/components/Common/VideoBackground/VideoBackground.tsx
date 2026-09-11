import "./ VideoBackground.css";

function VideoBackground() {
    return (
        <div
            className="video-background"
            aria-hidden="true"
        >
            <video
                className="video-background__video"
                src="/PJUZ7349.MP4"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
            />

            <div className="video-background__overlay" />

            <div className="video-background__vignette" />
        </div>
    );
}

export default VideoBackground;