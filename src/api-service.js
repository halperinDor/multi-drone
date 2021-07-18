
export class API {

    static loginUser(body){
        return fetch( "http://127.0.0.1:8000/auth/", {
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify( body )
            },).then(resp => resp.json())   
    }


    static updateDrones(token){

            return fetch( "http://127.0.0.1:8000/api/drones/", {
                method: 'GET',
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`
                }
            },)   
    }

    static updateOneDrone(props, token){

       //props = drone.id
       //console.log("in the service",props)
       if(props !== ""){
        

        return fetch( `http://127.0.0.1:8000/api/drones/${props}/`, {
            method: 'GET',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            }
        },)   

       }
      
    }

}