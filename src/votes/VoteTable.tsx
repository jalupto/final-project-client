import { Component } from "react";
import { Table } from "reactstrap";

type TableProps = {
    votes: VoteQueen[];
    fetchVotes(): void;
}

type VoteQueen = {
    id: number,
    queen: string,
    season: string
}

export class VoteTable extends Component<TableProps> {

    voteMapper = (): JSX.Element[] => {
        return this.props.votes.map((vote: VoteQueen, index: number) => {
            return(
                <tr key={index}>
                    <th scope='row'>{vote.id}</th>
                    <td>{vote.queen}</td>
                    <td>{vote.season}</td>
                </tr>
            )
        })
    }

    componentDidMount() {
        this.props.fetchVotes();
    }

    render(){
        return(
            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Queen</th>
                        <th>Season</th>
                    </tr>
                </thead>
                <tbody>{this.voteMapper()}</tbody>
            </Table>
        )
    }
}