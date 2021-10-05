import { Component } from 'react';
import './App.css';
import { Footer, Home, Navbar } from './common';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Auth } from './users';
import { Admin } from './admin';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { VoteIndex } from './votes';
import { FavIndex } from './favorites';

type AppState = {
  sessionToken: string | null;
  isAdmin: string | null;
};

class App extends Component<{}, AppState> {
  state = {
    sessionToken: '',
    isAdmin: ''
  };

  updateToken = (newToken: string) => {
    localStorage.setItem('token', newToken);
    this.setState({ sessionToken: newToken });
  };

  updateAdmin = (newAdmin: string) => {
    localStorage.setItem('admin', newAdmin);
    this.setState({ isAdmin: newAdmin });
  };

  clearToken = () => {
    localStorage.clear();
    this.setState({ sessionToken: '' });
    this.setState({ isAdmin: '' });
    alert('User has logged out');
  };

  protectedViews = () => {
    return this.state.sessionToken === localStorage.getItem('token') ? 
    <Home 
    sessionToken={this.state.sessionToken} 
    />
    : 
    <Auth 
    updateToken={this.updateToken} 
    updateAdmin={this.updateAdmin}
    />
  };

  protectedAdmin = () => {
    return this.state.isAdmin === 'true' ? 
    <Admin
    sessionToken={this.state.sessionToken}
    isAdmin={this.state.isAdmin}
    />
    : 
    <Auth 
    updateToken={this.updateToken} 
    updateAdmin={this.updateAdmin}
    />
  };

  componentDidMount = () => {
    if(localStorage.getItem('token')){
      this.setState({ sessionToken: localStorage.getItem('token') })
    }
    if(localStorage.getItem('admin')){
      this.setState({ isAdmin: localStorage.getItem('admin') })
    }
  }

  render() {
    return (
      <Router>
        <div className='App'>
          <Navbar
            clearToken={this.clearToken}
            sessionToken={this.state.sessionToken}
            isAdmin={this.state.isAdmin}
          />
          <Switch>
            <Route exact path='/admin'>
              {
                this.protectedAdmin()
              }
            </Route>
            <Route exact path='/'>
              {
                this.protectedViews()
              }
            </Route>
            <Route exact path='/votes'>
                <VoteIndex
                sessionToken={this.state.sessionToken}
                updateToken={this.updateToken}
                updateAdmin={this.updateAdmin}
                />
            </Route>
            <Route exact path='/favs'>
                <FavIndex
                sessionToken={this.state.sessionToken}
                updateToken={this.updateToken}
                updateAdmin={this.updateAdmin}
                />
            </Route>
          </Switch>
          <br/>
          <br/>
          <br/>
          <Footer footer='Jared Upton 2021 - Powered by No Key No Shade API' />
        </div>
      </Router>
    )
  }
}

export default App;