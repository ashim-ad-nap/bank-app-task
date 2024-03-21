import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/Home";
import { Route, Routes } from "react-router-dom";
import Profile from "./components/Profile";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
