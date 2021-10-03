import { Component } from "react";
import { Auth } from "../users";
import { FavTable } from "./FavTable";
import APIURL from '../helpers/environment';

type FavProps = {
    sessionToken: string | null;
    updateToken: (newToken: string) => void;
}

type FavState = {
    favs: FavQueen[]
}

type FavQueen = {
    id: number,
    queen: string,
    season: string
}

export class FavIndex extends Component<FavProps, FavState> {
    constructor(props: FavProps){
        super(props)
        this.state = {
            favs: []
        }
    }

    fetchFavs = async () => {
        const res = await fetch(`${APIURL}/favs/`, {
            method: 'GET',
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this.props.sessionToken}`
            })
        })
        const response = await res.json();
        this.setState({favs: response});
        console.log(this.state.favs);
    };

    render(){
        return(
            <div className='favContainer'>
                <div className='favIndex'>
                    {
                        this.props.sessionToken ?
                        <FavTable 
                        favs={this.state.favs} 
                        fetchFavs={this.fetchFavs}
                        />
                        : <Auth updateToken={this.props.updateToken} />
                    }
                </div>
            </div>
        )
    }
}