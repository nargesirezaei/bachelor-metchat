import AdminNav from "./AdminNav";
import "../admin_samtaler.css";
import dummyProfile from "../img/profile.svg";

function Conversations() {
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
              class="form-control rounded"
              placeholder="Søk"
              aria-label="Search"
              aria-describedby="search-addon"
            />
            <button type="button" className="btn btn-outline-primary">
              søk
            </button>
            <p>
              Sorter etter:
              <select>
                <option value="">Velg</option>
                <option value="dato">Dato</option>
                <option value="navn">Navn</option>
              </select>
            </p>
          </div>
        </section>

        {/*<!-- List of conversetions -->*/}
        <div className="row conversation-list">
          <div className="col-sm-6 ">
            {/*<!-- Conversation participants -->*/}
            <div className="card">
              <div className="card-body">
                {/*<!-- Date -->*/}
                <a className="convo-date" href="">
                  Dato
                </a>
                {/*<!-- Conversation participants -->*/}
                <div className="participants">
                  <div className="participant">
                    <img src={dummyProfile} alt="P" class="rounded-circle" />
                    <div className="ms-3">
                      <p className="fw-bold mb-1">Person En</p>
                    </div>
                  </div>

                  <div className="participant d-flex align-items-center">
                    <img src={dummyProfile} alt="P" class="rounded-circle" />
                    <div className="ms-3">
                      <p className="fw-bold mb-1">Person To</p>
                    </div>
                  </div>
                </div>

                {/*<!-- Buttons -->*/}
                <div className="text-end">
                  <button className="btn-download btn-link btn-rounded btn-sm">
                    Last ned samtale
                  </button>
                  <button className="btn-delete btn-link btn-rounded btn-sm">
                    Slett samtale
                  </button>
                </div>
              </div>
            </div>
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
export default Conversations;
