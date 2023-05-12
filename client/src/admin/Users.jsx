import AdminNav from "../components/AdminNav";
import dummyProfile from "../assets/img/profile.svg";

function Users() {
    return (
        <>
            <AdminNav />

            <div className="row admin-users">
                <div className="col-sm-6">
                    <h1>Brukere</h1>

                    {/* -- Search bar --
        -- Retrived from https://mdbootstrap.com/docs/standard/forms/search/-- */}
                    <div className="search-group input-group rounded">
                        <input
                            type="search"
                            className="form-control rounded"
                            placeholder="Søk"
                            aria-label="Search"
                            aria-describedby="search-addon"
                        />
                        <button
                            type="button"
                            className="btn btn-outline-primary"
                        >
                            søk
                        </button>
                    </div>

                    {/* -- List of users -- */}
                    <ul className="user-list">
                        <li className="user-item">
                            <img src={dummyProfile} alt="P" />
                            <span>Anna Lund</span>
                        </li>
                        <li className="user-item">
                            <img src={dummyProfile} alt="P" />
                            <span>Anna Mund</span>
                        </li>
                        <li className="user-item">
                            <img src={dummyProfile} alt="P" />
                            <span>Anna Nund</span>
                        </li>
                        <li className="user-item">
                            <img src={dummyProfile} alt="P" />
                            <span>Anna Ound</span>
                        </li>
                    </ul>
                </div>

                <div className="col-sm-5 profile-right">
                    {/* -- User profile -- */}
                    <div className="user">
                        <div className="user-header">
                            <img src={dummyProfile} alt="P" />
                            <span>Fornavn </span>
                            <span>Etternavn</span>
                        </div>

                        <table className="user-info">
                            <tbody>
                                <tr>
                                    <td className="mb-1">E-post:</td>
                                    <td className="user-info-value">e-post</td>
                                </tr>
                                <tr>
                                    <td className="mb-1">Passord:</td>
                                    <td className="user-info-value">passord</td>
                                </tr>
                                <tr>
                                    <td className="mb-1">Interesser:</td>
                                    <td className="user-info-value">
                                        <p>interesse</p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* -- Buttons for conversations -- */}
                    <div className="btn-coanversations">
                        <button>Se samtaler</button>
                        <button>Last ned samtaler</button>
                    </div>
                    {/* -- Button for deleting user -- */}
                    <button className="del-user">Slett bruker</button>
                </div>
            </div>
        </>
    );
}

export default Users;
