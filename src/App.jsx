import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Gallery from "./Gallery";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/gallery" element={<Gallery />} />
    </Routes>
  );
}

export default App;
