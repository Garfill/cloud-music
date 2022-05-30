import { BrowserRouter, Routes, Route } from "react-router-dom";
import routes from 'router'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {
          routes.map((route, index) => (
            <Route path={route.path} element={<route.component />} key={index}></Route>
          ))
        }
      </Routes>
    </BrowserRouter>
  );
}

export default App;
