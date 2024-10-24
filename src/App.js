import { Route, Routes } from "react-router";
import "./App.css";
import Sender from "./pages/SenderPage/senderPage";
import TrackerPage from "./pages/TrakerPage/trackerPage";
import Group from "./pages/GroupPage/groupPage";
import Template from "./pages/TemplatePage/templatePage";

function App() {
  return (
      <div className="App">
        <Routes>
          <Route path="/" element={<Sender />} />
          <Route path="/trackpage" element={<TrackerPage />} />
          <Route path="/addGroup" element={<Group />} />
          <Route path="/addTemplate" element={<Template />} />
        </Routes>
      </div>
  );
}

export default App;
