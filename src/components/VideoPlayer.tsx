import { Button } from "@chakra-ui/react";
import { useState, useEffect, useRef } from "react";

function VideoPlayer() {
  const videoRef = useRef();
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(100);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    setIsPlaying(false);
    setVolume(100);
    setPosition(0);
    setDuration(0);
    videoRef.current.volume = 1;
  }, []);

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <br />
      <br />
      <br />
      <br />
      <br />
      <video
        style={{
          width: "100%",
        }}
        ref={videoRef}
        onPause={() => {
          setIsPlaying(false);
        }}
        onPlay={() => {
          setIsPlaying(true);
        }}
        onVolumeChange={(event) => {
          const volume = event.target.volume;
          setVolume(volume * 100);
        }}
        onTimeUpdate={(event) => {
          videoRef.current.currentTime;
          setPosition(
            duration > 0 ? videoRef.current.currentTime / duration : 0
          );
        }}
        onEnded={() => {
          onEnded && onEnded();
        }}
        onLoadedData={(event) => {
          setDuration(videoRef.current.duration);
        }}
        controls
      />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button
          onClick={() => {
            if (isPlaying) {
              videoRef.current.pause();
              setIsPlaying(true);
            } else {
              videoRef.current.play();
              setIsPlaying(false);
            }
          }}
        >
          {isPlaying ? "Pause" : "Play"}
        </Button>
        <Button
          onClick={() => {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
            setIsPlaying(false);
          }}
        >
          Stop
        </Button>
        <input
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={(event) => {
            const volume = parseInt(event.target.value);
            setVolume(volume);
            videoRef.current.volume = volume / 100;
          }}
        ></input>
        <div style={{ width: "100px" }}>{Math.round(volume)}</div>

        <input
          type="range"
          min="0"
          max="1"
          step=".01"
          value={position}
          onChange={(event) => {
            const position = parseFloat(event.target.value);
            setPosition(position);
            videoRef.current.currentTime = position * videoRef.current.duration;
          }}
        ></input>
        <div style={{ width: "100px" }}>
          {videoRef.current
            ? Math.round(position * videoRef.current.duration)
            : 0}{" "}
          / {Math.round(duration)}
        </div>
      </div>
    </div>
  );
}

export default VideoPlayer;
