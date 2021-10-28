import { createContext } from "react";
import { useContext, useState } from "react/cjs/react.development";
import { loadState, saveState } from "../libs/localStorage";

const AppContext = createContext();

const initialState = loadState() || {
  team: [],
  summary: {},
  alignment: { good: 0, bad: 0, neutral: 0 },
};
export const AppDataProvider = (props) => {
  const [appState, setAppState] = useState(initialState);
  const [lastSearchData, setLastSearchData] = useState(null);

  const addHero = (hero) => {
    hero.biography.alignment =
      hero.biography.alignment !== "good" && hero.biography.alignment !== "bad"
        ? "neutral"
        : hero.biography.alignment;

    const alreadyIn = appState.team.find((member) => member.id === hero.id);
    if (appState.team.length >= 6) {
      return { message: "The team is complete" };
    }
    if (alreadyIn) {
      return { message: "This character is already in the team" };
    }
    if (appState.alignment[hero.biography.alignment] >= 3) {
      return {
        message: `You can only have 3 ${hero.biography.alignment} characters`,
      };
    }

    setAppState((prevState) => {
      const newTeam = [...prevState.team, hero];
      const newSummary = {};
      for (const stat in hero.powerstats) {
        newSummary[stat] =
          (+hero.powerstats[stat] ? +hero.powerstats[stat] : 0) +
          (+prevState.summary[stat] ? prevState.summary[stat] : 0);
      }
      const newAlignment = {
        ...prevState.alignment,
        [hero.biography.alignment]:
          prevState.alignment[hero.biography.alignment] + 1,
      };
      saveState({
        team: newTeam,
        summary: newSummary,
        alignment: newAlignment,
      });
      return { team: newTeam, summary: newSummary, alignment: newAlignment };
    });
    return { message: "Added to the team" };
  };

  const removeHero = (hero) => {
    hero.biography.alignment =
      hero.biography.alignment !== "good" && hero.biography.alignment !== "bad"
        ? "neutral"
        : hero.biography.alignment;

    setAppState((prevState) => {
      const newTeam = prevState.team.filter((member) => member.id !== hero.id);
      const newSummary = {};
      for (const stat in hero.powerstats) {
        newSummary[stat] =
          (+prevState.summary[stat] ? prevState.summary[stat] : 0) -
          (+hero.powerstats[stat] ? +hero.powerstats[stat] : 0);
      }
      const newAlignment = {
        ...prevState.alignment,
        [hero.biography.alignment]:
          prevState.alignment[hero.biography.alignment] - 1,
      };
      saveState({
        team: newTeam,
        summary: newSummary,
        alignment: newAlignment,
      });
      return { team: newTeam, summary: newSummary, alignment: newAlignment };
    });
  };

  const value = {
    appState,
    addHero,
    removeHero,
    lastSearchData,
    setLastSearchData,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export const useAppData = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useAppData must be used within AppContext");
  }
  return context;
};
