import classes from "./exclamationCard.module.css";
import { ReactComponent as ExclamationMark } from "../../../assets/exclamation.svg";

const ExclamationCard = () => {
  return (
    <div
      className={`card ${classes.exclamationCard} d-flex justify-content-center`}
    >
      <ExclamationMark className={classes.exclamationImage} />

      <div className="card-body text-center p-1">
        <h5 className="card-title mb-1 mt-1">Not Results</h5>
      </div>
    </div>
  );
};

export default ExclamationCard;
