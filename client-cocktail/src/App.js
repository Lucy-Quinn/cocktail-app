import React from 'react';
import { Switch } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import Navbar from './Layout/Navbar';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CreateCocktailPage from './pages/CreateCocktailPage';
import IndividualCocktailPage from './pages/IndividualCocktailPage';
import CocktailInspirationPage from './pages/CocktailInspirationPage';
import ProfilePage from './pages/ProfilePage';
import GlobalStyle from './components/GlobalStyle';
import AnonRoute from './routes/AnonRoute';
import PrivateRoute from './routes/PrivateRoute';
import { AuthContextProvider } from './context/AuthContext';

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
          <PrivateRoute
            exact
            path="/cocktails/cocktail-inspiration"
            component={CocktailInspirationPage}
          />
          <PrivateRoute
            exact
            path="/cocktails/your-cocktails"
            component={DashboardPage}
          />
          <PrivateRoute
            exact
            path="/cocktails/create-cocktail"
            component={CreateCocktailPage}
          />
          <PrivateRoute
            exact
            path="/cocktails/:cocktailId"
            component={IndividualCocktailPage}
          />
          <PrivateRoute
            exact
            path="/profile/:profileId"
            component={ProfilePage}
          />
        </Switch>
      </AuthContextProvider>
    </Router>
  );
}

export default App;
