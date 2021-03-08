import React, { createContext, useState } from "react";

export const GridLayoutContext = createContext({
  filter: null,
  gridLayout: "tiles",
  hasSetGridLayout: false,
  setFilter: (filter: string) => {},
  setGridLayout: (tile: string) => {},
  getGridLayout: () => {},
});

const GridLayoutProvider: React.FC<{}> = ({ children }) => {
  const initialLayout = "tiles";

  const [filter, setFilter] = useState<string>(null);
  const [gridLayout, setGridLayout] = useState<string>(initialLayout);
  const [hasSetGridLayout, setHasSetGridLayout] = useState<boolean>(false);

  function setGridLayoutAndSave(tile: string) {
    localStorage.setItem("gridLayout", tile || initialLayout);
    setGridLayout(tile);
  }

  function getGridLayoutAndSave() {
    setGridLayout(localStorage.getItem("gridLayout") || initialLayout);
    setHasSetGridLayout(true);
  }

  return (
    <GridLayoutContext.Provider
      value={{
        filter,
        gridLayout,
        hasSetGridLayout,
        setFilter,
        setGridLayout: setGridLayoutAndSave,
        getGridLayout: getGridLayoutAndSave,
      }}
    >
      {children}
    </GridLayoutContext.Provider>
  );
};

export default GridLayoutProvider;
