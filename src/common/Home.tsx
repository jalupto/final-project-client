import { Component } from "react";

type HomeState = {
    results: Queen[]
}

type Queen = {
    name: string,
    winner: boolean,
    quote: string,
    image_url: string,
    missCongeniality: boolean
}

export class Home extends Component<{}, HomeState> {
    constructor(props: {}){
        super(props)
        this.state = {
            results: []
        }
    }

    getQueens = async () => {
        const res = await fetch(
            `http://www.nokeynoshade.party/api/seasons/1/queens`, {
                method: 'GET'
            }
        )
        const response = await res.json();
        // console.log(response);
        this.setState({results: response});
        console.log(this.state.results);
    }

    queenMapper = (): JSX.Element[] => {
        return this.state.results.map((queen: Queen, index: number) => {
            if(queen.winner === true){
                (<div id='winner' key={index}>
                    <div className='card-content'>
                        <h2 className='card-title'>{queen.name}</h2>
                        {queen.image_url === undefined ? (
                            <p>No Photo</p>
                        ) : (
                            <img className='queenPhoto' alt='queen' src={queen.image_url}/>
                        )}
                        <h3>Winner</h3>
                    </div>
                </div>)
            } else if (queen.missCongeniality === true){
                (<div id='missCongeniality' key={index}>
                    <div className='card-content'>
                        <h2 className='card-title'>{queen.name}</h2>
                        {queen.image_url === undefined ? (
                            <p>No Photo</p>
                        ) : (
                            <img className='queenPhoto' alt='queen' src={queen.image_url}/>
                        )}
                        <h3>Miss Congeniality</h3>
                    </div>
                </div>)
            } else {
                (<div id='others' key={index}>
                    <div className='card-content'>
                        <h2 className='card-title'>{queen.name}</h2>
                        {queen.image_url === undefined ? (
                            <p>No Photo</p>
                        ) : (
                            <img className='queenPhoto' alt='queen' src={queen.image_url}/>
                        )}
                    </div>
                </div>)
            }
            return(
                <div className='results'>
                    <p>test</p>
                </div>
            )
        })
    }

    render() {
        return (
            <div className="homeContainer">
                <div className="homeDiv">
                    <div className="homeView">
                        <h1>Hello, Hello, Hello!</h1>
                        <h3>Vote for who you'd like to see on the next All Stars!</h3>
                        <h5>Search by season.</h5>
                        <button onClick={this.getQueens}>Search</button>
                        {this.queenMapper()}
                    </div>
                </div>
            </div>
        );
    }
}