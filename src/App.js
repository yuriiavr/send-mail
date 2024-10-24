import { Route, Routes } from "react-router";
import "./App.css";
import Sender from "./pages/SenderPage/senderPage";
import TrackerPage from "./pages/TrakerPage/trackerPage";

function App() {
  return (
      <div className="App">
        <Routes>
          <Route path="/" element={<Sender />} />
          <Route path="/trackpage" element={<TrackerPage />} />
        </Routes>
      </div>
  );
}

export default App;
