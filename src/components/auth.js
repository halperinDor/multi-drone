import React, {useState, useEffect} from 'react';
import { API } from '../rest-api-service';
import { useCookies } from 'react-cookie';
import icon from '../static/drone.jpg';
import Button from 'react-bootstrap/Button';
import styled from 'styled-components';

const LoginBack =styled.section`
    padding: 20px;
    min-height: 100vh;
    background-color: #7a94ff;  
    color: whitesmoke;
    `;

const AppHeader = styled.header`
    text-align: center;
    font-size: calc(10px + 2vmin);
    font-style: italic;
    text-shadow: 0 0 3px #FF0000, 0 0 5px #0000FF;
    margin: 0px auto;
    text-decoration:underline;
    font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans',
    'Helvetica Neue', sans-serif;
`
const Center = styled.div`
    margin-left: auto;
    margin-right: auto;
    background-color: rgba(46, 38, 38, 0.76);
    text-align: center;
    width: 30%;
    border-top-right-radius: 12px;
    border-bottom-right-radius: 12px;
    border-top-left-radius: 12px;
    border-bottom-left-radius: 12px;
    padding-bottom: 1%;
`

const SecondTitle = styled.label`
  text-align: center;
  font-size: calc(10px + 2vmin);
  font-style: italic;
  text-shadow: 0 0 3px #FF0000, 0 0 5px #0000FF;
  margin: 0px auto;
  text-decoration:underline;
  font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI',
  Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans',
    'Helvetica Neue', sans-serif;

`


export default function Auth(){

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [token, setToken] = useCookies(['user-token']);


    useEffect(()=>{
        console.log(token);
        if(token['user-token']) window.location.href = '/drones';
    },[token])

   

    const loginClicked = () =>{
        API.loginUser({username, password})
        .then(resp => setToken('user-token',resp.token))
        .catch(error => console.log(error))
    }

    return(
        <LoginBack>
            <AppHeader>
                <h1><img src={icon} alt="drone" height={75} width={75} ></img>Multi-Drone</h1>
            </AppHeader>
            <Center>
            <SecondTitle htmlFor="username">Username</SecondTitle><br/>
            <input id="username" type="text" placeholder="username" value={username}
            onChange={evt=>setUsername(evt.target.value)}/>
            <br/>
            <SecondTitle htmlFor="password">Password</SecondTitle><br/>
            <input id="password" type="password" placeholder="Descriptiom"
            value={password} onChange={evt => setPassword(evt.target.value)}/>
            <br/>
            <br/>
            <Button  onClick={loginClicked}>Login</Button>
            </Center>
        </LoginBack>
    )
}

