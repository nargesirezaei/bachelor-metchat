import { Route, Routes } from "react-router-dom";
import { Home } from "./main/home";
import { About } from "./main/about";
import { PublicLayout } from "./shared/public-layout";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Route>
    </Routes>
  );
}
