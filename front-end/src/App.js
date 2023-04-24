import { Route, Routes } from "react-router-dom";
import { Home } from "./main/home";
import { About } from "./main/about";
import { PublicLayout } from "./shared/public-layout";
import { Protected } from "./shared/protected";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<PublicLayout />}>
        <Route path="/" element={<Home />} />

        <Route element={<Protected />}>
          //har chi k niaz be login dashte bashe dakhele in route hast
          <Route path="/about" element={<About />} />
        </Route>
      </Route>
    </Routes>
  );
}
