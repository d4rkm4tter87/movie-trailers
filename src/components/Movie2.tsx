import {
  Button,
  Grid,
  GridItem,
  Heading,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { useState, useEffect, useRef } from "react";
import ReactPlayer from "react-player";

interface Props {
  src: string | null;
  title: string | null;
}

const Movie2 = ({ src, title }: Props) => {
  return (
    <div>
      <div className="player-wrapper">
        <ReactPlayer
          className="react-player"
          width="100%"
          height="100%"
          url="http://joschkazimdars.com/movbies/twisters.mp4"
          playing={true}
          muted={true}
        />
        <div className="controls-wrapper">
          <Grid
            flexDirection={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
            style={{ padding: 16 }}
          >
            <GridItem>
              <Text>asdf</Text>
            </GridItem>
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default Movie2;
