import { Component } from 'react';
import { 
    Form, FormGroup, Label, Input, 
    Modal, ModalHeader, ModalBody 
} from 'reactstrap';
import { Button } from "@material-ui/core"
import SaveIcon from "@material-ui/icons/Save";
import CancelIcon from "@material-ui/icons/Cancel";
import APIURL from '../helpers/environment';

type EditProps = {
    sessionToken: string | null
    favs: FavQueen[];
    fetchFavs(): void;
    updateOff(): void;
    favToUpdate: number;
}
type EditState = {
    fav: string
}

type FavQueen = {
    id: number,
    queen: string,
    season: string
}

export class FavEdit extends Component<EditProps, EditState> {
    constructor(props: EditProps){
        super(props)
        this.state = {
            fav: ''
        }
    }

    favUpdate = () => {
        const updatedQueen ={
            favs: {
                queen: this.state.fav
            }
        };
        fetch(`${APIURL}/favs/${this.props.favToUpdate}`, {
            method: 'PUT',
            body: JSON.stringify(updatedQueen),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.sessionToken}`
            })
        }).then((res) => {
            this.setState({fav: ''})
            this.props.fetchFavs();
            this.props.updateOff();
        })
    };

    render(){
        return(
            <Modal isOpen={true}>
                <ModalHeader>Update your favorite queen.</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label htmlFor='queen'>Edit Name:</Label>
                            <Input 
                            name='queen' value={this.state.fav} onChange={(e) => this.setState({fav: e.target.value})}/>
                        </FormGroup>
                        <Button className="save-btn" type='submit' onClick={() => {this.favUpdate()}}>SAVE<SaveIcon /></Button>
                        <Button className="cancel-btn" onClick={() => {this.props.updateOff()}}>CANCEL<CancelIcon /></Button>
                    </Form>
                </ModalBody>
            </Modal>
        );
    };
};