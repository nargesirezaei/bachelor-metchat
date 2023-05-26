import AdminNav from "../components/AdminNav";
import { adminApi } from "../api/admin-api";
import React, { useEffect, useState } from "react";
import { Contact } from "../components/contact";
import { Flex } from "../components/Flex";

function Users() {
  const [users, setUsers] = useState();
  const [user, setUser] = useState();
  const [accessDenied, setAccessDenied] = useState();
  /*const account = useAccount();
  if (!account.isAdmin) return "Access Denied!";*/

  useEffect(() => {
    adminApi
      .getAllUsers()
      .then((result) => setUsers(result.data.users))
      .catch((ex) => setAccessDenied(ex.response.status));
  }, []);

  const getUser = (user) => {
    adminApi
      .getUser({ userId: user._id })
      .then((result) => setUser(result.data.user))
      .catch((ex) => setAccessDenied(ex.response.status));
  };

  const deleteUser = (userId) => {
    adminApi
      .deleteUser({ userId })
      .then((result) => setUsers(users.filter((x) => x._id !== userId)))
      .catch((ex) => setAccessDenied(ex.response.status));
  };
  useEffect(() => {
    console.log("55555", accessDenied);
  }, [accessDenied]);

  if (accessDenied === 403)
    return <h1 className="text-center p-3">Access Denied!</h1>;

  return (
    <>
      <AdminNav />

      <div className="row admin-users">
        <div className="col-lg-6">
          <h1>Brukere</h1>

          {/* -- Search bar --
          {/* -- Search bar --
        -- Retrived from https://mdbootstrap.com/docs/standard/forms/search/-- */}
          {/*<div className="search-group input-group rounded">
            <input
              type="search"
              className="form-control rounded"
              placeholder="Søk"
              aria-label="Search"
              aria-describedby="search-addon"
            />
            <button type="button" className="btn btn-outline-primary">
              søk
            </button>
          </div>*/}

          {/* -- List of users -- */}
          <ul className="user-list">
            {users?.map((x, idx) => (
              <li key={idx} className="border shadow mb-1 p-2 user-item">
                <Contact
                  contact={{ ...x, name: x.firstName + " " + x.lastName }}
                  onSelectContact={(c) => getUser(c)}
                />
              </li>
            ))}
          </ul>
        </div>

        <div className="col-lg-4 profile-right">
          {/* -- User profile -- */}
          <div className="user">
            <Contact
              contact={{
                ...user,
                name: user?.firstName + " " + user?.lastName,
              }}
              showEmail={false}
              className={"user-header"}
            />

            <table className="user-info">
              <tbody>
                <tr>
                  <td className="mb-1">E-post:</td>
                  <td className="user-info-value">{user?.email}</td>
                </tr>
                <tr>
                  <td className="mb-1">Passord:</td>
                  <td className="user-info-value">{user?.password}</td>
                </tr>
                <tr>
                  <td className="mb-1">Interesser:</td>
                  <td className="user-info-value">
                    <Flex className="flex-wrap" style={{ maxWidth: 1000 }}>
                      {user?.userInterests?.map((x) => {
                        return (
                          <span
                            key={x}
                            className="p-1 border rounded shadow interest"
                          >
                            {x}
                          </span>
                        );
                      })}
                    </Flex>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* -- Buttons for conversations -- */}
          {/* <div className="btn-coanversations">
            <button>Se samtaler</button>
            <button>Last ned samtaler</button>
          </div>*/}
          {/* -- Button for deleting user -- */}
          {/*<button className="del-user" onClick={() => deleteUser(user._id)}>
            Slett bruker
          </button>*/}
        </div>
      </div>
    </>
  );
}

export default Users;
