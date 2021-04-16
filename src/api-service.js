const TOKEN = "aad9d647bf86fff01778571c1e02fb6ff62fceaf";


export class API {


    static updateDrone(){

            return fetch( "http://127.0.0.1:8000/api/drones/", {
                method: 'GET',
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${TOKEN}`
                }
            },)   
    }

}