import { useAppData } from "../../../context/appContext";
import { useState } from "react";
import Modal from "../../modal/modal";
import classes from "./heroDetailsCard.module.css";

const HeroDetailsCard = ({ hero }) => {
  const { addHero } = useAppData();
  const [isOpen, setIsOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  return (
    <>
      {isOpen && (
        <Modal message={modalMessage} setIsOpen={setIsOpen} isOpen={isOpen} />
      )}
      <div
        className={`card ${classes.teamCard} ${
          hero.biography.alignment === "good"
            ? classes.teamCardGood
            : hero.biography.alignment === "bad"
            ? classes.teamCardBad
            : classes.teamCardNeutral
        }`}
      >
        <div className="row g-0">
          <div className="col-12 col-sm-6">
            <img
              src={hero.image.url}
              className={`card-img-top ${classes.teamCardImg}`}
              alt="hero"
            />
          </div>
          <div className="col-12 col-sm-6">
            <div className="card-body text-center p-1">
              <h5 className="card-title mb-3 mt-1">{hero.name}</h5>
              <div className="card-text d-flex flex-column">
                <strong>Full Name</strong>
                <span>{hero.biography["full-name"]}</span>
              </div>
              <div className="card-text d-flex flex-column">
                <strong>Alias</strong>
                <span>{hero.biography.aliases[0]}</span>
              </div>
              <div className="card-text d-flex flex-column">
                <strong>Workplace</strong>
                <span>{hero.work.base}</span>
              </div>
              <div className="card-text d-flex justify-content-evenly">
                <div className="d-flex flex-column">
                  <strong>Weight</strong>
                  <span>{hero.appearance.weight[1]}</span>
                </div>
                <div className="d-flex flex-column">
                  <strong>Height</strong>
                  <span>{hero.appearance.height[1]}</span>
                </div>
              </div>
              <div className="card-text d-flex justify-content-evenly">
                <div className="d-flex flex-column">
                  <strong>Eye Color</strong>
                  <span>{hero.appearance["eye-color"]}</span>
                </div>
                <div className="d-flex flex-column">
                  <strong>Hair Color</strong>
                  <span>{hero.appearance["hair-color"]}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <div className=" mt-1 card-body text-center p-0 sm-p-1 d-flex justify-content-between flex-column flex-lg-row">
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
        </div>

        <div className="row g-0">
          <div className="col">
            {Object.keys(hero.powerstats).map((stat) => (
              <div
                className="position-relative progress bg-white mt-2"
                style={{ height: "22px" }}
                key={stat}
              >
                {hero.powerstats[stat] !== "null" ? (
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
                      <span className="me-2 ms-2">{hero.powerstats[stat]}</span>
                    </div>
                  </div>
                ) : (
                  <div
                    className="progress-bar bg-white align-items-start border border-bottom-2 border-top-0 border-start-0 border-end-0 border-light border-3"
                    role="progressbar"
                    style={{ width: "100%" }}
                    aria-valuenow="0"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  >
                    <div className="d-flex w-100 justify-content-between text-dark">
                      <span className="ms-2">{stat}</span>
                      <span className="me-2 ms-2">No data</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroDetailsCard;
