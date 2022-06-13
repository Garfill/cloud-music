import { useReducer } from "react";
import { DataContext } from 'context/data';
import { renderRoutes } from "router";
import routes from 'router'
import { Routes } from "react-router-dom";

function reducer(state, { type, payload }) {
  switch (type) {
    case 'SET_COUNT':
      return { ...state, count: payload }
    default:
      throw new Error();
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, {
    count: 0
  })
  return (
    <DataContext.Provider value={{ state, dispatch }}>
      <Routes>
        { renderRoutes(routes) }
      </Routes>
    </DataContext.Provider>
  );
}

export default App;
