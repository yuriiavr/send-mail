import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../redux/auth/operations";
import css from "./Header.module.css";
import { useAuth } from "../../hooks/useAuth";
import { ReactComponent as LogOutIcon } from '../../img/logout.svg';
import { ReactComponent as UserIcon } from '../../img/user.svg';


const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const { isLoggedIn } = useAuth();

  const openAdd = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    dispatch(logoutUser())
      .then((res) => console.log(res))
      .catch((error) => console.error(error));
  };

  const isMailingActive = location.pathname === "/" || location.pathname === "/manualSender";
  const isStatActive = location.pathname === "/trackpage" || location.pathname === "/geoTrack" || location.pathname === "/textTrack";
  const isAddTemplateActive = location.pathname === "/addTemplate";
  const isDelTemplateActive = location.pathname === "/delTemplate";
  const isScheduleActive = location.pathname === "/schedulePage";
  const isLogInActive = location.pathname === "/login";
  const isSignUpActive = location.pathname === "/signup";
  const isUserHomePageActive = location.pathname === "/userhomepage";

  

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
        <button
          className={`${css.link} ${isOpen ? css.activeLink : ""} ${css.addBtn}`}
          onClick={openAdd}
          style={{
            background: "transparent",
            border: "none",
            cursor: "pointer",
            letterSpacing: 'inherit',
            fontFamily: 'inherit'
          }}
        >
          ADD
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
        </button>
      </div>

      <div className={css.authSection}>
        {isLoggedIn ? (
          <>
          <Link
              to={"/userhomepage"}
              className={`${css.profileIconLink} ${isUserHomePageActive ? css.activeLink : ""}`}
              
            >
              <UserIcon className={css.icon} width="30" height="30" />
            </Link>
            <button
              className={`${css.link} ${css.logoutButton}`}
              style={{border: 'none', background: 'transparent', cursor: 'pointer'}}
              onClick={handleLogout}
            >
               <LogOutIcon className={css.icon} width="30" height="30" />
            </button>
            
          </>
        ) : (
          <>
            <Link
              className={`${css.link} ${isLogInActive ? css.activeLink : ""}`}
              style={{marginRight: '15px'}}
              to="/login"
            >
              Log In
            </Link>
            <Link
              className={`${css.link} ${isSignUpActive ? css.activeLink : ""}`}
              to="/signup"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;