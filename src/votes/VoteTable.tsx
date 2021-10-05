import { Component } from "react";
import { Table } from "reactstrap";
import { Button } from "@material-ui/core";
import UpdateIcon from "@material-ui/icons/Update";
import DeleteIcon from "@material-ui/icons/Delete";
import APIURL from '../helpers/environment';

type TableProps = {
    sessionToken: string | null
    votes: VoteQueen[];
    editUpdateVote: (vote: VoteQueen) => void;
    fetchVotes(): void;
    updateOn(): void;
}

type VoteQueen = {
    id: number,
    queen: string,
    season: string
}

export class VoteTable extends Component<TableProps> {
    deleteVote = (vote: VoteQueen) => {
        fetch(`${APIURL}/votes/${vote.id}`, {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.sessionToken}`
            })
        })
        .then(() => this.props.fetchVotes())
        alert(`${vote.queen} has been deleted.`)
    };

    voteMapper = (): JSX.Element[] => {
        return this.props.votes.map((vote: VoteQueen, index: number) => {
            return(
                <tr key={index}>
                    <th scope='row'>{vote.id}</th>
                    <td>{vote.queen}</td>
                    <td>{vote.season}</td>
                    <td>
                    <Button className= "update-btn" style={{backgroundColor:'#37acde', color: '#5d3882'}} 
                    onClick={() => {this.props.editUpdateVote(vote); this.props.updateOn()}}>Update<UpdateIcon />
                    </Button>
                    <br />
                    <Button className="delete-btn" style={{backgroundColor:'#946dde', color: '#5d3882'}} 
                    onClick={() => {this.deleteVote(vote)}}>Delete<DeleteIcon />
                    </Button>
                    </td>
                </tr>
            )
        })
    }

    componentDidMount() {
        this.props.fetchVotes();
    }

    render(){
        return(
            <Table className='table'>
                <thead className='table-head'>
                    <tr>
                        <th>#</th>
                        <th>Queen</th>
                        <th>Season</th>
                    </tr>
                </thead>
                <tbody className='table-body'>{this.voteMapper()}</tbody>
            </Table>
        )
    }
}