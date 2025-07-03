import { Link, useLocation } from "react-router-dom";
import css from "./Header.module.css";
import { useState } from "react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const openAdd = () => {
    setIsOpen(!isOpen);
  };

  const isHome = location.pathname === "/";
  const isTrack = location.pathname === "/trackpage";

  return (
    <div className={css.header}>
      <div className={css.logoCont}>
        <img
          className={css.logo}
          src={require("../../img/logo.png")}
          alt="logo"
        />
      </div>
      <div className={css.navigation}>
        <Link className={css.link} to="/">
          Mailing
        </Link>
        <Link className={css.link} to="/trackpage">
          Stat
        </Link>
      </div>
      <div style={{ position: "relative" }}>
        <button
          className={css.link}
          style={{
            background: "transparent",
            border: "none",
            cursor: "pointer",
          }}
          onClick={openAdd}
        >
          Add
        </button>
        <div
          className={css.addCont}
          style={{ display: isOpen ? "flex" : "none" }}
        >
          <Link className={css.link} to="/addTemplate">
            Tamplate
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
