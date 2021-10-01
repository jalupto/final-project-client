import { Component } from "react";
import "./App.css";
import { Footer, Home, Navbar } from "./common";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Auth } from "./users";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { VoteIndex } from "./votes";
import { FavIndex } from "./favorites";

type AppState = {
  sessionToken: string | null
};

class App extends Component<{}, AppState> {
  state = {
    sessionToken: '',
  };

  updateToken = (newToken: string) => {
    localStorage.setItem("token", newToken);
    this.setState({ sessionToken: newToken });
  };

  clearToken = () => {
    localStorage.clear();
    this.setState({ sessionToken: "" });
  };

  protectedViews = () => {
    return this.state.sessionToken === localStorage.getItem("token") ? (
      <Home 
      sessionToken={this.state.sessionToken} 
      />
    ) : (
      <Auth updateToken={this.updateToken} />
    );
  };

  componentDidMount = () => {
    if(localStorage.getItem('token')){
      this.setState({sessionToken: localStorage.getItem('token')})
    }
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Navbar
            clearToken={this.clearToken}
            sessionToken={this.state.sessionToken}
          />
          <Switch>
            <Route exact path="/">
              {
                this.protectedViews()
              }
            </Route>
            <Route exact path="/votes">
                <VoteIndex
                sessionToken={this.state.sessionToken}
                updateToken={this.updateToken}
                />
            </Route>
            <Route exact path="/favs">
                <FavIndex
                sessionToken={this.state.sessionToken}
                updateToken={this.updateToken}
                />
            </Route>
          </Switch>
          <br/>
          <br/>
          <br/>
          <Footer footer="Jared Upton 2021 - Powered by No Key No Shade API" />
        </div>
      </Router>
    )
  }
}

export default App;