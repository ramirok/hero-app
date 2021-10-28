import { Link } from "react-router-dom";
import classes from "./page404.module.css";
import { ReactComponent as QuestionMark } from "../../assets/question.svg";

const Page404 = () => {
  return (
    <div className="container-fluid min-vh-100 d-flex flex-column justify-content-center align-items-center">
      <div className="flex-grow-1 position-relative d-flex flex-column align-items-center justify-content-center">
        <div
          className={`card ${classes.emptyCard} d-flex justify-content-center`}
        >
          <QuestionMark className={classes.questionImage} />
          <div className="card-body text-center p-1">
            <h5 className="card-title mb-1 mt-1">404 Not Found</h5>
          </div>
          <div className="card-body text-center p-0 sm-p-1 d-flex justify-content-between flex-column flex-lg-row">
            <Link
              className="btn btn-secondary p-1 p-md-2 mt-1 mt-lg-0 w-100"
              to="/app"
            >
              Go Back Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page404;
