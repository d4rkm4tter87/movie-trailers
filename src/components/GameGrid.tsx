import { Button, Input, Select, SimpleGrid, Text } from "@chakra-ui/react";
import { GameQuery, MovieObject } from "../App";
import useGames, { Platform } from "../hooks/useGames";
import { Genre } from "../hooks/useGenres";
import GameCard from "./GameCard";
import GameCardContainer from "./GameCardContainer";
import GameCardSkeleton from "./GameCardSkeleton";

import genres from "../data/genres";
import dates from "../data/dates";
import movieLinks from "../data/movieLinks";

import { db } from "./Firebase";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { useEffect, useState } from "react";

interface Props {
  gameQuery: GameQuery;
  updateMovieList: (x: MovieObject[]) => void;
}

const GameGrid = ({ gameQuery, updateMovieList }: Props) => {
  const { data, error, isLoading } = useGames(gameQuery);
  const skeletons = [1, 2, 3, 4, 5, 6];
  if (error) return <Text>{error}</Text>;

  const [movieList, setMovieList] = useState<MovieObject[]>([]);

  const [newMovieTitle, setNewMovieTitle] = useState("");
  const [newMovieFile, setNewMovieFile] = useState("");
  const [newMovieImage, setNewMovieImage] = useState("");
  const [newReleaseDate, setNewReleaseDate] = useState(0);
  const [newGenre, setNewGenre] = useState("");

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
  useEffect(() => {
    updateMovieList(movieList);
  }, [movieList]);
  const onSubmitMovie = async () => {
    try {
      await addDoc(moviesCollectionRef, {
        title: newMovieTitle,
        file: newMovieFile,
        image: newMovieImage,
        releaseDate: newReleaseDate,
        genre: newGenre,
        // file: movieLinks[Math.floor(Math.random() * 7) + 1].url,
      });
      getMovieList();
    } catch (err) {
      console.log(err);
    }
  };

  const updateMovieTitle = async (id: string, title: string) => {
    console.log(id, title);
    const movieDoc = doc(db, "movies", id);
    await updateDoc(movieDoc, { title: title });
    getMovieList();
  };

  const deleteMovie = async (id: string) => {
    console.log(id);
    const movieDoc = doc(db, "movies", id);
    await deleteDoc(movieDoc);
    getMovieList();
  };

  return (
    <>
      <SimpleGrid
        columns={{ sm: 1, md: 2, lg: 3, xl: 5 }}
        padding="10px"
        spacing={3}
      >
        <Input
          width="small"
          placeholder="Title"
          onChange={(e) => setNewMovieTitle(e.target.value)}
        />
        <Input
          placeholder="Video"
          onChange={(e) => setNewMovieFile(e.target.value)}
        />
        <Input
          placeholder="Image"
          onChange={(e) => setNewMovieImage(e.target.value)}
        />
        <Select
          onChange={(e) => setNewReleaseDate(Number(e.target.value))}
          placeholder="Release Date"
        >
          {dates.map((date) => (
            <option key={date.year} value={date.year}>
              {date.year}
            </option>
          ))}
        </Select>
        <Select
          onChange={(e) => setNewGenre(e.target.value)}
          placeholder="Genre"
        >
          {genres.map((genre) => (
            <option key={genre.name} value={genre.name}>
              {genre.name}
            </option>
          ))}
        </Select>
        <Button marginBottom="5px" onClick={onSubmitMovie}>
          Add Movie
        </Button>
      </SimpleGrid>
      <SimpleGrid
        columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}
        padding="10px"
        spacing={6}
      >
        {isLoading &&
          skeletons.map((skeleton) => (
            <GameCardContainer key={skeleton}>
              <GameCardSkeleton />
            </GameCardContainer>
          ))}
        {movieList.map((movie, index) => (
          <GameCardContainer key={index}>
            <GameCard
              key={movie.id}
              linkId={movie.id}
              title={movie.title}
              genre={movie.genre}
              releaseDate={movie.releaseDate}
              file={movie.file}
              image={movie.image}
              deleteMovie={(id) => deleteMovie(id)}
              updateMovieTitle={(id, title) => updateMovieTitle(id, title)}
            />
          </GameCardContainer>
        ))}
      </SimpleGrid>
    </>
  );
};

export default GameGrid;
