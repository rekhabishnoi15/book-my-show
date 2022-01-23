import React, { useEffect } from "react";
import "./Details.css";

//react router dom
import { Link } from "react-router-dom";
//material ui
import { GridList, Typography } from "@material-ui/core";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
//material ui icon
import { StarBorder } from "@material-ui/icons";
//react router dom
import { useLocation } from "react-router-dom";
//react youtube
import YouTube from "react-youtube";

const opts = {
  height: "390",
  width: "100%",
  playerVars: {
    // https://developers.google.com/youtube/player_parameters
    autoplay: 1,
  },
};

function Details() {
  const [movieDetail, setMovieDetail] = React.useState("");
  const location = useLocation();
  const path = location.pathname.split("/");
  const id = path[path.length - 1];

  useEffect(() => {
    fetch(`/api/v1/movies/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setMovieDetail(data);
      });
  }, []);

  function onReady(e) {
    e.target.pauseVideo();
  }

  return (
    <div>
      <Typography className="detail__back">
        <Link to="/">&lt; Back to Home</Link>
      </Typography>

      <div className="detail__container">
        {/* first  section  */}

        <section className="detail__first">
          <img
            src={movieDetail.poster_url}
            alt={movieDetail.title}
            className="details__movie-img"
          />
        </section>

        {/* second section  */}

        <section className="detail__second">
          <Typography variant="headline" component="h2">
            {movieDetail.title}
          </Typography>

          <Typography>
            <b>Genre: </b>
            {movieDetail.genres && movieDetail.genres.join(", ")}
          </Typography>

          <Typography>
            <b>Duration: </b>
            {movieDetail.duration}
          </Typography>

          <Typography>
            <b>Release Date: </b>
            {new Date(movieDetail.release_date).toDateString()}
          </Typography>

          <Typography>
            <b>Rating: </b>
            {movieDetail.critics_rating}
          </Typography>

          <Typography style={{ marginTop: "16px" }}>
            <b>Plot: </b>
            <a href={movieDetail.wiki_url || "#"} target="_blank">
              (Wiki Link)
            </a>
            {movieDetail.story_line}
          </Typography>

          <div>
            <Typography style={{ marginTop: "16px" }}>
              <b>Trailer: </b>
            </Typography>
            <YouTube
              videoId={movieDetail.trailer_url}
              opts={opts}
              onReady={onReady}
            />
          </div>
        </section>

        {/* third section  */}

        <section className="detail__third">
          <div>
            <Typography>
              <b>Rate the movie: </b>
            </Typography>

            <StarBorder
              className="detail__star"
              onClick={(e) => {
                e.currentTarget.style.color = "yellow";
              }}
            />
            <StarBorder
              className="detail__star"
              onClick={(e) => {
                e.currentTarget.style.color = "yellow";
              }}
            />
            <StarBorder
              className="detail__star"
              onClick={(e) => {
                e.currentTarget.style.color = "yellow";
              }}
            />
            <StarBorder
              className="detail__star"
              onClick={(e) => {
                e.currentTarget.style.color = "yellow";
              }}
            />
            <StarBorder
              className="detail__star"
              onClick={(e) => {
                e.currentTarget.style.color = "yellow";
              }}
            />
          </div>

          <div>
            <Typography style={{ margin: "16px 0px" }}>
              <b>Artists: </b>
            </Typography>

            <GridList cols={2}>
              {movieDetail.artists
                ? movieDetail.artists.map((artist, i) => (
                    <GridListTile className="filterd__movies" key={i}>
                      <img src={artist.profile_url} alt={artist.first_name} />
                      <GridListTileBar
                        title={artist.first_name + artist.last_name}
                      />
                    </GridListTile>
                  ))
                : " "}
            </GridList>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Details;
