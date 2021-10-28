import classes from "./emptyCard.module.css";
import { ReactComponent as QuestionMark } from "../../../assets/question.svg";

const EmptyCard = () => {
  return (
    <div className={`card ${classes.emptyCard} d-flex justify-content-center`}>
      <QuestionMark className={classes.questionImage} />
    </div>
  );
};

export default EmptyCard;
