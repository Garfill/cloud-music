import Layout from "layout";
import { useReducer } from "react";
import { DataContext } from 'context/data';

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
      <Layout></Layout>
    </DataContext.Provider>
  );
}

export default App;
