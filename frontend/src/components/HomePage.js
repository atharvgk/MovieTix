import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllMovies } from "../api-helpers/api-helpers";
import MovieItem from "./Movies/MovieItem";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    getAllMovies()
      .then((data) => setMovies(data.movies))
      .catch((err) => console.log(err));
  }, []);
  return (
    <Box width={"100%"} height="100%" margin="auto" marginTop={2}>
      <Box width={"100%"} height="100%" margin="auto" marginTop={2}>
  <Box margin={"auto"} width="80%" height={"80vh"} padding={2}>
    <img
      src="https://m.media-amazon.com/images/M/MV5BMjQxYmNjYTUtMjFmZC00MmMxLWFlMTMtZTFlOGIxZGNhOGEzXkEyXkFqcGdeQXVyMTE0MzQwMjgz"
      alt="Brahmastra"
      width={"100%"}
      height={"100%"}
      style={{ borderRadius: "10px" }} // Adjust the value as needed
    />
  </Box>
</Box>

      <Box padding={5} margin="auto">
        <Typography variant="h4" textAlign={"center"}>
          Latest Releases
        </Typography>
      </Box>
      <Box
        margin={"auto"}
        display="flex"
        width="80%"
        justifyContent={"center"}
        alignItems="center"
        flexWrap="wrap"
      >
        {movies &&
          movies
            .slice(0, 4)
            .map((movie, index) => (
              <MovieItem
                id={movie.id}
                title={movie.title}
                posterUrl={movie.posterUrl}
                releaseDate={movie.releaseDate}
                key={index}
              />
            ))}
      </Box>
      <Box display="flex" padding={5} margin="auto">
      <Button
  LinkComponent={Link}
  to="/movies"
  variant="outlined"
  sx={{
    margin: "auto",
    color: "#2b2d42",
    '&:hover': {
      backgroundColor: "#fc8a26",
    },
  }}
>
  View All Movies
</Button>

      </Box>
    </Box>
  );
};

export default HomePage;
