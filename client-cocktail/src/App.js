import React from "react";
import { Route, Switch } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import Navbar from './Layout/Navbar';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CreateCocktailPage from './pages/CreateCocktailPage';
import IndividualCocktailPage from './pages/IndividualCocktailPage';
import GlobalStyle from './components/GlobalStyle';

function App() {
  return (
    <Router>
      <div>
        <GlobalStyle />
        <Navbar />
        <Switch>
          {/* <Route exact path="/" component={HomePage} /> */}
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/register" component={RegisterPage} />
          <Route exact path="/cocktails" component={DashboardPage} />
          <Route exact path="/cocktails/create-cocktail" component={CreateCocktailPage} />
          {/* <Route exact path="/api/cocktails/cocktailId" component={IndividualCocktailPage} /> */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
