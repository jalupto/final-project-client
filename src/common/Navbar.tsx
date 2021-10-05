import { Component } from 'react';
import { Link } from 'react-router-dom';

type NavProps = {
    clearToken(): void;
    sessionToken: string | null;
    isAdmin: string | null;
}

export class Navbar extends Component<NavProps> {

    render() {
        return (
            <div className='navContainer'>
                <div className='navbar' style={{justifyContent: 'center'}}>
                    {
                        this.props.isAdmin === 'true' ?
                        <Link to='/admin' className='link'>Admin</Link>
                        :
                        null
                    }
                    <Link to='/' className='link'>Home</Link>
                    <Link to='/votes' className='link'>Votes</Link>
                    <Link to='/favs' className='link'>Favs</Link>
                    {
                        this.props.sessionToken ?
                        <button className='logout' style={{ padding: '0.5em' }} onClick={() => this.props.clearToken()}>Logout</button>
                        :
                        null
                    }
                </div>
            </div>
        )
    }
}