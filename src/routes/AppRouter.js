import React from 'react';
import { BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom';
import HomePage from '../components/HomePage';
import Header from '../components/HeaderPage';
import Footer from '../components/FooterPage';
import AddUserPage from '../components/AddUserPage';
import SigninPage from '../components/SignInPage'
// export const history = createHistory();

const AppRouter = () => (
  <BrowserRouter>
    
    <React.Fragment >
    <Header/>
 <main role="main" className="inner">
      <Switch>
        <Route path="/" component={HomePage} exact={true} />
        <Route path="/register" component={AddUserPage}  />
        <Route path="/login" component={SigninPage}  />
      </Switch>
      </main>
      <Footer />
      </React.Fragment>
  </BrowserRouter>
);

export default AppRouter;
