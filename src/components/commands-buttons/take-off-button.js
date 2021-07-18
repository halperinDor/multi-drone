import React , {useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import { COMMANDSAPI } from './commands-service'
import { useCookies } from 'react-cookie';


export default function TakeOffButton(props){

    const [token] = useCookies(['mr-token']);

    var name = "";

  
    if(props.name){
        var name = props.name
        //console.log("my name is: ",name);
    }


    const takeOffCommand = props => evt => {
        COMMANDSAPI.sendToDrone(name, "Takeoff", value, token['mr-token'])

    }

    const [value,setValue]=useState('')

    const handleInputChange=(event)=>{
      setValue(event.target.value);
    }

    return (
        <div>
            <Form>
                Enter take-off:
                <Form.Row>
                    <Col xs={4}>
                        <input 
                            className="form-control"
                            placeholder="take-off"
                            type="text"
                            onChange={handleInputChange}
                        ></input>
                    </Col>
                    <Button variant="success" onClick={takeOffCommand()}>SEND</Button>    
                </Form.Row> 
            </Form>
        </div>
    )
    
}