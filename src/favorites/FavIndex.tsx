import { Component } from "react";
import { Auth } from "../users";

type FavProps = {
    sessionToken: string;
    updateToken: (newToken: string) => void;
}

export class FavIndex extends Component<FavProps> {
    render(){
        return(
            <div className='favContainer'>
                <div className='favIndex'>
                    {
                        this.props.sessionToken ?
                        <h3>Favs will go here.</h3>
                        : <Auth updateToken={this.props.updateToken} />
                    }
                </div>
            </div>
        )
    }
}