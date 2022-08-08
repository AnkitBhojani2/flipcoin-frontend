import ResultContext from "./ResultContext";

import React, { useState } from "react";

export default function ResultState({ children }) {
  const [results, setResults] = useState([]);

  return (
    <ResultContext.Provider value={{ results, setResults }}>
      {children}
    </ResultContext.Provider>
  );
}
