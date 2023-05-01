import { Outlet } from "react-router-dom";

export function PublicLayout() {
    return (
        <>
            <main className="contents  flex-grow-1">
                <Outlet />
            </main>
            <footer>
                <p>DATA3900-1 23V Bacheloroppgave</p>
            </footer>
        </>
    );
}
