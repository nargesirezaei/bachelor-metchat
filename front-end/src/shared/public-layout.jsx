import { Outlet } from "react-router-dom";

//footer common for all pages
export function PublicLayout() {
  return (
    <>
      <main className="contents flex-grow-1">
        <Outlet />
      </main>
      <footer>
        <p>Laget av Rami, Narges, Aina Og Fatima</p>
      </footer>
    </>
  );
}
