import { useHistory } from "react-router-dom";
import { useAppData } from "../../../context/appContext";
import classes from "./heroCard.module.css";
import Modal from "../../modal/modal";
import { useState } from "react";

const HeroCard = ({ hero }) => {
  const { addHero } = useAppData();
  const [isOpen, setIsOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const history = useHistory();
  return (
    <>
      {isOpen && (
        <Modal
          message={modalMessage}
          setIsOpen={setIsOpen}
          isOpen={isOpen}
          key={modalMessage}
        />
      )}
      <div
        className={`card ${classes.heroCard} ${
          hero.biography.alignment === "good"
            ? classes.heroCardGood
            : hero.biography.alignment === "bad"
            ? classes.heroCardBad
            : classes.heroCardNeutral
        }`}
      >
        <div
          className="row g-0"
          onClick={() => history.push(`/app/hero/${hero.id}`)}
        >
          <div className="col-6a col-sm-12">
            <img
              src={hero.image.url}
              className={`card-img-top ${classes.heroCardImg}`}
              alt="hero"
            />
          </div>
          <div className="col-12 d-flex flex-column justify-items-between">
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
        <div className="card-body text-center p-0 sm-p-1 d-flex justify-content-between flex-column flex-lg-row">
          <button
            className="btn btn-primary p-1 p-md-2 w-100"
            onClick={() => {
              const added = addHero(hero);
              setModalMessage(added.message);
              setIsOpen(true);
            }}
          >
            Add
            <i className="bi bi-person-plus"></i>
          </button>
        </div>
      </div>
    </>
  );
};

export default HeroCard;
