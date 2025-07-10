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

function App() {
  return (
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
          </Route>
        </Routes>
      </NotificationProvider>
    </div>
  );
}

export default App;
