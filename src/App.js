import { Suspense } from "react";
import { Routes, Route, HashRouter } from "react-router-dom";
import routes from 'router'


function App() {
  return (
    <HashRouter>
      <Routes>
        {
          routes.map((route, index) => (
            <Route
              path={route.path}
              key={index}
              element={
                <Suspense fallback="...loading...">
                  <route.component />
                </Suspense>
              }>
            </Route>
          ))
        }
      </Routes>
    </HashRouter>
  );
}

export default App;
