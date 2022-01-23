import React, { useEffect } from "react";
//styles
import "./Home.css";
//material ui
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import {
  FormControl,
  TextField,
  Select,
  MenuItem,
  Input,
  Button,
  Checkbox,
} from "@material-ui/core/";
//react router dom
import { Link } from "react-router-dom";

const genreList = [
  "action",
  "drama",
  "romance",
  "horror",
  "crime",
  "thriller",
  "fantasy",
];

const artistList = [
  "leonardo dicarpio",
  "hrithik roshan",
  "allu arjun",
  "vijay deverkonda",
];

function Home() {
  const [upcomingMovies, setUpcomingMovies] = React.useState([]);
  const [filterMovies, setFilterMovies] = React.useState([]);
  const [fillterState, setFilterState] = React.useState({
    movieName: "",
    genres: [],
    artist: [],
    releaseStart: "",
    releaseEnd: "",
  });

  useEffect(() => {
    if (!upcomingMovies.length) {
      fetch("/api/v1/movies?page=1&limit=6")
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setUpcomingMovies(data.movies || []);
          setFilterMovies((data.movies && data.movies.slice(0, 4)) || []);
        });
    }
  }, []);

  function filterStateHandler(name, value) {
    setFilterState({ ...fillterState, [name]: value });
  }

  function submitHandler(e) {
    e.preventDefault();
  }

  return (
    <div className="home">
      <div className="home__heading">Upcoming Movies</div>
      {/* upcoming movies section */}

      <section className="upcoming__container">
        {upcomingMovies.map((movie, i) => (
          <GridListTile key={i} className="upcoming__movies">
            <img src={movie.poster_url} alt={movie.title} />
            <GridListTileBar title={movie.title} />
          </GridListTile>
        ))}
      </section>
      <section className="filterd">
        <div className="filterd__container">
          {filterMovies.map((movie, i) => (
            <Link to={`/movie/${movie.id}`} key={i}>
              <GridListTile className="filterd__movies">
                <img src={movie.poster_url} alt={movie.title} />
                <GridListTileBar
                  title={movie.title}
                  subtitle={
                    <span>
                      Release Date:
                      {new Date(movie.release_at).toDateString()}
                    </span>
                  }
                />
              </GridListTile>
            </Link>
          ))}
        </div>

        <Card className="filterd__card" theme={{}}>
          <Typography component="h1">Find Movies BY</Typography>

          <form onSubmit={submitHandler} className="filterd_form">
            <FormControl>
              <TextField
                value={fillterState.movieName}
                onChange={(e) =>
                  filterStateHandler("movieName", e.target.value)
                }
                type="text"
                label="Movie Name"
              />
            </FormControl>
            <FormControl>
              <Select
                value={fillterState.genres}
                onChange={(e) => filterStateHandler("genres", e.target.value)}
                input={<Input placeholder="Genres" />}
                displayEmpty
                renderValue={() => "Genres"}
                multiple
              >
                {genreList.map((genre, i) => (
                  <MenuItem value={genre} key={i} className="text-capitalize">
                    <Checkbox
                      checked={fillterState.genres.includes(genre)}
                      // onChange={() => {}}
                    />
                    {genre}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl>
              <Select
                value={fillterState.artist}
                onChange={(e) => filterStateHandler("artist", e.target.value)}
                input={<Input />}
                displayEmpty
                renderValue={() => "Artists"}
                multiple
              >
                {artistList.map((artist, i) => (
                  <MenuItem value={artist} key={i} className="text-capitalize">
                    <Checkbox checked={fillterState.artist.includes(artist)} />
                    {artist}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl>
              <TextField
                id="date"
                label="Release Date Start"
                type="date"
                value={fillterState.releaseStart}
                onChange={(e) =>
                  filterStateHandler("releaseStart", e.target.value)
                }
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </FormControl>
            <FormControl>
              <TextField
                id="date"
                label="Release Date End"
                type="date"
                value={fillterState.releaseEnd}
                onChange={(e) =>
                  filterStateHandler("releaseEnd", e.target.value)
                }
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </FormControl>

            <Button type="submit" variant="contained" color="primary">
              Apply
            </Button>
          </form>
        </Card>
      </section>
    </div>
  );
}

export default Home;
