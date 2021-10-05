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
    votes: VoteQueen[];
    fetchVotes(): void;
    updateOff(): void;
    voteToUpdate: number;
}
type EditState = {
    vote: string
}

type VoteQueen = {
    id: number,
    queen: string,
    season: string
}

export class VoteEdit extends Component<EditProps, EditState> {
    constructor(props: EditProps){
        super(props)
        this.state = {
            vote: ''
        }
    }

    voteUpdate = () => {
        const updatedVote ={
            votes: {
                queen: this.state.vote
            }
        };
        fetch(`${APIURL}/votes/${this.props.voteToUpdate}`, {
            method: 'PUT',
            body: JSON.stringify(updatedVote),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.sessionToken}`
            })
        }).then((res) => {
            this.setState({vote: ''})
            this.props.fetchVotes();
            this.props.updateOff();
        })
    };

    render(){
        return(
            <Modal isOpen={true}>
                <ModalHeader>Update your vote.</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label htmlFor='queen'>Edit Name:</Label>
                            <Input 
                            name='queen' value={this.state.vote} onChange={(e) => this.setState({vote: e.target.value})}/>
                        </FormGroup>
                        <Button className="save-btn" type='submit' onClick={() => {this.voteUpdate()}}>SAVE<SaveIcon /></Button>
                        <Button className="cancel-btn" onClick={() => {this.props.updateOff()}}>CANCEL<CancelIcon /></Button>
                    </Form>
                </ModalBody>
            </Modal>
        );
    };
};