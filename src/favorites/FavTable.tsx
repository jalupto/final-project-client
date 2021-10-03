import { Component } from "react";
import { Table } from "reactstrap";

type TableProps = {
    favs: FavQueen[];
    fetchFavs(): void;
}

type FavQueen = {
    id: number,
    queen: string,
    season: string
}

export class FavTable extends Component<TableProps> {

    favMapper = (): JSX.Element[] => {
        return this.props.favs.map((fav: FavQueen, index: number) => {
            return(
                <tr key={index}>
                    <th scope='row'>{fav.id}</th>
                    <td>{fav.queen}</td>
                    <td>{fav.season}</td>
                </tr>
            )
        })
    }

    componentDidMount() {
        this.props.fetchFavs();
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
                <tbody>{this.favMapper()}</tbody>
            </Table>
        )
    }
}