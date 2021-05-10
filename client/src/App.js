import "./App.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./Components/Header/Header";
import Home from "./Components/Home/Home";

const App = () => {
  const [payment, setPayment] = useState("Рубли");
  return (
    <Router>
      <div className="wrapper">
        <div className="content">
          <Header payment={payment} setPayment={setPayment} />
        </div>
      </div>
      <Switch>
        <Route path="/catalog">
          <Home payment={payment} />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
