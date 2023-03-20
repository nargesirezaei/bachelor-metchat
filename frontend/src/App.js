import { Navigate, Route, Routes } from "react-router-dom";
import { Index } from "./main";
import { Login } from "./main/account/login";
import { PublicLayout } from "./shared/public-layout";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<PublicLayout />}>
        <Route path="/" element={<Index />} />
      </Route>
    </Routes>
  );
}
