import axios from "axios";
import { Formik } from "formik";
import { useState } from "react";
import { Link } from "react-router-dom";

import { ReactComponent as SearchLogo } from "../../assets/search.svg";
import EmptyCard from "../../components/cards/emptyCard/emptyCard";
import HeroCard from "../../components/cards/heroCard/heroCard";
import LoadingCard from "../../components/cards/loadingCard/loadingCard";
import ExclamationCard from "../../components/cards/exclamationCard/exclamationCard";
import classes from "./search.module.css";
import { useAppData } from "../../context/appContext";

const Search = () => {
  const { lastSearchData, setLastSearchData } = useAppData();
  const [isLoading, setIsLoading] = useState(false);

  const submitSearch = async (data) => {
    setIsLoading(true);
    const response = await axios.get(
      `https://www.superheroapi.com/api.php/${process.env.REACT_APP_SUPERHERO_API}/search/${data.search}`
    );
    if (response.data.error) {
      setIsLoading(false);
      return setLastSearchData([]);
    }
    setIsLoading(false);
    setLastSearchData(response.data.results);
  };

  return (
    <>
      <Link to="/app" style={{ width: "350px", height: "auto" }}>
        <SearchLogo className={classes.logo} />
      </Link>
      <div className="d-flex align-items-center mb-4 sticky-top">
        <Formik
          validateOnChange={false}
          validateOnBlur={false}
          initialValues={{ search: "" }}
          validate={(values) => {
            const errors = {};
            if (!values.search) {
              errors.search = "Enter a hero name";
            }
            return errors;
          }}
          onSubmit={submitSearch}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => {
            return (
              <form
                onSubmit={handleSubmit}
                className={`border border-2 border-dark bg-white p-2 w-100 ${classes.formContainer}`}
              >
                <div className="d-flex">
                  <input
                    type="text"
                    name="search"
                    className="htmlForm-control border-top-0 border-end-0 border-start-0 rounded-3 bg-light p-1 shadow-none"
                    id="searchInput"
                    aria-describedby="emailHelp"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.search}
                    placeholder="Hero Name"
                  />

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-primary rounded-3 border-1"
                  >
                    <i className="bi bi-search"></i>
                  </button>
                </div>
                <span className={classes.error}>
                  {errors.search && touched.search && errors.search}
                </span>
              </form>
            );
          }}
        </Formik>
      </div>

      <div
        className={`pt-3 pb-3 flex-grow-1 position-relative d-flex align-items-center ${classes.cardsContainer} mw-75`}
      >
        <div className="row d-flex g-4 justify-content-center align-items-start">
          {isLoading ? (
            <div className="col">
              <LoadingCard />
            </div>
          ) : !lastSearchData ? (
            <div className="col">
              <EmptyCard />
            </div>
          ) : lastSearchData.length > 0 ? (
            lastSearchData.map((hero) => (
              <div className="col" key={hero.id}>
                <HeroCard hero={hero} />
              </div>
            ))
          ) : (
            <div className={`col ${classes.cardsCols}`}>
              <ExclamationCard />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Search;
