import { Component } from "react";
import { Auth } from "../users";

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
                        <h3>Votes will go here.</h3>
                        : <Auth updateToken={this.props.updateToken} />
                    }
                </div>
            </div>
        )
    }
}