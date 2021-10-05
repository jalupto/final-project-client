import { Component } from "react";
import { Auth } from "../users";
import { VoteTable } from "./VoteTable";
import { VoteEdit } from "./VoteEdit";
import APIURL from '../helpers/environment';

type VoteProps = {
    sessionToken: string | null;
    updateToken: (newToken: string) => void;
    updateAdmin: (newAdmin: string) => void;
}

type VoteState = {
    votes: VoteQueen[]
    updateActive: boolean
    voteToUpdate: number
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
            votes: [],
            updateActive: false,
            voteToUpdate: 0
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

    editUpdateVote = (vote: VoteQueen) => {
        this.setState({ voteToUpdate: vote.id });
        console.log(vote);
    };

    updateOn = () => {
        this.setState({ updateActive: true })
    };

    updateOff = () => {
        this.setState({ updateActive: false })
    };

    render(){
        return(
            <div className='voteContainer'>
                <div className='voteIndex'>
                    {
                        this.props.sessionToken ?
                        <VoteTable 
                        sessionToken={this.props.sessionToken}
                        votes={this.state.votes} 
                        fetchVotes={this.fetchVotes}
                        editUpdateVote={this.editUpdateVote} 
                        updateOn={this.updateOn}
                        />
                        : <Auth updateToken={this.props.updateToken} updateAdmin={this.props.updateAdmin} />
                    }
                    {
                        this.state.updateActive === true ? 
                        <VoteEdit 
                        votes={this.state.votes} 
                        voteToUpdate={this.state.voteToUpdate} 
                        updateOff={this.updateOff} 
                        sessionToken={this.props.sessionToken} 
                        fetchVotes={this.fetchVotes}/> 
                        : <> </>
                    }
                </div>
            </div>
        )
    }
}