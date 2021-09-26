import { Component } from "react";
import { Link } from "react-router-dom";
// import { Auth } from "../users";
// import { Home } from "../common";

type NavProps = {
    clearToken(): void;
    sessionToken: string;
}

export class Navbar extends Component<NavProps> {

    render() {
        return (
            <div className='navContainer'>
                <div className='navbar'>
                    <Link to='/' className='link'>Home</Link>
                    <Link to='/votes' className='link'>Votes</Link>
                    <Link to='/favs' className='link'>Favs</Link>
                    {
                        this.props.sessionToken ?
                        <button style={{ padding: '1em' }} onClick={() => this.props.clearToken()}>Logout</button>
                        :
                        null
                    }
                </div>
            </div>
        )
    }
}