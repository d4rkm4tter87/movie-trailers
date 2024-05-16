import { Box, GridItem } from "@chakra-ui/react";
import GameHeading from "./GameHeading";
import GameGrid from "./GameGrid";
import { GameQuery, MovieObject } from "../App";

interface Props {
  gameQuery: GameQuery;
  updateMovieList: (x: MovieObject[]) => void;
}

const MovieList = ({ gameQuery, updateMovieList }: Props) => {
  return (
    <GridItem area="main">
      <Box>
        <GameHeading gameQuery={gameQuery} />
      </Box>
      <GameGrid
        gameQuery={gameQuery}
        updateMovieList={(x2) => updateMovieList(x2)}
      />
    </GridItem>
  );
};

export default MovieList;
