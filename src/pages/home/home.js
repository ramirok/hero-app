import { ReactComponent as TeamLogo } from "../../assets/team.svg";
import { Link } from "react-router-dom";
import classes from "./home.module.css";
import TeamCard from "../../components/cards/teamCard/teamCard";
import TeamSummaryCard from "../../components/cards/teamSummaryCard/teamSummaryCard";
import { useAppData } from "../../context/appContext";

const Home = () => {
  const {
    appState: { team },
  } = useAppData();

  return (
    <>
      <Link to="/app" style={{ width: "350px", height: "auto" }}>
        <TeamLogo className={classes.logo} />
      </Link>
      <div className="flex-grow-1 position-relative d-flex flex-column align-items-center justify-content-center">
        <div className="translate-middlea mt-4">
          <TeamSummaryCard />
        </div>

        <div className="pt-3 pb-3 row d-flex g-4 justify-content-center align-items-start mt-1">
          {[...team, 1, 2, 3, 4, 5, 6].slice(0, 6).map((hero) => (
            <div className="col" key={hero?.id || hero + "empty"}>
              <TeamCard hero={hero.id ? hero : null} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
