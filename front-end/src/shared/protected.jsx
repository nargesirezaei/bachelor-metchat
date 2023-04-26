import { Outlet } from "react-router-dom";
import { accountStatuses, useAccount } from "../app/account-context";
import { useEffect } from "react";
import { Nav } from "../components/nav";
import { Flex } from "../components/Flex";
import forbiden from "../assets/img/401.png";

export function Protected() {
  const account = useAccount();

  useEffect(() => {
    if (account.getStatus() == "") account.init();
  }, []);

  if (account.isUnAuthorized())
    return (
      <>
        <Nav />
        <Flex align="center" content="center" className="p-5" vertical gap={1}>
          <img src={forbiden} width={300} />
          <span>We cannot authenticate you</span>
        </Flex>
      </>
    );

  return (
    <>
      {account.isConnected() && <Outlet />}
      {account.getStatus() === accountStatuses.Connecting && (
        <div>Connecting...</div>
      )}
    </>
  );
}
