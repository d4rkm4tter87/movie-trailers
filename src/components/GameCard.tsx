import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Heading,
  HStack,
  Image,
  Input,
  Text,
} from "@chakra-ui/react";
import React, { useState, useRef, useEffect } from "react";
import { Game } from "../hooks/useGames";
import getCroppedImageUrl from "../services/image-url";
import CriticScore from "./CriticScore";
import Emoji from "./Emoji";
import PlatformIconList from "./PlatformIconList";
import { NavLink } from "react-router-dom";
import { BsFillPencilFill } from "react-icons/bs";

interface Props {
  linkId: string | null;
  title: string | null;
  genre: string | null;
  releaseDate: number | null;
  file: string | null;
  image: string | null;
  deleteMovie: (id: string) => void;
  updateMovieTitle: (id: string, title: string) => void;
}
const GameCard = ({
  linkId,
  title,
  genre,
  releaseDate,
  file,
  image,
  deleteMovie,
  updateMovieTitle,
}: Props) => {
  const [editField, setEditField] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState(title);
  const [showImg, setShowImg] = useState(true);
  const [showVideo, setShowVideo] = useState(false);

  const videoRef = useRef();
  useEffect(() => {}, []);

  const hoverImgIn = () => {
    setShowImg(false);
    setShowVideo(true);
  };
  const hoverImgOut = () => {
    setShowImg(true);
    setShowVideo(false);
  };
  return (
    <Card>
      <NavLink to={"/movies/" + linkId}>
        <CardHeader
          height="200px"
          padding={1}
          onMouseOver={hoverImgIn}
          onMouseLeave={hoverImgOut}
        >
          {showImg && <Image src={image} />}
          {showVideo && <video src={file} autoPlay={true} muted={true} />}
        </CardHeader>
      </NavLink>
      <CardBody>
        <Box display="flex" alignItems="baseline">
          <NavLink to={"/movies/" + linkId}>
            <Heading fontSize="2xl" marginRight="25px">
              {title} ({releaseDate})
            </Heading>
          </NavLink>
          <BsFillPencilFill
            style={{ cursor: "pointer" }}
            onClick={() => setEditField(!editField)}
          />
        </Box>
        <Heading fontSize="1xl">Genre: {genre}</Heading>
        {editField && (
          <>
            <Box display="flex" alignItems="baseline">
              <Input
                value={updatedTitle || ""}
                onChange={(e) => setUpdatedTitle(e.target.value)}
                placeholder="Edit Title"
              />
              <Button
                onClick={() => updateMovieTitle(linkId, updatedTitle)}
                marginX={5}
              >
                Update
              </Button>
            </Box>
            <Button onClick={() => deleteMovie(linkId)}>Delete</Button>
          </>
        )}
      </CardBody>
    </Card>
  );
};

export default GameCard;
