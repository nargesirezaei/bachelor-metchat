import AdminNav from "./AdminNav";
import "../admin_samtaler.css";

function Conversations() {
  return (
    <>
      <AdminNav />
      <div className="admin-convos">
        <section>
          <h1>Samtaler</h1>

          {/*<!-- Search bar -->
        <!-- Retrived from https://mdbootstrap.com/docs/standard/forms/search/-->*/}
          <div class="search-group input-group rounded">
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
        <section class="conversation-list">
          <ul class="list-group list-group-light">
            {/*<!-- Conversation participants -->*/}
            <li class="list-group-item d-flex justify-content-between align-items-center">
              {/*<!-- Date -->*/}
              <span>Dato</span>
              {/*<!-- Conversation participants -->*/}
              <div class="participants">
                <div class="participant">
                  <img
                    src="../../public/Logo.svg"
                    alt="P"
                    class="rounded-circle"
                  />
                  <div class="ms-3">
                    <p class="fw-bold mb-1">Person En</p>
                  </div>
                </div>

                <div class="participant d-flex align-items-center">
                  <img
                    src="../img/profile.svg"
                    alt="P"
                    class="rounded-circle"
                  />
                  <div class="ms-3">
                    <p class="fw-bold mb-1">Person To</p>
                  </div>
                </div>
              </div>

              {/*<!-- Buttons -->*/}
              <button class="btn-download btn-link btn-rounded btn-sm">
                Last ned samtale
              </button>
              <button class="btn-delete btn-link btn-rounded btn-sm">
                Slett samtale
              </button>
            </li>
          </ul>
        </section>

        <div class="master-buttons">
          <button class="btn-download-all">Last ned alle</button>
          <button class="btn-delete-all">Slett alle</button>
        </div>
      </div>
    </>
  );
}
export default Conversations;
