import { Component } from "react";

type AuthProps = {}
type AuthState = {
    signup: boolean,
    email: string,
    password: string,
    isAdmin: boolean,
    errorText: string,
    loggedIn: boolean,
}

export class Auth extends Component<AuthProps, AuthState> {
    constructor(props: AuthProps){
        super(props)
        this.state = {
            signup: true,
            email: '',
            password: '',
            isAdmin: false,
            errorText: '',
            loggedIn: false
        }
    }

    handleSubmit = async () => {
        const apiURL = `http://localhost:3000/users/${this.state.signup ? 'register' : 'login'}`;
        console.info(apiURL);

        const reqBody = {
            user: {
                email: this.state.email,
                password: this.state.password
            }
        }
        console.log(reqBody);
        try {
            const res = await fetch(apiURL, {
                method: "POST",
                body: JSON.stringify(reqBody),
                headers: {
                    "Content-Type": "application/json"
                },
            })

            const json = await res.json();

            if (json.errors) {
                let errMsg = json.errors[0].message
                this.setState({errorText: errMsg.charAt(0).toUpperCase() + errMsg.slice(1) + '.'})
                throw new Error(json.errors[0].message)
            } else {
                console.log(json.message)
                this.setState({loggedIn: true})
            }
        } catch (err) {
            console.log(err);
        }
    }

    handleEmail = (e: any) => {
        this.setState({email: e.target.value})
    }

    handlePassword = (e: any) => {
        this.setState({password: e.target.value})
    }

    // componentDidMount(){
    //     this.props.isClass(Boolean(Auth?.prototype?.render))
    // }

    render() {
        return(
            <>
            <p style={{ margin: 0, fontSize: '.5em' }}>{this.state.errorText}</p>
                <form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={(e) => {
                    e.preventDefault()
                    this.handleSubmit()}}>

                    <div style={{ display: 'flex', position: 'relative' }}>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <label htmlFor='email'>Email</label>
                            <input style={{ position: 'relative' }} required type='email' name='email' id='email' onChange={(e) => { this.handleEmail(e) }} />
                        </div>
                    </div>

                    <div style={{ display: 'flex', position: 'relative' }}>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <label htmlFor='password'>Password</label>
                            <input required type='password' id='password' onChange={(e) => { this.handlePassword(e) }} />
                        </div>
                    </div>

                    <button type='button' style={{ margin: '1em' }} onClick={() => this.setState({signup: !this.state.signup})}>{this.state.signup ? 'Need to Login?' : 'Need to Signup?'}</button>

                    <button type='submit' style={{ margin: '1em' }}>{this.state.signup ? 'Signup' : 'Login'} </button>

                </form>
            </>
        )
    }
}