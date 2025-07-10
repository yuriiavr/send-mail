import { Link, useLocation } from "react-router-dom";
import css from "./Header.module.css";
import { useState } from "react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const openAdd = () => {
    setIsOpen(!isOpen);
  };

  const isMailingActive = location.pathname === "/" || location.pathname === "/manualSender";;
  const isStatActive = location.pathname === "/trackpage" || location.pathname === "/geoTrack" || location.pathname === "/textTrack";
  const isAddTemplateActive = location.pathname === "/addTemplate";
  const isDelTemplateActive = location.pathname === "/delTemplate";
  const isScheduleActive = location.pathname === "/schedulePage";

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
        <Link
          className={`${css.link} ${isMailingActive ? css.activeLink : ""}`}
          to="/"
        >
          Mailing
        </Link>
        <Link
          className={`${css.link} ${isStatActive ? css.activeLink : ""}`}
          to="/trackpage"
        >
          Stat
        </Link>
      </div>
      <div style={{ position: "relative" }}>
        <button
          className={`${css.link} ${isOpen ? css.activeLink : ""}`}
          style={{
            background: "transparent",
            border: "none",
            cursor: "pointer",
          }}
          onClick={openAdd}
        >
          ADD
        </button>
        <div
          className={css.addCont}
          style={{ display: isOpen ? "flex" : "none" }}
        >
          <Link
            className={`${css.link} ${isAddTemplateActive ? css.activeLink : ""}`}
            to="/addTemplate"
          >
            Add Template
          </Link>
                    <Link
            className={`${css.link} ${isDelTemplateActive ? css.activeLink : ""}`}
            to="/delTemplate"
          >
            Delete Template
          </Link>
          <Link
            className={`${css.link} ${isScheduleActive ? css.activeLink : ""}`}
            to="/schedulePage"
          >
            Schedule
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;