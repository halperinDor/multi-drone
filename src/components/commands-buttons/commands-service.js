//const TOKEN = "aad9d647bf86fff01778571c1e02fb6ff62fceaf";


export class COMMANDSAPI {

    static sendToDrone(droneName, _command, alt, token){

       

        var data;

        if (alt === -1){

            data = JSON.stringify({name: droneName, command: _command});
        }
        else{
            data = JSON.stringify({name: droneName, command: "Takeoff" , alt: alt})
        }

        //alert(data);

        return fetch( "http://127.0.0.1:8000/api/commands/", {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
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