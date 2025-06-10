import { BrowserRouter as Router, Routes, Route, useLocation, Link } from "react-router-dom";
import css from './Navigation.module.css'

const Navigation = () => {
    const location = useLocation();
  
    return (
      <div style={{display: "flex", flex: "1", background: "#3A3A3A"}}>
        <Link
          className={css.page}
          to="/trackpage"
          style={{
            marginRight: "10px",
            background: location.pathname === "/trackpage" ? "#6a6a6a" : "#3A3A3A",
            pointerEvents: location.pathname === "/trackpage" ? "none" : "auto",
            color: location.pathname === "/trackpage" ? "#ccc" : "#fff",
          }}
        >
          📩 All stats
        </Link>
  
        <Link
          to="/geoTrack"
          className={css.page}
          style={{
            background: location.pathname === "/geoTrack" ? "#6a6a6a" : "#3A3A3A",
            pointerEvents: location.pathname === "/geoTrack" ? "none" : "auto",
            color: location.pathname === "/geoTrack" ? "#ccc" : "#fff",
          }}
        >
          🌍 Geo stats
        </Link>
      </div>
    );
  };

  export default Navigation;