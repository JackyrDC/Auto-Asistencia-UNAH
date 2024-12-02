import {CapacitorHttp,Capacitor} from "@capacitor/core"
import {from, Observable, BehaviorSubject} from "rxjs"

export class AuthService {
    login(username: string, password: string) {
        const baseUrl = import.meta.env.VITE_USERS_API_URL;
        
        return from(CapacitorHttp.post({
            url: baseUrl,
            data:{
                jsonrpc: "2.0",
                method: "call",
                params: {
                    db: "prueba11",
                    login: "prueba11@gmail.com",
                    password: "hola123"
                }
            },
            headers: {
                'Content-Type': 'application/json'}}
    ).pipe(
        map((response)=>{
            const user = response.data;
        }

        )
    ))

    }
}