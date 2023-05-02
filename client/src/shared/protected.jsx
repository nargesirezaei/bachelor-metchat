import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { accountStatuses, useAccount } from "../app/account-context";
import { Flex } from "../components/Flex";
import { Nav } from "../components/nav";

export function Protected() {
    const account = useAccount();
    const history = useNavigate();
    useEffect(() => {
        if (account.getStatus() === "") account.init();
    }, []);

    if (account.isUnAuthorized())
        return (
            <>
                <Nav />
                <Flex
                    align="center"
                    content="center"
                    className="p-5"
                    vertical
                    gap={1}
                >
                    <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>

                    <button className="btn m-0" onClick={() => history("/")}>
                        Login
                    </button>
                </Flex>
            </>
        );

    return (
        <>
            {account.getStatus() === accountStatuses.Connecting && (
                <div>Connecting...</div>
            )}
            {account.isConnected() && <Outlet />}
        </>
    );
}
