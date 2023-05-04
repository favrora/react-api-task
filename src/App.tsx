import React, { useEffect } from "react";
import { Route, Switch } from "wouter";

import { fetchAllPersonages } from "./redux/slices/personageSlice";
import { useAppDispatch } from "./redux/hooks";

import NavBar from "./components/NavBar";

import PersonageList from "./pages/PersonageList";
import PersonageDetail from "./pages/PersonageDetail";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllPersonages());
  }, []);

  return (
    <div>
      <NavBar />
      <Switch>
        <Route path="/" component={PersonageList} />
        <Route path="/:id" component={PersonageDetail} />
      </Switch>
    </div>
  );
}

export default App;
