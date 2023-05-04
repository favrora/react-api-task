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
    console.log("fetch all");
    dispatch(fetchAllPersonages());
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
