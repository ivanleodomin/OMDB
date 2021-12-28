import React from "react";
import { Link } from "react-router-dom";
import "../styles/pageSelector.css";

function PageSelector({ inPage, setPage, title }) {
  return (
    <div className="pageSelector">
      <nav className="pagination ml-6 mr-6">
        {inPage !== 1 && (
          <Link
            className="pagination-previous"
            onClick={() => setPage(inPage - 1)}
            to={`/search/${title}/${inPage + 1}`}
          >
            Previous
          </Link>
        )}
        <Link
          className="pagination-next"
          onClick={() => setPage(inPage + 1)}
          to={`/search/${title}/${inPage + 1}`}
        >
          Next page
        </Link>
      </nav>
    </div>
  );
}

export default PageSelector;
