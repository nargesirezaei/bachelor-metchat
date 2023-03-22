import { Outlet } from "react-router-dom";
import Appbar from "./appbar";

export function PublicLayout() {
    return (
        <div className="d-flex flex-column h-100">
            <Appbar />
            <main className="contents container flex-grow-1">
                <Outlet />
            </main>
            <footer>
                <p>Laget av Rami, Narges, Aina Og Fatima</p>
            </footer>
        </div>
    );
}
