import { useHistory } from "react-router-dom";
import { useAppData } from "../../../context/appContext";
import classes from "./teamCard.module.css";
import { ReactComponent as QuestionMark } from "../../../assets/question.svg";

const TeamCard = ({ hero }) => {
  const { removeHero } = useAppData();
  const history = useHistory();

  if (!hero) {
    return (
      <div
        className={`card ${classes.teamCardEmpty} d-flex justify-content-center`}
        style={{}}
      >
        <QuestionMark className={classes.questionImage} />
      </div>
    );
  }
  return (
    <div
      className={`card ${classes.teamCard} ${
        hero.biography.alignment === "good"
          ? classes.teamCardGood
          : hero.biography.alignment === "bad"
          ? classes.teamCardBad
          : classes.teamCardNeutral
      }`}
    >
      <div
        className="row g-0"
        onClick={() => history.push(`/app/hero/${hero.id}`)}
      >
        <div className="col-6 col-sm-12">
          <img
            src={hero.image.url}
            className={`card-img-top ${classes.teamCardImg}`}
            alt="hero"
          />
        </div>
        <div className="col-6 col-sm-12 d-flex flex-column justify-items-between">
          <div className="card-body text-center p-1">
            <h5 className="card-title mb-1 mt-1">{hero.name}</h5>
          </div>

          <div className="card-body text-center p-0 sm-p-1 d-flex justify-content-center flex-column flex-lg-row">
            Alignment
            <strong className="ms-1">
              {hero.biography.alignment === "good"
                ? "Good"
                : hero.biography.alignment === "bad"
                ? "Bad"
                : "Neutral"}
            </strong>
          </div>
        </div>
      </div>

      {Object.keys(hero.powerstats).map((stat) => (
        <div
          className="position-relative progress bg-white mt-2"
          style={{ height: "22px" }}
          key={stat}
          onClick={() => history.push(`/app/hero/${hero.id}`)}
        >
          <div
            className="mb-1 progress-bar bg-white align-items-start"
            role="progressbar"
            style={{
              width: `${hero.powerstats[stat]}%`,
              boxShadow: `0px 4px 0px 0px ${
                hero.biography.alignment === "good"
                  ? "#2b99d6"
                  : hero.biography.alignment === "bad"
                  ? "#fd5847"
                  : "#a3a3a3"
              }`,
            }}
            aria-valuenow="25"
            aria-valuemin="0"
            aria-valuemax="100"
          >
            <div className="position-absolute d-flex w-100 justify-content-between text-dark border border-top-0 border-start-0 border-end-0 border-secondary">
              <span className="ms-2">{stat}</span>
              <span className="me-2 ms-2">
                {hero.powerstats[stat] !== "null"
                  ? hero.powerstats[stat]
                  : "No Data"}
              </span>
            </div>
          </div>
        </div>
      ))}
      <div className="mt-1 card-body text-center p-0 ms-1 ms-sm-0 d-flex justify-content-between flex-column flex-lg-row">
        <button
          className="btn btn-primary p-1 p-md-2 w-100"
          onClick={() => removeHero(hero)}
        >
          Delete
          <i className="bi bi-x-circle"></i>
        </button>
      </div>
    </div>
  );
};

export default TeamCard;
