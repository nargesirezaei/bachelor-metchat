import React, { useState, useEffect, useRef } from "react";
import { CSVLink } from "react-csv";

import AdminNav from "../components/AdminNav";
import { adminApi } from "../api/admin-api";
import { Contact } from "../components/contact";
import { Flex } from "../components/Flex";
import { conversationApi } from "../api/conversation-api";

export default function Conversations() {
  const csvInstance = useRef(),
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
    await adminApi
      .getConversation(id)
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
          </div>*/}
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
                    {/* --- Conversation buttons --- */}
                    <Flex gap={2}>
                      <button
                        className="btn"
                        onClick={() => getCsvData(x._id, x.title)}
                      >
                        Last ned
                      </button>
                      {csvData.length > 0 && csvFilename ? (
                        <CSVLink
                          // className="btn-download btn-link btn-rounded btn-sm"
                          data={csvData}
                          headers={headers}
                          filename={csvFilename}
                          ref={csvInstance}
                          target="_blank"
                          asyncOnClick={true}
                          // onClick={(event, done) => { getCsvData(event, done, conversation._id); }}
                        />
                      ) : undefined}
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

        {/* <div className="master-buttons">
          <button className="btn-download-all">Last ned alle</button>
          <button
            className="btn-delete-all"
            onClick={() =>
              adminApi
                .deleteAllConversations()
                .then(({ data }) => {
                  setConversations([]);
                })
                .catch(() => alert("error"))
            }
          >
            Slett alle
          </button>
        </div>*/}
      </div>
    </>
  );
}
