import AdminNav from "./AdminNav";

function Users() {
  <>
    <AdminNav />
    <div className="row">
      <div className="col-sm-4">
        <section>
          <h1>Brukere</h1>

          {/* -- Search bar --
        -- Retrived from https://mdbootstrap.com/docs/standard/forms/search/-- */}
          <div className="search-group">
            <input
              type="search"
              className="form-control"
              placeholder="Søk"
              aria-label="Search"
              aria-describedby="search-addon"
            />
            <span className="input-group-text" id="search-addon">
              <i className="fas fa-search"></i>
            </span>
          </div>

          {/* -- List of users -- */}
          <ul className="user-list">
            <li className="user-item">
              <img src="./img/profile.svg" alt="P" />
              <span>Anna Lund</span>
            </li>
          </ul>
        </section>
      </div>
      <div classNameName="col-sm-8">
        <aside>
          {/* -- User profile -- */}
          <div className="user">
            <div className="user-header">
              <img src="./img/profile.svg" alt="P" />
              <span>Fornavn </span>
              <span>Etternavn</span>
            </div>
            <table className="user-info">
              <tr>
                <td>E-post:</td>
                <td className="user-info-value">e-post</td>
              </tr>
              <tr>
                <td>Passord:</td>
                <td className="user-info-value">passord</td>
              </tr>
              <tr>
                <td>Interesser:</td>
                <td className="user-info-value">interesse</td>
              </tr>
            </table>
          </div>

          {/* -- Buttons for conversations -- */}
          <div className="btn-coanversations">
            <button>Se samtaler</button>
            <button>Last ned samtaler</button>
          </div>
          {/* -- Button for deleting user -- */}
          <button className="del-user">Slett bruker</button>
        </aside>
      </div>
    </div>
  </>;
}

export default Users;
