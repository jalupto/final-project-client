import { Component } from "react";
import { Auth } from "../users";
import { FavTable } from "./FavTable";
import { FavEdit } from "./FavEdit";
import APIURL from '../helpers/environment';

type FavProps = {
    sessionToken: string | null
    updateToken: (newToken: string) => void
    updateAdmin: (newAdmin: string) => void
}

type FavState = {
    favs: FavQueen[]
    updateActive: boolean
    favToUpdate: number
}

type FavQueen = {
    id: number
    queen: string
    season: string
}

export class FavIndex extends Component<FavProps, FavState> {
    constructor(props: FavProps){
        super(props)
        this.state = {
            favs: [],
            updateActive: false,
            favToUpdate: 0
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

    editUpdateFav = (fav: FavQueen) => {
        this.setState({ favToUpdate: fav.id });
        console.log(fav);
    };

    updateOn = () => {
        this.setState({ updateActive: true })
    };

    updateOff = () => {
        this.setState({ updateActive: false })
    };

    render(){
        return(
            <div className='favContainer'>
                <div className='favIndex'>
                    {
                        this.props.sessionToken ?
                        <FavTable 
                        sessionToken={this.props.sessionToken}
                        favs={this.state.favs} 
                        fetchFavs={this.fetchFavs}
                        editUpdateFav={this.editUpdateFav} 
                        updateOn={this.updateOn}
                        />
                        : <Auth updateToken={this.props.updateToken} updateAdmin={this.props.updateAdmin} />
                    }
                    {
                        this.state.updateActive === true ? 
                        <FavEdit 
                        favs={this.state.favs} 
                        favToUpdate={this.state.favToUpdate} 
                        updateOff={this.updateOff} 
                        sessionToken={this.props.sessionToken} 
                        fetchFavs={this.fetchFavs}/> 
                        : <> </>
                    }
                </div>
            </div>
        )
    }
}