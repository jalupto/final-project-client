import { Component } from "react";
import { Auth } from "../users";
import { VoteTable } from "./VoteTable";
import APIURL from '../helpers/environment';

type VoteProps = {
    sessionToken: string | null;
    updateToken: (newToken: string) => void;
}

type VoteState = {
    votes: VoteQueen[]
}

type VoteQueen = {
    id: number,
    queen: string,
    season: string
}

export class VoteIndex extends Component<VoteProps, VoteState> {
    constructor(props: VoteProps){
        super(props)
        this.state = {
            votes: []
        }
    }

    fetchVotes = async () => {
        const res = await fetch(`${APIURL}/votes/`, {
            method: 'GET',
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this.props.sessionToken}`
            })
        })
        const response = await res.json();
        this.setState({votes: response});
        console.log(this.state.votes);
    };

    render(){
        return(
            <div className='voteContainer'>
                <div className='voteIndex'>
                    {
                        this.props.sessionToken ?
                        <VoteTable 
                        votes={this.state.votes} 
                        fetchVotes={this.fetchVotes}
                        />
                        : <Auth updateToken={this.props.updateToken} />
                    }
                </div>
            </div>
        )
    }
}