import { Component } from "react";
import { DataGrid, GridRowsProp, GridColDef } from '@material-ui/data-grid';

const rows: GridRowsProp = [
    { id: 1, col1: 'Aquaria', col2: '10' },
    { id: 2, col1: 'Adore Delano', col2: '6' },
    { id: 3, col1: 'Crystal Methyd', col2: '12' }
];

const columns: GridColDef[] = [
    { field: 'id', hide: true },
    { field: 'col1', headerName: 'Queen', width: 150 },
    { field: 'col2', headerName: 'Season', width: 150 }
]

export class VoteTable extends Component {
    render(){
        return(
            <div style={{ height: 300, width: '100%' }}>
                <DataGrid rows={rows} columns={columns} />
            </div>
        )
    }
}