import React, { useEffect, useState } from "react";
import {
  AppBar,
  Autocomplete,
  IconButton,
  Tab,
  Tabs,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import LocalMoviesSharpIcon from '@mui/icons-material/LocalMoviesSharp';
import { Box } from "@mui/system";
import { getAllMovies } from "../api-helpers/api-helpers";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { adminActions, userActions } from "../store";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAdminLoggedIn = useSelector((state) => state.admin.isLoggedIn);
  const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const [value, setValue] = useState();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getAllMovies()
      .then((data) => setMovies(data.movies))
      .catch((err) => console.log(err));
  }, []);

  const logout = (isAdmin) => {
    dispatch(isAdmin ? adminActions.logout() : userActions.logout());
  };

  const handleChange = (e, val) => {
    const movie = movies.find((m) => m.title === val);
    console.log(movie);
    if (isUserLoggedIn) {
      navigate(`/booking/${movie._id}`);
    }
  };

  return (
    <AppBar position="sticky" sx={{ bgcolor: "#fc8a26" }}>
      <Toolbar>
        <Box display="flex" alignItems="center">
          <IconButton LinkComponent={Link} to="/">
            <LocalMoviesSharpIcon sx={{ fontSize: 40 }} />
          </IconButton>
          <Typography variant="h6" sx={{ marginLeft: 2, fontWeight: "bold" }}>
            MovieTix
          </Typography>
        </Box>
        <Box flexGrow={1} /> {/* Added flex-grow to push the tabs to the right */}
        <Box display={"flex"}>
        <Tabs
  textColor="inherit"
  indicatorColor="secondary"
  value={value}
  onChange={(e, val) => setValue(val)}
>
  <Tab component={Link} to="/movies" label="Movies" />
  {!isAdminLoggedIn && !isUserLoggedIn && (
    <>
      <Tab label="Admin" component={Link} to="/admin" />
      <Tab label="Auth" component={Link} to="/auth" />
    </>
  )}
  {isUserLoggedIn && (
    <>
      <Tab label="Profile" component={Link} to="/user" />
      <Tab
        onClick={() => logout(false)}
        label="Logout"
        component={Link}
        to="/"
      />
    </>
  )}
  {isAdminLoggedIn && (
    <>
      <Tab label="Add Movie" component={Link} to="/add" />
      <Tab label="Profile" component={Link} to="/user-admin" />
      <Tab
        onClick={() => logout(true)}
        label="Logout"
        component={Link}
        to="/"
      />
    </>
  )}
</Tabs>

        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
