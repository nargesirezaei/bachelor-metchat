import { Outlet } from "react-router-dom";
import { useAccount } from "../app/account-context";

export function PublicLayout() {
    const account = useAccount();
    return (
        <>
            <main className="contents  flex-grow-1">
                <Outlet />
            </main>
            {account.isConnected() && (
                <footer>
                    <p>DATA3900-1 23V Bacheloroppgave</p>
                </footer>
            )}
        </>
    );
}
