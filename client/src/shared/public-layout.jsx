import { Outlet } from "react-router-dom";
import { useAccount } from "../app/account-context";
import Footer from "../components/footer";

export function PublicLayout() {
  const account = useAccount();
  return (
    <>
      <main className="contents  flex-grow-1">
        <Outlet />
        <Footer />
      </main>
    </>
  );
}
