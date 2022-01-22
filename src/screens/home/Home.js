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
} from "@material-ui/core/";

function Home() {
  const [upcomingMovies, setUpcomingMovies] = React.useState([]);
  const [filterMovies, setFilterMovies] = React.useState([]);
  const [fillterState, setFilterState] = React.useState({
    movieName: "",
    genres: "action",
    artist: "",
    releaseStart: "",
    releaseEnd: "",
  });

  useEffect(() => {
    if (!upcomingMovies.length) {
      // fetch("/api/v1/movies?page=1&limit=6")
      fetch("https://api.themoviedb.org/3/movie/popular", {
        method: "GET",
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MjNlMjA1MmQ5ZjhkOWY5Y2MxYzJmNDdkMTJlNDliZiIsInN1YiI6IjVmY2I0ZGFjMzk0YTg3MDA0MmQ2NzliZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.X-w0XvZZb7Rc7p9bWVwNJswJ48mNieBGRKgkc9wHmgw`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          // setUpcomingMovies(data.movies);
          setUpcomingMovies(data.results);
        });
    }
  }, []);

  function filterStateHandler(name, value) {
    setFilterState({ ...fillterState, [name]: value });
  }

  function submitHandler(e) {
    e.preventDefault();

    console.log(fillterState);
  }

  return (
    <div className="home">
      <div className="home__heading">Upcoming Movies</div>
      {/* upcoming movies section */}

      <section className="upcoming__container">
        {upcomingMovies.map((movie, i) => (
          <GridListTile key={i} className="upcoming__movies">
            <img
              src={"https://image.tmdb.org/t/p/w300" + movie.poster_path}
              alt={movie.title}
            />
            <GridListTileBar title={movie.title} />
          </GridListTile>
        ))}
      </section>
      <section className="filterd">
        <div className="filterd__container">
          {filterMovies.map((movie, i) => (
            <GridListTile key={i} className="filterd__movies">
              <img
                src={"https://image.tmdb.org/t/p/w300" + movie.poster_path}
                alt={movie.title}
              />
              <GridListTileBar
                title={movie.title}
                subtitle={
                  <span>
                    Release Date:
                    {new Date(1631685556789).toString().substring(4, 15)}
                  </span>
                }
              />
            </GridListTile>
          ))}
        </div>

        <Card className="filterd__card" theme={{}}>
          <Typography color="primary.light" component="h1">
            Find Movies BY
          </Typography>

          <form onSubmit={submitHandler} className="filterd_form">
            <FormControl>
              <TextField
                value={fillterState.movieName}
                onChange={(e) =>
                  filterStateHandler("movieName", e.target.value)
                }
                type="text"
                placeholder="Movie Name"
                required
              />
            </FormControl>
            <FormControl>
              <Select
                value={fillterState.genres}
                onChange={(e) => filterStateHandler("genres", e.target.value)}
                input={<Input name="genres" />}
                displayEmpty
                name="Genre"
              >
                <MenuItem value={"action"}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>

            <FormControl>
              <Select
                value={fillterState.artist}
                onChange={(e) => filterStateHandler("artist", e.target.value)}
                input={<Input name="artist" placeholder="Artist" />}
              >
                <MenuItem value={"action"}>Action</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>

            <FormControl>
              <TextField
                id="date"
                label="Release Date Start"
                type="date"
                defaultValue="2017-05-24"
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
                defaultValue="2017-05-24"
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
