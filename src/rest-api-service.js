
const backEndUrl = "http://127.0.0.1:8000";


export class API {

   

    static async loginUser(body){
        const resp = await fetch(backEndUrl+"/auth/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
        return await resp.json();   
    }


    static async sendToDrone(droneName, _command, alt, token){

        var data = JSON.stringify({name: droneName, command: _command, alt: alt});
    
        try {
            const resp = await fetch(backEndUrl+"/api/commands/", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`
                },
                body: data
            });
            return await resp.json();
        } catch (error) {
            return console.log(error);
        }
    }


    static async sendMissonToDrone(droneName, mission, token){

    
        var missionString = JSON.stringify(mission);

        var data = JSON.stringify({name: droneName, coordinates: missionString});

        var ids =JSON.stringify(mission, ['id']).replace(/[{}]/g, '').replace(/[[]/g, '').replace(/[\]']+/g, '').replace(/["]/g, '');

       
        if (ids !== ""){

            alert("Mission "+ ids+ " was successfully sent to "+ droneName+ " drone!");

          
            try {
                const resp = await fetch(backEndUrl+"/api/missions/", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Token ${token}`
                    },
                    body: data
                });
                return await resp.json();
            } catch (error) {
                return console.log(error);
            }
        }

    }


    static getUpdateAllDrones(setDrone,token){
        fetch(`http://127.0.0.1:8000/api/drones/`, {
            method: 'GET',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            }
        },)
        .then(resp => resp.json())
        .then(resp => setDrone(resp))
        .catch(error => console.log(error))

    }



    static getUpdateOneDrone(setdrone,specificId,token){

              fetch(backEndUrl+"/api/drones/"+specificId, {
                method: 'GET',
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`
                }
            },)
            .then(resp => resp.json())
            .then(resp => setdrone(resp))
            .catch(error => console.log(error))

    }

    // static myFunc(data,token){
    //     console.log("omg: ",data);
    //     var s = JSON.stringify(data)
    //     var my = JSON.stringify({missions: data})
    //     console.log("ddd", my);
    //     //console.log("my body: " , s)
    //     fetch("http://127.0.0.1:8000/api/missionsCoordinates/",{
    //         method: 'POST',
    //         headers:{
    //             'Content-Type': 'application/json',
    //             'Authorization': `Token ${token}`
    //         },
    //         body: my
            
    //     },)
    //     .then(resp => resp.json())
    //     .catch(error => console.log(error))

    // }


}