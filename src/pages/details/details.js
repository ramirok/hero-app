import axios from "axios";
import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useState } from "react/cjs/react.development";
import { ReactComponent as Info } from "../../assets/info.svg";
import HeroDetailsCard from "../../components/cards/heroDatailsCard/heroDetailsCard";
import LoadingCard from "../../components/cards/loadingCard/loadingCard";
import classes from "./details.module.css";

const Details = () => {
  const { id } = useParams();
  const [heroData, setHeroData] = useState({});
  useEffect(() => {
    axios
      .get(
        `https://www.superheroapi.com/api.php/${process.env.REACT_APP_SUPERHERO_API}/${id}`
      )
      .then((hero) => {
        setHeroData(hero.data);
      });
  }, [id]);
  return (
    <>
      <Link to="/app" style={{ width: "350px", height: "auto" }}>
        <Info className={classes.logo} />
      </Link>
      <div className="flex-grow-1 position-relative d-flex flex-column align-items-center justify-content-center">
        {heroData.name ? <HeroDetailsCard hero={heroData} /> : <LoadingCard />}
      </div>
    </>
  );
};

export default Details;
