import React from 'react';
import Header from './Header';
import Footer from './Footer';
import BestBooks from './BestBooks';
import About from './About';
import { withAuth0 } from '@auth0/auth0-react';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import Profile from './Profile';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

class App extends React.Component {
  render() {
    return (
      <>
            <h1>{this.props.auth0?.user?.given_name || 'Hey'}, welcome to your bookcase!</h1>
        <Router>
          <Header />
          <Routes>
            <Route
              exact path="/"
              element={<BestBooks />}
              />
            <Route
              path="/about"
              element={<About />}
              />
          </Routes>
          <Footer />
        </Router>
              {this.props.auth0.isAuthenticated ? <LogoutButton /> : <LoginButton />}
              {this.props.auth0.isAuthenticated ? <Profile /> : <h2>Please login</h2>}
      </>
    )
  }
}

export default withAuth0(App);
