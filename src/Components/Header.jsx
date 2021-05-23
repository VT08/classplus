import React, { useRef } from "react";
import "bulma/css/bulma.min.css";

export const Header = ({ setSearch, setimageList }) => {
  const searchRef = useRef(null);

  return (
    <nav className="navbar is-fixed-top is-dark is-spaced">
      <div className="columns is-centered is-mobile" style={{ width: "100%" }}>
        <div className="column is-flex is-three-quarters-mobile is-two-thirds-tablet is-half-desktop ">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setimageList([]);
              setSearch(searchRef.current.value);
            }}
            style={{ width: "100%" }}
          >
            <input
              className="input is-small is-rounded is-align-self-center is-align-self-center"
              type="text"
              placeholder="Search"
              ref={searchRef}
            ></input>
          </form>
        </div>
      </div>
    </nav>
  );
};
