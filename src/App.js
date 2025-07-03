import { Route, Routes } from "react-router";
import "./App.css";
import Sender from "./pages/SenderPage/senderPage";
import TrackerPage from "./pages/TrakerPage/trackerPage";
import Template from "./pages/TemplatePage/templatePage";
import GeoTrackerPage from "./pages/GeoTrackPage/GeoTrackPage";
import ManualPage from "./pages/ManualPage/ManualPage";
import MainLayout from "./layouts/MainLayout";
import TextTrackPage from "./pages/TextTrackPage/TextTrackPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="/" element={<Sender />} />
          <Route path="/trackpage" element={<TrackerPage />} />
          <Route path="/geoTrack" element={<GeoTrackerPage />} />
          <Route path="/textTrack" element={<TextTrackPage />} />
          <Route path="/addTemplate" element={<Template />} />
          <Route path="/manualSender" element={<ManualPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
