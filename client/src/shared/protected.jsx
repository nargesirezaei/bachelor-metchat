import { useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { accountStatuses, useAccount } from "../app/account-context";
import logo from "../assets/img/Logo.svg";

export function Protected() {
  const account = useAccount();
  const navigate = useNavigate();
  const location = useLocation();

  function reconnect() {
    account.init();
  }
  useEffect(() => {
    if (account.getStatus() === "") account.init();
  }, []);

  return (
    <>
      {account.getStatus() === accountStatuses.Connecting && (
        <div className="h-100 middle text-center">
          <div className="m-e-2 spinner-grow text-info spinner-grow-sm animation-delay--0s"></div>
          <div className="m-e-2 spinner-grow text-info spinner-grow-sm animation-delay--1s"></div>
          <div className="m-e-2 spinner-grow text-info spinner-grow-sm animation-delay--2s"></div>
        </div>
      )}

      {account.getStatus() === accountStatuses.ConnectionFailed && (
        <div className="h-100 middle">
          <div className="text-center">
            <div className="text-danger p-3">
              Tjenesten er ikke tilgjengelig
            </div>
            <button
              className="btn btn-link btn-icon text-dark"
              onClick={reconnect}
            >
              <span className="p-s-2">Prøv på nytt</span>
            </button>
          </div>
        </div>
      )}

      {account.isConnected() && <Outlet />}
      {account.getStatus() === accountStatuses.LoggedOut && (
        <div className="h-100 middle text-center" style={{ maxHeight: 601 }}>
          <div>
            <Link to="/" className="logo">
              <img src={logo} alt="logo" width={150} />
            </Link>
            <div>Vi kan ikke autentisere deg</div>
            <dl className="pt-2">
              <dd className="mb-1">
                <button
                  className="btn"
                  onClick={() =>
                    navigate("/", {
                      state: { from: location },
                      replace: true,
                    })
                  }
                >
                  Login
                </button>
              </dd>
            </dl>
          </div>
        </div>
      )}
      {account.getStatus() === accountStatuses.Forbidden && <Outlet />}
    </>
  );
}
