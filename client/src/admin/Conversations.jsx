import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CSVLink } from "react-csv";
import { contactRoute, conversationRoute, messageRoute } from "../APIRoutes";
import { useAccount } from "../app/account-context";

import AdminNav from "../components/AdminNav";
import dummyProfile from "../assets/img/profile.svg";
import { adminApi } from "../api/admin-api";
import { Contact } from "../components/contact";
import { Flex } from "../components/Flex";
import { conversationApi } from "../api/conversation-api";

export default function Conversations() {
  const navigate = useNavigate(),
    csvInstance = useRef(),
    // [self, setSelf] = useState({}),
    [conversations, setConversations] = useState([]),
    [csvData, setCsvData] = useState([]),
    [csvFilename, setCsvFilename] = useState([]);

  //list all conversations **
  useEffect(() => {
    adminApi
      .getAll()
      .then((result) => setConversations(result.data.conversations))
      .catch();
  }, []);

  // get conversations
  /*useEffect(() => {
    async function getConversations() {
      await axios
        .get(`${conversationRoute}/getAllConversations`)
        .then(async (response) => {
          const conversations = response.data,
            count = conversations.length;

          for (let i = 0; i < count; i++) {
            const date = new Date(conversations[i].createdAt),
              year = date.getFullYear();
            let month = date.getMonth() + 1,
              day = date.getDate(),
              hour = date.getHours(),
              minute = date.getMinutes();

            if (month < 10) month = "0" + month;
            if (day < 10) day = "0" + day;
            if (hour < 10) hour = "0" + hour;
            if (minute < 10) minute = "0" + minute;

            conversations[
              i
            ].createdAtText = `${day}/${month}/${year} - ${hour}:${minute}`;

            // fetch data of user 1
            await axios
              .get(`${contactRoute}/getUser/${conversations[i].fromUserId}`)
              .then((response) => {
                conversations[i]["fromData"] = response.data;
              })
              .catch((err) => {
                conversations[i]["fromData"] = [];
                alert(err.response.data);
              });

            // fetch data of user 2
            await axios
              .get(`${contactRoute}/getUser/${conversations[i].toUserId}`)
              .then((response) => {
                conversations[i]["toData"] = response.data;
              })
              .catch((err) => {
                conversations[i]["toData"] = [];
                alert(err.response.data);
              });

            /*
          // fetch messages
          await axios.get(`${conversationRoute}/${conversations[i]._id}/messages`)
          .then((response) => {
            conversations[i]["messages"] = response.data.map(message => message.text).join('\n');
          }) 
          .catch((err) => {
            conversations[i]["messages"] = "";
            alert(err.response.data);
          });
          
          }
          setConversations(conversations);
        })
        .catch((err) => {
          console.log(err);
          alert(err.response.data);
        });
    }
    getConversations();
  });*/

  useEffect(() => {
    if (
      csvData &&
      csvData.length > 0 &&
      csvFilename &&
      csvInstance?.current?.link
    ) {
      setTimeout(() => {
        // console.log(csvData);
        csvInstance.current.link.click();
        setCsvData([]);
        setCsvFilename("");
      }, 50);
    }
  }, [csvData, csvFilename]);

  // csv headers
  const headers = [
    { label: "Date", key: "dateText" },
    { label: "Time", key: "timeText" },
    { label: "Sender", key: "fromId" },
    { label: "Receiver", key: "toId" },
    { label: "Messages", key: "message" },
  ];

  const getCsvData = async (id, title) => {
    await axios
      .get(`${messageRoute}/getConversation/${id}`)
      .then((response) => {
        setCsvData(
          response.data.map((value) => {
            const dateTime = value.createdAt.split("T");

            value.dateText = dateTime[0];
            value.timeText = dateTime[1].slice(0, 8);

            return value;
          })
        );
        setCsvFilename(`${id}_${title}.csv`);
      })
      .catch((err) => {
        console.log(err);
        alert(err.response.data);
      });
  };

  function formatDateTime(dateStr) {
    const date = new Date(dateStr);

    const formattedDate = date.toLocaleDateString("no-NO", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });

    const formattedTime = date.toLocaleTimeString("no-NO", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    var result = formattedDate + " " + formattedTime;
    return result;
  }

  return (
    <>
      <AdminNav />
      <div className="admin-convos">
        <section>
          <h1>Samtaler</h1>

          {/*<!-- Search bar -->
          <!-- Retrived from https://mdbootstrap.com/docs/standard/forms/search/-->*/}
          <div className="search-group input-group rounded">
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
            <p>
              Sorter etter:
              <select defaultValue={""}>
                <option value="" disabled hidden>
                  Velg
                </option>
                <option value="dato">Dato</option>
                <option value="navn">Navn</option>
              </select>
            </p>
          </div>
        </section>

        {/*<!-- List of conversetions -->*/}

        <div className="container-fluid">
          <div className="row g-3">
            {conversations.map((x, idx) => {
              return (
                <div className="col-md-6">
                  <div key={idx} className="border shadow mb-2 p-3 convo">
                    <div className="mb-3">
                      <span className="convo-date">
                        {formatDateTime(x.createdAt)}
                      </span>
                      <span className="convo-date">Tittel: {x.title}</span>
                    </div>
                    <div className="participant">
                      <Contact
                        contact={{
                          name:
                            x.fromUserId.firstName +
                            " " +
                            x.fromUserId.lastName,
                        }}
                        showEmail={false}
                        className="mb-0"
                      />
                    </div>
                    <div className="participant">
                      <Contact
                        contact={{
                          name:
                            x.toUserId.firstName + " " + x.toUserId.lastName,
                        }}
                        showEmail={false}
                        className="m-0"
                      />
                    </div>

                    <Flex gap={2}>
                      <button className="btn">Last ned</button>
                      <button
                        className="btn"
                        onClick={() =>
                          conversationApi
                            .delete(x._id)
                            .then(({ data }) => {
                              setConversations(
                                conversations.filter((v) => v._id !== x._id)
                              );
                            })
                            .catch(() => alert("error"))
                        }
                      >
                        Slett
                      </button>
                    </Flex>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="master-buttons">
          <button className="btn-download-all">Last ned alle</button>
          <button className="btn-delete-all">Slett alle</button>
        </div>
      </div>
    </>
  );
}
