const TOKEN = "aad9d647bf86fff01778571c1e02fb6ff62fceaf";


export class COMMANDSAPI {

    static sendToDrone(droneName, command, alt){

        var data;

        if (alt === -1){

            data = JSON.stringify({name: droneName, Command: command});
        }
        else{
            data = JSON.stringify({name: droneName, Command: "Takeoff" , alt: alt})
        }

        return fetch( "http://127.0.0.1:8000/api/commands/", {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Token ${TOKEN}`
            },
            body: data
        }).then(resp => resp.json())
        .catch(error => console.log(error))
    }



    
    static IsOn(props) {
        var str = JSON.stringify(props);
        var n= str.indexOf(":")
        var x = JSON.stringify(props)[n+1]
    
        if(x === 't'){
            return (true);
        }
        return(false);
    };
    
    
}