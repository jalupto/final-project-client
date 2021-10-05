import { Component } from "react";
import { Table } from "reactstrap";
import { Button } from "@material-ui/core";
import UpdateIcon from "@material-ui/icons/Update";
import DeleteIcon from "@material-ui/icons/Delete";
import APIURL from '../helpers/environment';

type TableProps = {
    sessionToken: string | null
    favs: FavQueen[];
    fetchFavs(): void;
    editUpdateFav: (fav: FavQueen) => void;
    updateOn(): void;
}

type FavQueen = {
    id: number,
    queen: string,
    season: string
}

export class FavTable extends Component<TableProps> {
    deleteFav = (fav: FavQueen) => {
        fetch(`${APIURL}/favs/${fav.id}`, {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.sessionToken}`
            })
        })
        .then(() => this.props.fetchFavs())
        alert(`${fav.queen} has been deleted.`)
    };

    favMapper = (): JSX.Element[] => {
        return this.props.favs.map((fav: FavQueen, index: number) => {
            return(
                <tr key={index}>
                    <th scope='row'>{fav.id}</th>
                    <td>{fav.queen}</td>
                    <td>{fav.season}</td>
                    <td>
                    <Button className='update-btn' style={{backgroundColor:'#37acde', color: '#5d3882'}} 
                    onClick={() => {this.props.editUpdateFav(fav); this.props.updateOn()}}>Update<UpdateIcon />
                    </Button>
                    <br />
                    <Button className='delete-btn' style={{backgroundColor:'#946dde', color: '#5d3882'}} 
                    onClick={() => {this.deleteFav(fav)}}>Delete<DeleteIcon />
                    </Button>
                    </td>
                </tr>
            )
        })
    }

    componentDidMount() {
        this.props.fetchFavs();
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
                <tbody className='table-body'>{this.favMapper()}</tbody>
            </Table>
        )
    }
}