import { Component } from "react";
import APIURL from '../helpers/environment';
import { AdminTable } from './AdminTable';

type AdminProps = {
    sessionToken: string | null;
    isAdmin: string | null;
}
type AdminState = {
    allUsers: Users[];
}
type Users = {
    id: number;
    email: string;
}

export class Admin extends Component<AdminProps, AdminState> {
    constructor(props: AdminProps){
        super(props)
        this.state = {
            allUsers: []
        }
    }

    fetchUsers = async () => {
        const res = await fetch(`${APIURL}/users/all/`, {
            method: 'GET',
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this.props.sessionToken}`
            })
        })
        const response = await res.json();
        this.setState({allUsers: response});
        console.log(this.state.allUsers);
    };

    render(){
        return(
            <div className='adminContainer'>
                <div className='adminIndex'>
                    {
                        this.props.isAdmin === 'true' ?
                        <AdminTable 
                        allUsers={this.state.allUsers} 
                        fetchUsers={this.fetchUsers}
                        sessionToken={this.props.sessionToken}
                        />
                        : null
                    }
                </div>
            </div>
        )
    }
}