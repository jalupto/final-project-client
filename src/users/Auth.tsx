import { Component } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { Container, Row, Col } from 'reactstrap';
import { Header } from "../common";

const eye = <FontAwesomeIcon icon={faEye} />;

type AuthProps = {
    updateToken: (newToken: string) => void;
}
type AuthState = {
    signup: boolean,
    email: string,
    password: string,
    isAdmin: boolean,
    errorText: string,
    loggedIn: boolean,
    passwordShown: boolean,
    sessionToken: string
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
            loggedIn: false,
            passwordShown: false,
            sessionToken: ''
        }
    }

    togglePasswordVisibility = () => {
        this.setState({passwordShown: this.state.passwordShown ? false : true});
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
                headers: new Headers ({
                    "Content-Type": "application/json"
                }),
            })

            const json = await res.json();
            const sessionToken = json.sessionToken;
            this.props.updateToken(sessionToken);

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

    render() {
        return(
            <Container className='auth-container'>
                <Row>
                    <Col md='12'>
                        <h1>Welcome to:</h1>
                        <Header header="RuPaul's Next Race" />
                        <h3>The time has come...for you to sign up...for...your...LEGACY!</h3>
                        <p style={{ margin: 0, fontSize: '.5em' }}>{this.state.errorText}</p>
                        <Form 
                        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '30vh' }} 
                        onSubmit={(e) => {
                            e.preventDefault()
                            this.handleSubmit()}}>
                            <FormGroup 
                            style={{ display: 'flex', flexDirection: 'column', position: 'relative', justifyContent: 'flex-start', width: '25%', height: '5vh' }}
                            >
                                <Label style={{ display: 'flex', justifyContent: 'flex-start' }} htmlFor='email'>Email:</Label>
                                <Input 
                                style={{ position: 'relative' }} 
                                required type='email' name='email' id='email' onChange={(e) => { this.handleEmail(e) }} value={this.state.email} />
                            </FormGroup>
                            <br/>
                            <br/>
                            <FormGroup 
                            style={{ display: 'flex', flexDirection: 'column', position: 'relative', justifyContent: 'flex-start', width: '25%', height: '5vh' }}
                            >
                                <Label style={{ display: 'flex', justifyContent: 'flex-start' }} htmlFor='password'>Password:</Label>
                                <Input 
                                style={{ position: 'relative' }} 
                                required type={this.state.passwordShown ? "text" : "password"} pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" id='password' onChange={(e) => { this.handlePassword(e) }} name="password" value={this.state.password} />
                                <i style={{ position: 'absolute', textAlign: 'right', width: '10%', right: '2%' }} onClick={this.togglePasswordVisibility}>{eye}</i>
                            </FormGroup>
                            <br/>
                            <br/>
                            <FormGroup
                            style={{ display: 'flex', flexDirection: 'row', position: 'relative', justifyContent: 'center' }}
                            >
                                <Button type='submit' style={{ margin: '1em', width: '100%' }}>{this.state.signup ? 'Signup' : 'Login'} </Button>
                                <Button type='button' style={{ margin: '1em', width: '100%' }} onClick={() => this.setState({signup: !this.state.signup})}>{this.state.signup ? 'Need to Login?' : 'Need to Signup?'}</Button>
                            </FormGroup>
                        </Form>
                    </Col>
                </Row>
            </Container>
        )
    }
}