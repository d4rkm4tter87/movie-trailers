import { Button, Heading, SimpleGrid } from "@chakra-ui/react";
import { useState, useEffect, useRef } from "react";
import GameCardContainer from "./GameCardContainer";

interface Props {
  src: string | null;
  title: string | null;
}

function Movie({ src, title }: Props) {
  const videoRef = useRef();

  const [isPlaying, setIsPlaying] = useState(true);
  const [volume, setVolume] = useState(100);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    setIsPlaying(true);
    setVolume(100);
    setPosition(0);
    setDuration(0);
    videoRef.current.play();
  }, []);

  return (
    <SimpleGrid
      columns={{ sm: 1, md: 1, lg: 1, xl: 1 }}
      marginRight="100px"
      spacing={6}
    >
      <Heading marginTop="50px" fontSize="2xl">
        {title}
      </Heading>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "left",
        }}
      >
        <video
          style={{
            width: "100%",
          }}
          src={src}
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
          onLoadedData={(event) => {
            setDuration(videoRef.current.duration);
          }}
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
              console.log(position, event.target.value);
              setPosition(position);
              videoRef.current.currentTime =
                position * videoRef.current.duration;
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
    </SimpleGrid>
  );
}

export default Movie;
