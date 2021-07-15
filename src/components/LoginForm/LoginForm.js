import React, {useState} from 'react';
import './LoginForm.css';
import {API_BASE_URL, CLIENT_ID} from '../../constants/apiConstants';
import { withRouter } from "react-router-dom";

function LoginForm(props) {
    const [state , setState] = useState({
        email : "",
        password : "",
        successMessage: null
    })
    const handleChange = (e) => {
        const {id , value} = e.target   
        setState(prevState => ({
            ...prevState,
            [id] : value
        }))
    }

    const handleSubmitClick = (e) => {
        e.preventDefault();

        let urlencoded = new URLSearchParams();
        urlencoded.append("client_id", CLIENT_ID);
        urlencoded.append("grant_type", "password");
        urlencoded.append("username", state.email);
        urlencoded.append("password", state.password);

        const headers= { 
            'Content-Type': "application/x-www-form-urlencoded",   
        }

        var requestOptions = {
            method: 'POST',
            headers,
            body: urlencoded,
        };

        fetch(API_BASE_URL+'/api/method/frappe.integrations.oauth2.get_token', requestOptions)
            .then(res => res.json())
            .then(function (response) {
                console.log(response);
                if(response.access_token){
                    console.log(response);
                    setState(prevState => ({
                        ...prevState,
                        'successMessage' : 'Login successful. Redirecting to home page..'
                    }))
                    localStorage.setItem("accessToken",response.access_token);
                    localStorage.setItem("tokenType",response.token_type);
                    localStorage.setItem("email", state.email);
                    redirectToHome();
                    props.showError(null)
                }

            })
            .catch(function (error) {
                console.log(error);
            });
    }
    const redirectToHome = () => {
        props.updateTitle('Home')
        props.history.push('/home');
    }
    const redirectToRegister = () => {
        props.history.push('/register'); 
        props.updateTitle('Register');
    }
    return(
        <div className="card col-12 col-lg-4 login-card mt-2 hv-center">
            <form>
                <div className="form-group text-left">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input type="email" 
                       className="form-control" 
                       id="email" 
                       aria-describedby="emailHelp" 
                       placeholder="Enter email" 
                       value={state.email}
                       onChange={handleChange}
                />
                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group text-left">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input type="password" 
                       className="form-control" 
                       id="password" 
                       placeholder="Password"
                       value={state.password}
                       onChange={handleChange} 
                />
                </div>
                <div className="form-check">
                </div>
                <button 
                    type="submit" 
                    className="btn btn-primary"
                    onClick={handleSubmitClick}
                >Submit</button>
            </form>
            <div className="alert alert-success mt-2" style={{display: state.successMessage ? 'block' : 'none' }} role="alert">
                {state.successMessage}
            </div>
            <div className="registerMessage">
                <span>Dont have an account? </span>
                <span className="loginText" onClick={() => redirectToRegister()}>Register</span> 
            </div>
        </div>
    )
}

export default withRouter(LoginForm);