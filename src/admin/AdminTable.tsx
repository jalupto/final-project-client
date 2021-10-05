import { Component } from "react";
import { Table } from "reactstrap";
import { Button } from "@material-ui/core";
import APIURL from '../helpers/environment';
import DeleteIcon from "@material-ui/icons/Delete";

type TableProps = {
    sessionToken: string | null;
    allUsers: Users[];
    fetchUsers(): void;
}

type Users = {
    id: number;
    email: string;
}

export class AdminTable extends Component<TableProps> {
    deleteUser = (user: Users) => {
        fetch(`${APIURL}/users/${user.id}`, {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.sessionToken}`
            })
        })
        .then(() => this.props.fetchUsers())
        alert(`${user.email} has been deleted.`)
    };

    userMapper = (): JSX.Element[] => {
        return this.props.allUsers.map((user: Users, index: number) => {
            return(
                <tr key={index}>
                    <th scope='row'>{user.id}</th>
                    <td>{user.email}</td>
                    <Button className="delete-btn" style={{backgroundColor:'#946dde', color: '#5d3882'}} 
                    onClick={() => {this.deleteUser(user)}}>Delete<DeleteIcon />
                    </Button>
                </tr>
            )
        })
    }

    componentDidMount() {
        this.props.fetchUsers();
    }

    render(){
        return(
            <Table className='table'>
                <thead className='table-head'>
                    <tr>
                        <th>#</th>
                        <th>Email</th>
                        {/* <th>Admin?</th> */}
                    </tr>
                </thead>
                <tbody className='table-body'>{this.userMapper()}</tbody>
            </Table>
        )
    }
}