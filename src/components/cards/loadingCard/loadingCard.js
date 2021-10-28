import classes from "./loadingCard.module.css";
import { ReactComponent as Background } from "../../../assets/background.svg";
import { ReactComponent as Dots } from "../../../assets/dots.svg";

const LoadingCard = () => {
  return (
    <div
      className={`card ${classes.loadingCard} d-flex justify-content-center align-items-center position-relative`}
    >
      <Background className={classes.background} />
      <div className="d-flex position-absolute w-50 mb-4">
        <Dots className={classes.dots1} />
        <Dots className={classes.dots2} />
        <Dots className={classes.dots3} />
      </div>
      <div className="card-body text-center p-1">
        <h5 className="card-title mb-1">Searching</h5>
      </div>
    </div>
  );
};

export default LoadingCard;
