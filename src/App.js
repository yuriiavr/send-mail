import { Route, Routes } from "react-router-dom";
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
import Loader from "./components/Loader/Loader";
import { setAuthToken } from "./components/api/url";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

function App() {
  const { isRefreshing, token } = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
      setAuthToken(token);

    if (token) {
      dispatch(fetchCurrentUser());
    }
  }, [dispatch, token]);

  return isRefreshing ? (
    <Loader />
  ) : (
    <div className="App">
      <NotificationProvider>
        <Routes>
          {/* Unprotected routes for login and signup */}
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Protected routes wrapped inside ProtectedRoute */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Sender />} />
              <Route path="/trackpage" element={<TrackerPage />} />
              <Route path="/geoTrack" element={<GeoTrackerPage />} />
              <Route path="/textTrack" element={<TextTrackPage />} />
              <Route path="/addTemplate" element={<Template />} />
              <Route path="/manualSender" element={<ManualPage />} />
              <Route path="/deltemplate" element={<DelTemplatePage />} />
              <Route path="/schedulePage" element={<SchedulePage />} />
              <Route path="/userHomepage" element={<UserHomepage />} />
            </Route>
          </Route>
        </Routes>
      </NotificationProvider>
    </div>
  );
}

export default App;