import React, {useState, useEffect} from 'react';
import { API } from '../api-service';
import { useCookies } from 'react-cookie';
import icon from '../drone.jpg';
import Button from 'react-bootstrap/Button';

// import { TokenContext } from '../index';

export default function Auth(){

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [token, setToken] = useCookies(['mr-token']);


    useEffect(()=>{
        console.log(token);
        if(token['mr-token']) window.location.href = '/drones';
    },[token])

   

    const loginClicked = () =>{
        API.loginUser({username, password})
        .then(resp => setToken('mr-token',resp.token))
        .catch(error => console.log(error))
    }

    return(
        <div  className="App">
            <header className="App-header">
                <h1><img src={icon} alt="drone image" height={75} width={75} ></img>Multi-Drone</h1>
            </header>
            <div className="center">
            <label htmlFor="username" className="App-header">Username</label><br/>
            <input id="username" type="text" placeholder="username" value={username}
            onChange={evt=>setUsername(evt.target.value)}/>
            <br/>
            <label htmlFor="password" className="App-header">Password</label><br/>
            <input id="password" type="password" placeholder="Descriptiom"
            value={password} onChange={evt => setPassword(evt.target.value)}/>
            <br/>
            <br/>
            <Button  onClick={loginClicked}>Login</Button>
            </div>
        </div>
    )
}

