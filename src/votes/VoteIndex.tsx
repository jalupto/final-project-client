import { Component } from "react";
import { Auth } from "../users";
import { VoteTable } from "./VoteTable";

type VoteProps = {
    sessionToken: string;
    updateToken: (newToken: string) => void;
}

export class VoteIndex extends Component<VoteProps> {
    render(){
        return(
            <div className='voteContainer'>
                <div className='voteIndex'>
                    {
                        this.props.sessionToken ?
                        <VoteTable />
                        : <Auth updateToken={this.props.updateToken} />
                    }
                </div>
            </div>
        )
    }
}