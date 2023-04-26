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
          /*all function that needs to be login should place inside this
          Protected route*/
          <Route path="/about" element={<About />} />
        </Route>
      </Route>
    </Routes>
  );
}
