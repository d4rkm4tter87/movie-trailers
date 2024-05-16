import { Box, Flex, Grid, GridItem, HStack, Show } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import GameGrid from "./components/GameGrid";
import GameHeading from "./components/GameHeading";
import GenreList from "./components/GenreList";
import NavBar from "./components/NavBar";
import PlatformSelector from "./components/PlatformSelector";
import SortSelector from "./components/SortSelector";
import { Platform } from "./hooks/useGames";
import { Genre } from "./hooks/useGenres";
import Header from "./components/Header";
import { Link, NavLink, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Categories from "./components/Categories";
import Category from "./components/Category";
import MovieList from "./components/MovieList";
import Movie from "./components/Movie";
import { db } from "./components/Firebase";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import Movie2 from "./components/Movie2";

export interface GameQuery {
  genre: Genre | null;
  platform: Platform | null;
  sortOrder: string;
  searchText: string;
}

export interface MovieObject {
  title: string | null;
  id: string | null;
  genre: string | null;
  releaseDate: number | null;
  file: string | null;
}

function App() {
  const [gameQuery, setGameQuery] = useState<GameQuery>({} as GameQuery);
  const [movieList, setMovieList] = useState<MovieObject[]>([]);
  const moviesCollectionRef = collection(db, "movies");
  const getMovieList = async () => {
    try {
      const data = await getDocs(moviesCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setMovieList(filteredData);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getMovieList();
  }, []);
  return (
    <>
      <Grid
        templateAreas={{
          base: `"nav nav" "aside main"`,
        }}
      >
        <GridItem area="nav">
          <NavBar
            onSearch={(searchText) =>
              setGameQuery({ ...gameQuery, searchText })
            }
          />
        </GridItem>
        <Show above="lg">
          <GridItem area="aside" paddingX={5}>
            <GenreList
              selectedGenre={gameQuery.genre}
              onSelectGenre={(genre) => setGameQuery({ ...gameQuery, genre })}
            />
          </GridItem>
        </Show>

        <Routes>
          <Route
            path="/"
            element={
              <MovieList
                gameQuery={gameQuery}
                updateMovieList={(x2) => setMovieList(x2)}
              />
            }
          />

          {movieList.map((movie) => (
            <Route
              key={movie.id}
              path={"movies/" + movie.id}
              element={<Movie src={movie.file} title={movie.title} />}
            />
          ))}
          <Route
            path="*"
            element={<h1 className="not-found">Page Not Found</h1>}
          />
        </Routes>
      </Grid>
    </>
  );
}

export default App;
