import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { profileApi } from "../api/profile-api";
import { useAccount } from "../app/account-context";
import pluss from "../assets/img/pluss.svg";
import { Flex } from "../components/Flex";
import { Contact } from "../components/contact";
import { Loading } from "../components/loading";
import { Logo } from "../components/logo";
import { Interesser } from "../components/interesser";
import { userInterestApi } from "../api/user-interest-api";

export const Interests = () => {
  const account = useAccount();
  const [model, setModel] = useState({ init: false, count: 10 });
  const navigate = useNavigate();

  useEffect(() => {
    if (model.init) return;

    profileApi
      .profile()
      .then((result) => setModel({ ...model, ...result.data.user, init: true }))
      .catch(() => alert("error in init profile"));
  }, []);

  const onChangeAvatarHandler = (avatar) => {
    profileApi
      .changeAvatar({ avatar: avatar })
      .then(() => {
        setModel({
          ...model,
          avatar,
        });
      })
      .catch(() => alert("error in init profile"));
  };

  const addIntrest = (x) =>
    userInterestApi
      .create({
        interestId: x._id,
      })
      .then((result) => {
        setModel({
          ...model,
          userInterests: [...model.userInterests, result.data.userInterest],
        });
      });

  const deleteIntrest = (x) => {
    userInterestApi
      .delete({
        interestId: x._id,
      })
      .then(() => {
        var userInterests = model.userInterests.filter(
          (c) => c.interestId !== x._id
        );
        setModel({
          ...model,
          userInterests,
        });
      });
  };

  const onSave = () => {
    profileApi
      .changeBio({ bio: model.bio })
      .then((x) => navigate("/kontakter"));
  };

  if (!model.init) return <Loading />;

  return (
    <>
      <nav>
        <div className="container" style={{ zIndex: 9999 }}>
          <Flex content="space-between" align="center">
            <Logo />
            <Flex className="m-0" gap={3}>
              <li className="push">
                <Link to="/logout" className="text-light">
                  Logg ut
                </Link>
              </li>
            </Flex>
          </Flex>
        </div>
      </nav>

      <section id="first">
        <h1 className="text-center">Snart ferdig. Fortell litt om deg selv</h1>

        <Contact
          width={250}
          height={250}
          textStyle={{
            top: 30,
            position: "relative",
            fontSize: 35,
            fontWeight: "bold",
          }}
          contact={{
            name: account.displayName,
            avatar: model.avatar,
            email: model.email,
          }}
          allowChangeAvatar
          onChangeAvatarHandler={onChangeAvatarHandler}
          displayText={false}
        />

        <div className="box">
          <label className="text">Om Meg</label>
          <textarea
            style={{ width: 500 }}
            value={model.bio}
            onChange={(e) => setModel({ ...model, bio: e.target.value })}
          ></textarea>

          <h2>Intresser</h2>
          {model.interests.length && (
            <Flex className="flex-wrap" content="center">
              {model.interests.slice(0, model.count).map((x) => {
                var userInt = model.userInterests.find(
                  (i) => i.interestId === x._id
                );

                return (
                  <Interesser
                    key={x._id}
                    interess={x}
                    onClick={() => {
                      if (!userInt) addIntrest(x);
                      else deleteIntrest(x);
                    }}
                    isActive={userInt}
                    className="mb-2"
                  />
                );
              })}
            </Flex>
          )}

          <Flex className="my-3 w-100 ps-5" align="center">
            <span className="p-1 bg-light" style={{ cursor: "pointer" }}>
              <img
                src={pluss}
                width={50}
                alt="pluss-icon"
                onClick={() =>
                  setModel({
                    ...model,
                    count: model.count + 10,
                  })
                }
              />
            </span>
            <span className="ms-3">Vis flere</span>
          </Flex>
        </div>
      </section>

      <Flex className="btns" style={{ backgroundColor: "transparent" }}>
        <button onClick={() => navigate("/")}>Tilbake</button>
        <button onClick={onSave}>Gå Videre</button>
      </Flex>
    </>
  );
};
