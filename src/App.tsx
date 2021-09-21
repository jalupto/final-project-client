import { Component } from 'react';
import './App.css';
import { Header } from './common';
import { Auth } from './users/Auth';
// import { Favorites } from './favorites';

type AppProps = {}
type AppState = {
  loggedIn: boolean
}

class App extends Component<AppProps, AppState> {
  constructor(props: AppProps){
    super(props)
    this.state = {
      loggedIn: false
    }
  }
  
  render() {
    return (
    <div className="App">
      <Header brand="RuPaul's Next Race"/>
      {this.state.loggedIn ? (
            <button style={{ padding: "1em" }} onClick={() => this.setState({loggedIn: true})}>
            Logout
            </button>
        ) : (
            <Auth />
        )}
      {/* <Favorites /> */}
    </div>
    );
  }
}

export default App;