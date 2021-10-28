import { useAppData } from "../../../context/appContext";
import classes from "./teamSummaryCard.module.css";

const TeamSummaryCard = () => {
  const {
    appState: { summary, team },
  } = useAppData();
  return (
    <div className={`card ${classes.teamCard} ${classes.teamCardGood}`}>
      {team.length > 0 ? (
        <div className="row">
          <div className="col-12 col-sm-6">
            <div className="card-body text-center p-1">
              <h5 className="card-title mb-1 mt-1">Team's Statistics</h5>
            </div>
            <div>
              {Object.keys(summary)
                .sort((a, b) => summary[b] - summary[a])
                .map((stat, _, array) => (
                  <div
                    className="position-relative progress bg-white mt-2"
                    style={{ height: "22px" }}
                    key={stat}
                  >
                    <div
                      className="mb-1 progress-bar bg-white align-items-start"
                      role="progressbar"
                      style={{
                        width: `${(summary[stat] / summary[array[0]]) * 100}%`,
                        boxShadow: "0px 4px 0px 0px #a3a3a3",
                      }}
                      aria-valuenow="25"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    >
                      <div className="position-absolute d-flex w-100 justify-content-between text-dark border border-top-0 border-start-0 border-end-0 border-secondary">
                        <span className="ms-2">{stat}</span>
                        <span className="me-2">{summary[stat]}</span>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          <div className="col-12 col-sm-6">
            <div className="card-body text-center p-1">
              <h5 className="card-title mb-1 mt-1">Additional Info</h5>

              <div className="card-text d-flex flex-column">
                <strong>Main Stat</strong>
                {
                  Object.keys(summary).sort(
                    (a, b) => summary[b] - summary[a]
                  )[0]
                }
              </div>
              <div className="card-text d-flex flex-column">
                <strong>Average Weight</strong>
                {(
                  team
                    .map(
                      (hero) =>
                        hero.appearance.weight[1].replace(/\D+/g, "") || 0
                    )
                    .reduce((prev, curr) => +prev + +curr) / team.length
                ).toFixed(2)}{" "}
                Kg
              </div>
              <div className="card-text d-flex flex-column">
                <strong>Average Height</strong>
                {(
                  team
                    .map(
                      (hero) =>
                        hero.appearance.height[1].replace(/\D+/g, "") || 0
                    )
                    .reduce((prev, curr) => +prev + +curr) / team.length
                ).toFixed(2)}{" "}
                CM
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="row">
          <div className="col-12">
            <div className="card-body text-center p-1">
              <h5 className="card-title mb-1 mt-1">
                Add A Hero To See Your Team's Statistics
              </h5>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamSummaryCard;
