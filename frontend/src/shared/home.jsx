import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <div className="container-fluid">
      <Link to="/about"> go to about page </Link>
    </div>
  );
};
