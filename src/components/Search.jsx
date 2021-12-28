/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import axios from "axios";
import {useParams} from "react-router-dom";
import PageSelector from "./PageSelector";
import Card from "./Card";

function Search() {
  const { title, page } = useParams();
  const [inPage, setPage] = React.useState(parseInt(page));
  const [movies, setMovies] = React.useState([]);

  React.useEffect(() => {
    axios
      .get(`/api/movies/search/${title}/${inPage}`)
      .then((re) => re.data)
      .then((data) => setMovies(data.results));
  }, [title, inPage])

  return (
    <div>

      <ul>
        {movies.map((movie, i) => {
          return <Card key={i} movie={movie} />;
        })}
      </ul>
      <PageSelector title={title} inPage={inPage} setPage={setPage} />
    </div>
  );
}

export default Search;
