import { Component } from "react";
import { Card, CardImg, CardBody, CardTitle, CardText } from 'reactstrap';
import { Container, Row, Col, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Grid, Button } from "@material-ui/core";
import APIURL from '../helpers/environment';

type HomeProps = {
    sessionToken: string | null
}

type HomeState = {
    results: Queen[],
    dropOpen1: boolean,
    dropOpen2: boolean
    season: number,
}

type Queen = {
    name: string,
    winner: boolean,
    quote: string,
    image_url: string,
    missCongeniality: boolean,
    seasons: Seasons[]
}

type Seasons = {
    seasonNumber: string
}

export class Home extends Component<HomeProps, HomeState> {
    constructor(props: HomeProps){
        super(props)
        this.state = {
            results: [],
            dropOpen1: false,
            dropOpen2: false,
            season: 17,
        }
    }

    faveQueen = async (queen: Queen) => {
        const res = await fetch(`${APIURL}/favs/`, {
            method: "POST",
            body: JSON.stringify({
                favs: {
                    queen: queen.name,
                    season: queen.seasons[0].seasonNumber
                },
            }),
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this.props.sessionToken}`
            }),
        })
        const response = await res.json();
        console.log(response);
        console.log(queen.seasons[0].seasonNumber);
        alert(`Saved ${queen.name} to Favs!`);
    }

    voteQueen = async (queen: Queen) => {
        const res = await fetch(`${APIURL}/votes/`, {
            method: "POST",
            body: JSON.stringify({
                votes: {
                    queen: queen.name,
                    season: queen.seasons[0].seasonNumber
                },
            }),
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this.props.sessionToken}`
            }),
        })
        const response = await res.json();
        console.log(response);
        console.log(queen.seasons[0].seasonNumber);
        alert(`Saved ${queen.name} to Votes!`);
    }

    toggle1 = () => this.setState({dropOpen1: !this.state.dropOpen1})
    toggle2 = () => this.setState({dropOpen2: !this.state.dropOpen2})

    getQueens = async (season = 17) => {
        const res = await fetch(
            `http://www.nokeynoshade.party/api/seasons/${season}/queens`, {
                method: 'GET'
            }
        )
        const response = await res.json();
        this.setState({results: response});
        console.log(this.state.results);
        console.log(this.state.results[0].seasons[0].seasonNumber);
    }

    componentDidMount() {
        this.getQueens();
    }

    componentWillUnmount() {
        this.getQueens();
    }

    queenMapper = (): JSX.Element[] => {
        return this.state.results.map((queen: Queen, index: number) => {
            return(
                <Grid item xs={12} sm={3} key={index}>
                    <Card className='card'>
                        <CardImg 
                        // top width='25%' 
                        className='photo' alt='queen photo' 
                        src={queen.image_url} />
                        <CardBody className='card-content'>
                            <CardTitle tag='h2' className='card-title'>{queen.name}</CardTitle>
                            <CardText className='quote'>{queen.quote}</CardText>
                            <div className='title'>
                            {queen.winner === true ?
                            <h4>WINNER</h4>
                            :
                            null
                            }
                            {queen.missCongeniality === true ?
                            <h4>Miss Congeniality</h4>
                            :
                            null
                            }
                            </div>
                        </CardBody>
                        <Button className='fave-btn' 
                        style={{backgroundColor:'#37acde', color: '#5d3882', margin: '1em', position: 'absolute', bottom: '1em', left: '2em'}} 
                        onClick={() => this.faveQueen(queen)}>
                            FAVE
                        </Button>
                        <Button className='vote-btn' 
                        style={{backgroundColor:'#946dde', color: '#5d3882', margin: '1em', position: 'absolute', bottom: '1em', right: '2em'}} 
                        onClick={() => this.voteQueen(queen)}>
                            VOTE
                        </Button>
                    </Card>
                </Grid>
            )
        })
    }

    render() {
        return (
            <div className="homeContainer">
                <div className="homeDiv">
                    <div className="homeView">
                        <div className="homeText">
                            <h1>Hello, Hello, Hello!</h1>
                            <h3>Vote for who you'd like to see on the next All Stars!</h3>
                            <p>Current database only goes up to All Stars 5</p>
                        </div>
                        <Container>
                            <Row className='justify-content-md-center'>
                                <Col md='3'>
                                    <Dropdown className='drop1' isOpen={this.state.dropOpen1} toggle={this.toggle1}>
                                        <DropdownToggle caret>
                                            Seasons
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            <DropdownItem onClick={() => {this.getQueens(1)}}>Season 1</DropdownItem>
                                            <DropdownItem onClick={() => {this.getQueens(2)}}>Season 2</DropdownItem>
                                            <DropdownItem onClick={() => {this.getQueens(3)}}>Season 3</DropdownItem>
                                            <DropdownItem onClick={() => {this.getQueens(4)}}>Season 4</DropdownItem>
                                            <DropdownItem onClick={() => {this.getQueens(6)}}>Season 5</DropdownItem>
                                            <DropdownItem onClick={() => {this.getQueens(7)}}>Season 6</DropdownItem>
                                            <DropdownItem onClick={() => {this.getQueens(8)}}>Season 7</DropdownItem>
                                            <DropdownItem onClick={() => {this.getQueens(9)}}>Season 8</DropdownItem>
                                            <DropdownItem onClick={() => {this.getQueens(11)}}>Season 9</DropdownItem>
                                            <DropdownItem onClick={() => {this.getQueens(13)}}>Season 10</DropdownItem>
                                            <DropdownItem onClick={() => {this.getQueens(15)}}>Season 11</DropdownItem>
                                            <DropdownItem onClick={() => {this.getQueens(16)}}>Season 12</DropdownItem>
                                        </DropdownMenu>
                                    </Dropdown>
                                </Col>
                                <Col md='3'>
                                    <Dropdown className='drop2' isOpen={this.state.dropOpen2} toggle={this.toggle2}>
                                        <DropdownToggle caret>
                                            All Stars
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            <DropdownItem onClick={() => {this.getQueens(5)}}>All Stars 1</DropdownItem>
                                            <DropdownItem onClick={() => {this.getQueens(10)}}>All Stars 2</DropdownItem>
                                            <DropdownItem onClick={() => {this.getQueens(12)}}>All Stars 3</DropdownItem>
                                            <DropdownItem onClick={() => {this.getQueens(14)}}>All Stars 4</DropdownItem>
                                            <DropdownItem onClick={() => {this.getQueens(17)}}>All Stars 5</DropdownItem>
                                        </DropdownMenu>
                                    </Dropdown>
                                </Col>
                            </Row>
                        </Container>
                        <br/>
                        <Grid container spacing={4} direction='row' justifyContent='center' alignItems='center' className='resultContainer'>
                                {this.queenMapper()}
                        </Grid>
                    </div>
                </div>
            </div>
        );
    }
}