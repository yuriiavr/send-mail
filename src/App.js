import { Route, Routes } from "react-router";
import "./App.css";
import Sender from "./pages/SenderPage/senderPage";
import TrackerPage from "./pages/TrakerPage/trackerPage";
import Template from "./pages/TemplatePage/templatePage";
import GeoTrackerPage from "./pages/GeoTrackPage/GeoTrackPage";
import ManualPage from "./pages/ManualPage/ManualPage";
import MainLayout from "./layouts/MainLayout";
import TextTrackPage from "./pages/TextTrackPage/TextTrackPage";
import DelTemplatePage from "./pages/DelTemplatePage/DelTemplatePage";
import { NotificationProvider } from "./components/Notifications/Notifications";
import SchedulePage from "./pages/SchedulePage/SchedulePage";
import LogIn from "./pages/LogInPage/LogInPage";
import SignUp from "./pages/SignUpPage/SignUpPage";
import { useAuth } from "./hooks/useAuth";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchCurrentUser } from "./redux/auth/operations";
import UserHomepage from "./pages/UserHomepage/UserHomepage";
import axios from "axios";
import { BASE_URL } from "./components/api/api"; 

axios.defaults.baseURL = BASE_URL;

function App() {
  const { isRefreshing, token } = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    }
    dispatch(fetchCurrentUser());
  }, [dispatch, token]);

  return isRefreshing ? (<b>Refreshing user....</b>) : (
    <div className="App">
      <NotificationProvider>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route path="/" element={<Sender />} />
            <Route path="/trackpage" element={<TrackerPage />} />
            <Route path="/geoTrack" element={<GeoTrackerPage />} />
            <Route path="/textTrack" element={<TextTrackPage />} />
            <Route path="/addTemplate" element={<Template />} />
            <Route path="/manualSender" element={<ManualPage />} />
            <Route path="/deltemplate" element={<DelTemplatePage />} />
            <Route path="/schedulePage" element={<SchedulePage />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/userHomepage" element={<UserHomepage />} />
          </Route>
        </Routes>
      </NotificationProvider>
    </div>
  );
}

export default App;