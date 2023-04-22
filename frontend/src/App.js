import { Route, Routes } from "react-router-dom";
import { Home } from "./main/home";
import { About } from "./main/about";
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
}
