export class MISSIONAPI {

    static sendMissonToDrone(droneName, mission, token){

    
        var missionString = JSON.stringify(mission);

        var data = JSON.stringify({name: droneName, coordinates: missionString});

        var ids =JSON.stringify(mission, ['id']).replace(/[{}]/g, '').replace(/[[]/g, '').replace(/[\[\]']+/g, '').replace(/["]/g, '');

       
        if (ids !== ""){

            alert("Mission "+ ids+ " was successfully sent to "+ droneName+ " drone!");

          
            return fetch( "http://127.0.0.1:8000/api/missions/", {
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`
                },
                body: data
            }).then(resp => resp.json())
            .catch(error => console.log(error))
        }

    }
}