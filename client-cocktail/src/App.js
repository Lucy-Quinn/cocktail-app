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
import { AuthContextProvider } from './context/AuthContext';
import AnonRoute from "./components/AnonRoute";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Router>
      <AuthContextProvider>
        <GlobalStyle />
        <Navbar />
        <Switch>
          <AnonRoute exact path="/" component={HomePage} />
          <AnonRoute exact path="/login" component={LoginPage} />
          <AnonRoute exact path="/register" component={RegisterPage} />
          <PrivateRoute exact path="/cocktails" component={DashboardPage} />
          <PrivateRoute exact path="/cocktails/create-cocktail" component={CreateCocktailPage} />
          <PrivateRoute exact path="/cocktails/:cocktailId" component={IndividualCocktailPage} />
        </Switch>
      </AuthContextProvider>
    </Router>
  );
}

export default App;
