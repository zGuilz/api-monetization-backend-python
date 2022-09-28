import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { loadWeb3 } from "./shared/ApiMonetization";
import Home from "./views/Home";
import Requests from "./views/Requests";

function App() {
  useEffect(() => {
    loadWeb3();
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="requestsmade" element={<Requests />} />
      </Routes>
    </div>
  );
}

export default App;
